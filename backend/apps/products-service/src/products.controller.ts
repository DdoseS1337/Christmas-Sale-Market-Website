import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FormatResponseInterceptor, JwtAuthGuard } from '@app/common';

@UseInterceptors(FormatResponseInterceptor)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('set_supply_categories')
  @UseGuards(JwtAuthGuard)
  async setDataCategories(@Body() data) {
    const categories = JSON.parse(data.data);
    return this.productsService.setCategories(categories);
  }

  @Post('set_supply_offers')
  @UseGuards(JwtAuthGuard)
  async setDataOffers(@Body() data) {
    const offers = JSON.parse(data.data);
    return this.productsService.setOffers(offers);
  }

  @Post('update_supply_categories')
  @UseGuards(JwtAuthGuard)
  async updateDataCategories(@Body() data) {
    const categories = JSON.parse(data.data);
    return this.productsService.updateCategories(categories);
  }
  @Post('update_supply_offers')
  @UseGuards(JwtAuthGuard)
  async updateDataOffers(@Body() data) {
    const offers = JSON.parse(data.data);
    return this.productsService.updateOffers(offers);
  }

}
