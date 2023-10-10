import { Controller, Get, Inject } from '@nestjs/common';
import { ProductsServiceService } from './products-service.service';
import { SUPPLIER_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Controller('products-service')
export class ProductsServiceController {
  constructor(
    private readonly productsServiceService: ProductsServiceService,
    @Inject(SUPPLIER_SERVICE) private readonly supplyService: ClientProxy,
  ) {}

  @Get('/update-data')
  async updateDataBase() {
    return this.supplyService.send('update_supply_data', {}).pipe(
      map((res) => {
        return res;
      }),
    );
  }
}
