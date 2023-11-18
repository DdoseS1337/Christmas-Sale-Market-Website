import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { CreateUserOrderDto, JwtAuthGuard, Roles } from '@app/common';
import { UpdateUserOrderDto } from './dto';

@Controller('user-order')
export class OrderServiceController {
  constructor(private readonly orderServiceService: OrderServiceService) {}

  @Post()
  async CreateUserOrder(@Body() createUserOrderDto: CreateUserOrderDto) {
    return this.orderServiceService.create(createUserOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('Admin', 'Owner')
  async GetUserOffer() {
    return this.orderServiceService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin', 'Owner')
  async GetUserOfferById(@Param('id') id: string) {
    return this.orderServiceService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin', 'Owner')
  async UpdateUserOrder(
    @Param('id') id: string,
    @Body() updateUserOrderDto: UpdateUserOrderDto,
  ) {
    return this.orderServiceService.update(id, updateUserOrderDto);
  }

  @Get('info_about_all_offers')
  async GetOffers() {
    return this.orderServiceService.findAll();
  }

  @Get('info_about_offer')
  async GetOfferById(@Param() id: string) {
    return this.orderServiceService.findOne(id);
  }
}
