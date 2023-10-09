import { Module } from '@nestjs/common';
import { SupplierServiceController } from './supplier-service.controller';
import { SupplierServiceService } from './supplier-service.service';

@Module({
  imports: [],
  controllers: [SupplierServiceController],
  providers: [SupplierServiceService],
})
export class SupplierServiceModule {}
