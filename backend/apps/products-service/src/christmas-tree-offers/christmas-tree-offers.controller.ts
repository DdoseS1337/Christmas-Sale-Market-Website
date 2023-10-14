import { Controller, Get, Param } from '@nestjs/common';
import { ChristmasTreeOffersService } from './christmas-tree-offers.service';

@Controller('christmas-tree-offers')
export class ChristmasTreeOffersController {
  constructor(
    private readonly christmasTreeOffersService: ChristmasTreeOffersService,
  ) {}
  @Get()
  async GetTreeOffers() {
    return this.christmasTreeOffersService.findAll();
  }

  @Get(':id')
  async GetTreeOffer(@Param('id') id: string) {
    return this.christmasTreeOffersService.findOne(id);
  }
}
