import { Controller, Get } from '@nestjs/common';
import { SupplierServiceService } from './supplier-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('supply-data')
export class SupplierServiceController {
  constructor(private readonly supplierServiceService: SupplierServiceService) {}

  @MessagePattern('update_supply_data')
  async getDataFromButikElok(): Promise<string> {
    return this.supplierServiceService.getDataElkiShop();
  }
}
