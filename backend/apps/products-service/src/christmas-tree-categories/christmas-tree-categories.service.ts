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

    findOne(_id: string) {
      return this.christmastreeCategoryRepository.findOne({ _id });
    }
    

    update(_id: string, updateReservationDto) {
      return this.christmastreeCategoryRepository.findOneAndUpdate(
        { _id },
        { $set: updateReservationDto },
      );
    }

    deleteAll() {
      return this.christmastreeCategoryRepository.deleteMany({});
    }
    
    remove(_id: string) {
      return this.christmastreeCategoryRepository.findOneAndDelete({ _id });
    }
}
