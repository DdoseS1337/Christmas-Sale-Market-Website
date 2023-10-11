import { AbstactRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChristmastreeCategoryDocument } from "./models/christmas-category.schema";

@Injectable()
export class ChristmastreeCategoryRepository extends AbstactRepository<ChristmastreeCategoryDocument> {
  protected readonly logger = new Logger(ChristmastreeCategoryRepository.name);

  constructor(
    @InjectModel(ChristmastreeCategoryDocument.name)
    christmasTreeCategoryModel: Model<ChristmastreeCategoryDocument>,
  ) {
    super(christmasTreeCategoryModel);
  }
}
