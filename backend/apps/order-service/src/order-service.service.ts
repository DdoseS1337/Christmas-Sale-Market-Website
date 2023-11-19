import { Injectable } from '@nestjs/common';
import { UserOrderRepository } from './order-service.repository';
import {
  CreateUserOrderDto,
  PRODUCT_SERVICE_URL,
  Product,
  TELEGRAM_BOT_URL,
} from '@app/common';
import { UpdateUserOrderDto } from './dto';
import axios from 'axios';

@Injectable()
export class OrderServiceService {
  constructor(private readonly userOrderRepository: UserOrderRepository) {}
  async create(createUserOrderDto: CreateUserOrderDto) {
    try {
      await this.sendNotifications(createUserOrderDto);
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

  async sendNotifications(createUserOrderDto: CreateUserOrderDto) {
    const productsIdsArray = createUserOrderDto.products;

    try {
      const responses = await Promise.all(
        productsIdsArray.map(async (product) => {
          try {
            const response = await axios.get(
              `${PRODUCT_SERVICE_URL.PROD}/christmas-tree-offers/${product.id}`,
            );
            return response.data;
          } catch (error) {
            console.error(`Помилка для продукту з ID ${product.id}:`, error);
            throw error;
          }
        }),
      );

      const productsDataArray = responses
        .filter((response) => response !== null)
        .map((response, index) => {
          const product = response;
          return {
            id: product.id,
            name: product.name,
            price: product.newPrice,
            quantity: productsIdsArray[index]?.quantity || 1,
          };
        });

      return axios
        .post(`${TELEGRAM_BOT_URL.PROD}/notify_bot`, {
          ...createUserOrderDto,
          products: productsDataArray,
        })
        .then((response) => {
          const responseData = JSON.stringify(response.data);
          const parsedData = JSON.parse(responseData);
          console.log(`this is responseData ${responseData}`);
          console.log(`this is parsedData ${parsedData}`);
        })
        .catch((error) => {
          console.log(`this is пенсіл ${error.message}`);
        });
    } catch (error) {
      console.error('Помилка у викликах Post:', error);
    }
  }

  async findAll() {
    return this.userOrderRepository.find({});
  }

  async findOne(_id: string) {
    return this.userOrderRepository.findOne({ _id });
  }

  async updateOrderList(phone_number: string, products: Product[]) {
    return this.userOrderRepository.findOneAndUpdate(
      { phone_number },
      { $push: { products: { $each: products } } },
    );
  }

  async update(_id: string, updateUserOrderDto: UpdateUserOrderDto) {
    return this.userOrderRepository.findOneAndUpdate(
      { _id },
      { $set: updateUserOrderDto },
    );
  }
}
