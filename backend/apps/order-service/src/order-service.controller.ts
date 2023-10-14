import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { CreateUserOrderDto } from '@app/common';

@Controller('user-order')
export class OrderServiceController {
  constructor(private readonly orderServiceService: OrderServiceService) {}

  @Post()
  CreateUserOrder(@Body() createUserOrderDto: CreateUserOrderDto) {
    return this.orderServiceService.create(createUserOrderDto);
  }
}
