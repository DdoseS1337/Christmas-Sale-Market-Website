import { Module } from '@nestjs/common';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { LoggerModule, PRODUCT_SERVICE } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        PRODUCT_HOST: Joi.string().required(),
        PRODUCT_PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: PRODUCT_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('PRODUCT_HOST'),
            port: configService.get('PRODUCT_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ])
  ],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule {}
