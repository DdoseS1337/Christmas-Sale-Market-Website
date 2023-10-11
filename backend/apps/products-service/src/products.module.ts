import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { LoggerModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ChristmasTreeCategoriesModule } from './christmas-tree-categories/christmas-tree-categories.module';
import { ChristmasTreeOffersModule } from './christmas-tree-offers/christmas-tree-offers.module';

@Module({
  imports: [
    ChristmasTreeCategoriesModule,
    ChristmasTreeOffersModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
        MONGODB_URI: Joi.string().required(),
      }),
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsServiceModule {}
