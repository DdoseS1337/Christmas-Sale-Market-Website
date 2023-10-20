import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChristmasTreeOffersService } from './christmas-tree-offers.service';
import { TreeOffersValidator } from './dto/tree-offers-validator.dto';

@Controller('christmas-tree-offers')
export class ChristmasTreeOffersController {
  constructor(
    private readonly christmasTreeOffersService: ChristmasTreeOffersService,
  ) {}
  @Get()
  async GetTreeOffers(@Query() query: TreeOffersValidator) {
    let options = { ...query };

    if (query.type_name) {
      options['name'] = { $regex: query.type_name };
      delete options.type_name;
    } 
    if (query.pricemin && query.pricemax) {
      options['newPrice'] = {
        $gte: query.pricemin,
        $lte: query.pricemax,
      };
      delete options.pricemin;
      delete options.pricemax;
    } 


    return this.christmasTreeOffersService.findAll(options);
  }

  @Get(':id')
  async GetTreeOffer(@Param('id') id: string) {
    return this.christmasTreeOffersService.findOne(id);
  }
}
