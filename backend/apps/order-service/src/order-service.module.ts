import { Module } from '@nestjs/common';
import { OrderServiceController } from './order-service.controller';
import { OrderServiceService } from './order-service.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UserOrderRepository } from './order-service.repository';
import { UserOrderDocument, UserOrderSchema } from './models/user-order.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: UserOrderDocument.name,
        schema: UserOrderSchema,
      },
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
    }),
  ],
  controllers: [OrderServiceController],
  providers: [OrderServiceService, UserOrderRepository],
})
export class OrderServiceModule {}
