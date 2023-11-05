import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ChristmasTreeOffersService } from './christmas-tree-offers.service';
import { TreeOffersValidator, UpdateOfferDto } from './dto';
import { JwtAuthGuard, Roles } from '@app/common';

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

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin', 'Owner')
  async UpdateTreeOffer(
    @Param('id') id: string,
    @Body() updateOfferDto: UpdateOfferDto,
  ) {
    return this.christmasTreeOffersService.update(id, updateOfferDto);
  }
}
