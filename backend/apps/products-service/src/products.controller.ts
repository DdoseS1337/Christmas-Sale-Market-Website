import { Controller,UseInterceptors  } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FormatResponseInterceptor } from '@app/common';

@UseInterceptors(FormatResponseInterceptor)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('set_supply_categories')
  async setDataCategories(@Payload() data) {
    const categories = JSON.parse(data);
    return this.productsService.setCategories(categories);
  }

  @MessagePattern('set_supply_offers')
  async setDataOffers(@Payload() data) {
    const offers = JSON.parse(data);
    return this.productsService.setOffers(offers);
  }
}
