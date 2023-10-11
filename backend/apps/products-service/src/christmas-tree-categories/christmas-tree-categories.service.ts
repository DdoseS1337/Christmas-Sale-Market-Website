import { Injectable } from '@nestjs/common';
import { ChristmastreeCategoryRepository } from './christmas-tree-categories.repository';

@Injectable()
export class ChristmasTreeCategoriesService {
  constructor(
    private readonly christmastreeCategoryRepository: ChristmastreeCategoryRepository,
  ) {}

//   create() {
//     return this.christmastreeCategoryRepository.create(
//       this.christmastreeCategoryRepository.create({}),
//     );
//   }

//   findAll() {
//     return this.christmastreeCategoryRepository.find({});
//   }

//   findOne(_id: string) {
//     return this.christmastreeCategoryRepository.findOne({ _id });
//   }

//   update(_id: string, updateReservationDto: UpdateReservationDto) {
//     return this.christmastreeCategoryRepository.findOneAndUpdate(
//       { _id },
//       { $set: updateReservationDto },
//     );
//   }

//   remove(_id: string) {
//     return this.christmastreeCategoryRepository.findOneAndDelete({ _id });
//   }
}
