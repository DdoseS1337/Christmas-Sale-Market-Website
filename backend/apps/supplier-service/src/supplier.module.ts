import { Module } from '@nestjs/common';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { LoggerModule,  } from '@app/common';
@Module({
  imports: [
    LoggerModule
  ],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule {}
