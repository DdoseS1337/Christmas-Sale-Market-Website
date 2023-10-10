import { Module } from '@nestjs/common';
import { ProductsServiceController } from './products-service.controller';
import { ProductsServiceService } from './products-service.service';
import { DatabaseModule, LoggerModule, SUPPLIER_SERVICE } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        SUPPLIER_HOST: Joi.string().required(),
        SUPPLIER_PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: SUPPLIER_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('SUPPLIER_HOST'),
            port: configService.get('SUPPLIER_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ProductsServiceController],
  providers: [ProductsServiceService],
})
export class ProductsServiceModule {}
