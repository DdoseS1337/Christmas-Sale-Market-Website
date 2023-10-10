import { Controller, Get } from '@nestjs/common';
import { ProductsServiceService } from './products-service.service';

@Controller()
export class ProductsServiceController {
  constructor(private readonly productsServiceService: ProductsServiceService) {}

  @Get()
  getHello(): string {
    return this.productsServiceService.getHello();
  }
}
