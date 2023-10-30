import { Injectable } from '@nestjs/common';
import { ChristmastreeCategoryRepository } from './christmas-tree-categories.repository';
import { ChristmastreeCategoryDto } from '../dto/christmas-tree-categories.dto';

@Injectable()
export class ChristmasTreeCategoriesService {
  constructor(
    private readonly christmastreeCategoryRepository: ChristmastreeCategoryRepository,
  ) {}

  create(data: ChristmastreeCategoryDto) {
    return this.christmastreeCategoryRepository.create(data);
  }

  findAll() {
    return this.christmastreeCategoryRepository.find({});
  }

  findOne(id: string) {
    return this.christmastreeCategoryRepository.findOne({ id });
  }

  update(id: string, updateCategoryDto) {
    return this.christmastreeCategoryRepository.findOneAndUpdate(
      { id },
      { $set: updateCategoryDto },
    );
  }

  deleteAll() {
    return this.christmastreeCategoryRepository.deleteMany({});
  }

  remove(id: string) {
    return this.christmastreeCategoryRepository.findOneAndDelete({ id });
  }
}
