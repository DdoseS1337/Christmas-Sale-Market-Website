import { Module } from '@nestjs/common';
import { AdminPanelController } from './admin-panel.controller';
import { AdminPanelService } from './admin-panel.service';
import { LoggerModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        RABBITMQ_URI: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AdminPanelController],
  providers: [AdminPanelService],
})
export class AdminPanelModule {}
