import { Controller, Get, Param } from '@nestjs/common';
import { ChristmasTreeCategoriesService } from './christmas-tree-categories.service';
@Controller('christmas-tree-categories')
export class ChristmasTreeCategoriesController {
  constructor(
    private readonly christmasTreeCategoriesService: ChristmasTreeCategoriesService,
  ) {}

  @Get()
  async GetCategories() {
    return this.christmasTreeCategoriesService.findAll();
  }

  @Get(':id')
  async GetCategory(@Param('id') id: string) {
    return this.christmasTreeCategoriesService.findOne(id);
  }
}
