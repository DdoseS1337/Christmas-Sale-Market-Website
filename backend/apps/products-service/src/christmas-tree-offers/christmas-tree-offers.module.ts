import { Module } from '@nestjs/common';
import { ChristmasTreeOffersController } from './christmas-tree-offers.controller';
import { ChristmasTreeOffersService } from './christmas-tree-offers.service';
import { ChristmasTreeOffersRepository } from './christmas-tree-offers.repository';
import { AUTH_SERVICE, DatabaseModule } from '@app/common';
import {
  ChristmasTreeDocument,
  ChristmasTreeSchema,
} from './models/christmas-tree.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ChristmasTreeDocument.name, schema: ChristmasTreeSchema },
    ]),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: 'auth',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ChristmasTreeOffersController],
  providers: [ChristmasTreeOffersService, ChristmasTreeOffersRepository],
  exports: [ChristmasTreeOffersService],
})
export class ChristmasTreeOffersModule {}
