import { Injectable } from '@nestjs/common';
import { UserOrderRepository } from './order-service.repository';
import { CreateUserOrderDto } from '@app/common';

@Injectable()
export class OrderServiceService {
  constructor(private readonly userOrderRepository: UserOrderRepository) {}
  async create(createUserOrderDto: CreateUserOrderDto) {
    return this.userOrderRepository.create(createUserOrderDto);
  }
}
