import { Inject, Injectable } from '@nestjs/common';
import { UserOrderRepository } from './order-service.repository';
import { CreateUserOrderDto, PRODUCT_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { TELEGRAM_BOT } from '@app/common';
import { catchError, forkJoin, of } from 'rxjs';
import { UpdateUserOrderDto } from './dto';

@Injectable()
export class OrderServiceService {
  constructor(
    private readonly userOrderRepository: UserOrderRepository,
    @Inject(TELEGRAM_BOT)
    private readonly telegramBotService: ClientProxy,
    @Inject(PRODUCT_SERVICE) private readonly productService: ClientProxy,
  ) {}
  async create(createUserOrderDto: CreateUserOrderDto) {
    try {
      await this.getProductsData(createUserOrderDto);
      await this.userOrderRepository.findOne({
        phone_number: createUserOrderDto.phone_number,
      });
    } catch (error) {
      return this.userOrderRepository.create(createUserOrderDto);
    }

    return this.updateOrderList(
      createUserOrderDto.phone_number,
      createUserOrderDto.productsIds,
    );
  }

  async getProductsData(createUserOrderDto: CreateUserOrderDto) {
    const productsIdsArray = createUserOrderDto.productsIds;
    const productsPromises = productsIdsArray.map((id) =>
      this.productService.send('get-tree-offer', id).pipe(
        catchError((error) => {
          console.log(`Error in productService for id ${id}:`, error);
          return of(null);
        }),
      ),
    );

    return forkJoin(productsPromises).subscribe((responses) => {
      const productsDataArray = responses
        .filter((response) => response !== null)
        .map((response) => {
          const product = response.data[0];
          return {
            id: product.id,
            name: product.name,
            price: product.price,
          };
        });

      if (productsDataArray.length !== productsIdsArray.length) {
        return;
      }

      this.telegramBotService.emit('notify_bot', {
        ...createUserOrderDto,
        products: productsDataArray,
      });
    });
  }

  async findAll() {
    return this.userOrderRepository.find({});
  }

  async findOne(_id: string) {
    return this.userOrderRepository.findOne({ _id });
  }

  async updateOrderList(phone_number: string, productsIds: string[]) {
    return this.userOrderRepository.findOneAndUpdate(
      { phone_number },
      { $push: { productsIds: { $each: productsIds } } },
    );
  }

  async update(_id: string, updateUserOrderDto: UpdateUserOrderDto) {
    return this.userOrderRepository.findOneAndUpdate(
      { _id },
      { $set: updateUserOrderDto },
    );
  }
}
