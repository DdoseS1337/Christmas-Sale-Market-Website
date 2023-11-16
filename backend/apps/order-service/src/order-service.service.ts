import { Inject, Injectable } from '@nestjs/common';
import { UserOrderRepository } from './order-service.repository';
import { CreateUserOrderDto, PRODUCT_SERVICE, Product } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { TELEGRAM_BOT } from '@app/common';
import { catchError, forkJoin, of } from 'rxjs';
import { UpdateUserOrderDto } from './dto';
import axios from 'axios';

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
      createUserOrderDto.products,
    );
  }

  async getProductsData(createUserOrderDto: CreateUserOrderDto) {
    const productsIdsArray = createUserOrderDto.products;
    const productsPromises = productsIdsArray.map((product) =>
      axios
        .get(`http://localhost:3001/dev/christmas-tree-offers/${product.id}`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error(`Помилка для продукту з ID ${product.id}:`, error);
          throw error;
        }),
    );
    Promise.all(productsPromises)
      .then((responses) => {
        const productsDataArray = responses
          .filter((response) => response !== null)
          .map((response) => {
            const product = response;
            return {
              id: product.id,
              name: product.name,
              price: product.price,
            };
          });

        axios.post('http://localhost:4001/dev/tg-bot/notify_bot', {
          ...createUserOrderDto,
          products: productsDataArray,
          
        });
      })
      .catch((error) => {
        console.error('Помилка у викликах Get:', error);
      });
  }

  async findAll() {
    return this.userOrderRepository.find({});
  }

  async findOne(_id: string) {
    return this.userOrderRepository.findOne({ _id });
  }

  async updateOrderList(phone_number: string, productsIds: Product[]) {
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
