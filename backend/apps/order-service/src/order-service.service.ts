import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserOrderRepository } from './order-service.repository';
import { GetUserOrderDto } from './dto';
import { CreateUserOrderDto, PRODUCT_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { TELEGRAM_BOT } from '@app/common';
import { catchError, forkJoin, of, throwError } from 'rxjs';

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
      await this.userOrderRepository.findOne({
        phone_number: createUserOrderDto.phone_number,
      });
    } catch (error) {
      await this.getProductsData(createUserOrderDto);
      return this.userOrderRepository.create(createUserOrderDto);
    }

    await this.getProductsData(createUserOrderDto);
    return this.update(
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

  async findOne(_id: GetUserOrderDto) {
    return this.userOrderRepository.findOne({ _id });
  }

  async update(phone_number: string, productsIds: string[]) {
    return this.userOrderRepository.findOneAndUpdate(
      { phone_number },
      { $push: { productsIds: { $each: productsIds } } },
    );
  }
}
