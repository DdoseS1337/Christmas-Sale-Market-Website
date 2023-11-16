import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FormatResponseInterceptor } from '@app/common';

@UseInterceptors(FormatResponseInterceptor)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('set_supply_categories')
  async setDataCategories(@Body() data) {
    const categories = JSON.parse(data.data);
    return this.productsService.setCategories(categories);
  }

  @Post('set_supply_offers')
  async setDataOffers(@Body() data) {
    const offers = JSON.parse(data.data);
    return this.productsService.setOffers(offers);
  }

  @MessagePattern('update_supply_categories')
  async updateDataCategories(@Payload() data) {
    const categories = JSON.parse(data);
    return this.productsService.updateCategories(categories);
  }
  @MessagePattern('update_supply_offers')
  async updateDataOffers(@Payload() data) {
    const offers = JSON.parse(data);
    return this.productsService.updateOffers(offers);
  }

}
