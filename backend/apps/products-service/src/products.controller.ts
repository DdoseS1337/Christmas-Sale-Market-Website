import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { SUPPLIER_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    @Inject(SUPPLIER_SERVICE) private readonly supplyService: ClientProxy,
  ) {}

  @Get('/update-data')
  async setDataBase() {
    return this.supplyService.send('update_supply_data', {}).pipe(
      map((res) => {
        return this.productsService.setDataBase(res);
      }),
    );
  }

  @Get()
  async findAllOffer() {
    return this.productsService.findAllOffer();
  }

  @Get(':id')
  async findOneOffer(@Param('id') id: string) {
    return this.productsService.findOneOffer(id);
  }

  @Get('/categories')
  async findAllCategories() {
    return this.productsService.findAllCategories();
  }

  @Get('/category/:id')
  async findOneCategory(@Param('id') id: string) {
    return this.productsService.findOneCategory(id);
  }
  
}
