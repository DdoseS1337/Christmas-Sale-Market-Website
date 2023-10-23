import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { ChristmasTreeDocument } from './models/christmas-tree.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChristmasTreeOffersRepository extends AbstractRepository<ChristmasTreeDocument> {
  protected readonly logger = new Logger(ChristmasTreeOffersRepository.name);

  constructor(
    @InjectModel(ChristmasTreeDocument.name)
    christmasTreeModel: Model<ChristmasTreeDocument>,
  ) {
    super(christmasTreeModel);
  }
}


