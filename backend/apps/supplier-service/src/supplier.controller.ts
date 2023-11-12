import { Controller, Get, UseInterceptors, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Roles } from '@app/common';
import { SupplierService } from './supplier.service';
import { FormatResponseInterceptor } from '@app/common';

@UseInterceptors(FormatResponseInterceptor)
@Controller('supply-data')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get('restore-data')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin', 'Owner')
  async getDataFromButikElok(): Promise<string> {
    return this.supplierService.restoreData();
  }
}
