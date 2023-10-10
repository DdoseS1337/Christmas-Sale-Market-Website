import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { DatabaseModule, LoggerModule, SUPPLIER_SERVICE } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChristmasTreeDocument, ChristmasTreeSchema } from './models/christmastree.schema';
import { ChristmastreeCategoryDocument, ChristmastreeCategorySchema } from './models/christmas-category.schema';
import { ProductsCategoryRepository, ProductsRepository } from './products.christmastree.repository';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ChristmasTreeDocument.name, schema: ChristmasTreeSchema },
      { name: ChristmastreeCategoryDocument.name, schema: ChristmastreeCategorySchema }
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MONGODB_URI: Joi.string().required(),
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
  controllers: [ProductsController],
  providers: [ProductsService, ProductsCategoryRepository, ProductsRepository],
})
export class ProductsServiceModule {}
