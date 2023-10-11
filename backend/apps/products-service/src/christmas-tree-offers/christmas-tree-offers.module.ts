import { Module } from '@nestjs/common';
import { ChristmasTreeOffersController } from './christmas-tree-offers.controller';
import { ChristmasTreeOffersService } from './christmas-tree-offers.service';
import { ChristmasTreeOffersRepository } from './christmas-tree-offers.repository';
import { DatabaseModule } from '@app/common';
import { ChristmasTreeDocument, ChristmasTreeSchema } from './models/christmas-tree.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ChristmasTreeDocument.name, schema: ChristmasTreeSchema },
    ]),
  ],
  controllers: [ChristmasTreeOffersController],
  providers: [ChristmasTreeOffersService, ChristmasTreeOffersRepository],
  exports: [ChristmasTreeOffersService]
})
export class ChristmasTreeOffersModule {}
