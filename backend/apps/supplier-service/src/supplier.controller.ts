import { Controller, Get } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('supply-data')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @MessagePattern('update_supply_data')
  async getDataFromButikElok(): Promise<string> {
    return this.supplierService.getDataElkiShop();
  }
}
