import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('set_supply_categories')
  async setDataCategories(@Payload() data) {
    console.log(`set_supply_categories ${data}`);
    return data;
  }

  @MessagePattern('set_supply_offers')
  async setDataOffers(@Payload() data) {
    console.log(`set_supply_offers ${data}`);
    return data;
  }
}
