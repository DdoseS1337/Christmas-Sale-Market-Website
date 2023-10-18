import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { FormatResponseInterceptor } from '@app/common';

@UseInterceptors(FormatResponseInterceptor)
@Controller('supply-data')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  
  @Get('restore-data')
  async getDataFromButikElok(): Promise<string> {
    return this.supplierService.getDataElkiShop();
  }

}
