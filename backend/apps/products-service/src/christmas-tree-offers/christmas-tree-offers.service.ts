import { Injectable } from '@nestjs/common';
import { ChristmasTreeOffersRepository } from './christmas-tree-offers.repository';

@Injectable()
export class ChristmasTreeOffersService {
  constructor(
    private readonly christmasTreeOffersRepository: ChristmasTreeOffersRepository,
  ) {}

//   create() {
//     return this.christmasTreeOffersRepository.create({});
//   }

//   findAll() {
//     return this.christmasTreeOffersRepository.find({});
//   }

//   findOne(_id: string) {
//     return this.christmasTreeOffersRepository.findOne({ _id });
//   }

//   update(_id: string) {
//     return this.christmasTreeOffersRepository.findOneAndUpdate(
//       { _id },
//       { $set: updateReservationDto },
//     );
//   }

//   remove(_id: string) {
//     return this.christmasTreeOffersRepository.findOneAndDelete({ _id });
//   }
}
