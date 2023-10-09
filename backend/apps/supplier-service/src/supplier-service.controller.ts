import { Controller, Get } from '@nestjs/common';
import { SupplierServiceService } from './supplier-service.service';

@Controller()
export class SupplierServiceController {
  constructor(private readonly supplierServiceService: SupplierServiceService) {}

  @Get()
  getHello(): string {
    return this.supplierServiceService.getHello();
  }
}
