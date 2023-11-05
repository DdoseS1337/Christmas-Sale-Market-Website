import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      const existingCategories =
        await this.christmasTreeCategoriesService.findAll();

      if (existingCategories.length > 0) {
        await this.christmasTreeCategoriesService.deleteAll();
      }
      for (const data of dataArray) {
        this.christmasTreeCategoriesService.create(data);
      }
      return;
    } catch (error) {
      throw new BadRequestException(
        'Get error with input Christmas Tree Category',
      );
    }
  }

  async setOffers(dataArray: ChristmasTreeDto[]) {
    try {
      const existingOffers = await this.christmasTreeOffersService.findAll({});

      if (existingOffers.length > 0) {
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

  async updateCategories(dataArray: ChristmastreeCategoryDto[]) {
    try {
      const existingCategories =
        await this.christmasTreeCategoriesService.findAll();

      for (const data of dataArray) {
        const existingCategory = existingCategories.find(
          (category) => category.id === data.id,
        );

        if (!existingCategory) {
          await this.christmasTreeCategoriesService.create(data);
        }
        return;
      }
    } catch (error) {
      throw new BadRequestException(
        'Get error with update Christmas Tree Category',
      );
    }
  }
  async updateOffers(dataArray: ChristmasTreeDto[]) {
    const allOffers = await this.christmasTreeOffersService.findAll({});
    for (const data of dataArray) {
      const existingOffer = allOffers.find(
        (offer) => offer.id === data.id,
      );

      if (existingOffer) {
        // Оновлюємо статус, якщо офер знайдено
        existingOffer.available = data.available;
        await this.christmasTreeOffersService.update(
          existingOffer.id,
          existingOffer,
        );
      } else {
        // Створюємо новий запис, якщо офер не знайдено
        await this.christmasTreeOffersService.create(data);
      }
    }
  }
}
