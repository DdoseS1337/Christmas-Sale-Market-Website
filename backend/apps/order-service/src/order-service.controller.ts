import { Body, Controller, Post } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { GetUserOrderDto } from './dto';
import { CreateUserOrderDto } from '@app/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('user-order')
export class OrderServiceController {
  constructor(private readonly orderServiceService: OrderServiceService) {}

  @Post()
  CreateUserOrder(@Body() createUserOrderDto: CreateUserOrderDto) {
    return this.orderServiceService.create(createUserOrderDto);
  }

  @MessagePattern('info_about_all_offers')
  async GetOffers() {
    return this.orderServiceService.findAll();
  }

  @MessagePattern('info_about_offer')
  async getOfferById(@Payload() id: GetUserOrderDto) {
    return this.orderServiceService.findOne(id);
  }
}
