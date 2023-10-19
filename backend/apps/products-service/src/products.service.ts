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
      const existingCategories = await this.christmasTreeCategoriesService.findAll();

      if (existingCategories.length > 0) {
        await this.christmasTreeCategoriesService.deleteAll(); 
      }
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
      const existingCategories = await this.christmasTreeOffersService.findAll();
      
      if (existingCategories.length > 0) {
        await this.christmasTreeOffersService.deleteAll(); 
      }

      for (const data of dataArray) {
        this.christmasTreeOffersService.create(data);
      }
      return;
    } catch (error) {
      throw new BadRequestException('Get error with input Christmas Tree');
    }
  }

  findOne(id: string) {
    return this.christmasTreeOffersService.findOne(id);
  }

  async updateCategories() {}
  async updateOffers() {}
}
