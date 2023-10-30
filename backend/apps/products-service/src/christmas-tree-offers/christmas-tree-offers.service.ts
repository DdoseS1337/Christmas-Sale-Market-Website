import { Injectable } from '@nestjs/common';
import { ChristmasTreeOffersRepository } from './christmas-tree-offers.repository';
import { ChristmasTreeDto } from '../dto/christmas-tree.dto';
import { UpdateOfferDto } from './dto';

@Injectable()
export class ChristmasTreeOffersService {
  constructor(
    private readonly christmasTreeOffersRepository: ChristmasTreeOffersRepository,
  ) {}

  create(data: ChristmasTreeDto) {
    return this.christmasTreeOffersRepository.create(data);
  }

  findAll(options: object) {
    return this.christmasTreeOffersRepository.find(options);
  }

  findOne(id: string) {
    return this.christmasTreeOffersRepository.findOne({ id });
  }

  deleteAll() {
    return this.christmasTreeOffersRepository.deleteMany({});
  }
  
  update(id: string, updateOfferDto: UpdateOfferDto) {
    return this.christmasTreeOffersRepository.findOneAndUpdate(
      { id },
      { $set: updateOfferDto },
    );
  }

  remove(id: string) {
    return this.christmasTreeOffersRepository.findOneAndDelete({ id });
  }
}
