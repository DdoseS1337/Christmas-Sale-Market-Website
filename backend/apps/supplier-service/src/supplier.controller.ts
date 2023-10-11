import { Controller, Get } from '@nestjs/common';
import { SupplierService } from './supplier.service';

@Controller('supply-data')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  async getDataFromButikElok(): Promise<string> {
    return this.supplierService.getDataElkiShop();
  }

}
