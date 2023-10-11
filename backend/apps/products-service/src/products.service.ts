import { BadRequestException, Injectable } from '@nestjs/common';
import { iProductDto } from './dto/products-info.dto';
import { ChristmastreeCategoryDto } from './dto/christmas-tree-categories.dto';
import { ChristmasTreeDto } from './dto/christmas-tree.dto';
import { ChristmasTreeCategoriesService } from './christmas-tree-categories/christmas-tree-categories.service';
import { ChristmasTreeOffersService } from './christmas-tree-offers/christmas-tree-offers.service';
@Injectable()
export class ProductsService {
  constructor(
    private readonly christmasTreeCategoriesService: ChristmasTreeCategoriesService,
    private readonly christmasTreeOffersService: ChristmasTreeOffersService,
  ) {}

  async setCategories(dataArray: ChristmastreeCategoryDto[]) {
    try {
      for (const data of dataArray) {
        this.christmasTreeCategoriesService.create(data);
      }
      return;
    } catch (error) {
      throw new BadRequestException('Get error with input Christmas Tree Category');
    }
  }

  async setOffers(dataArray: ChristmasTreeDto[]) {
    try {
      for (const data of dataArray) {
        this.christmasTreeOffersService.create(data);
      }
      return;
    } catch (error) {
      throw new BadRequestException('Get error with input Christmas Tree');
    }
  }
}
