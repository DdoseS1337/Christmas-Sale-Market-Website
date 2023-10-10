import { AbstactRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { ChristmasTreeDocument } from './models/christmastree.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChristmastreeCategoryDocument } from './models/christmas-category.schema';

@Injectable()
export class ProductsRepository extends AbstactRepository<ChristmasTreeDocument> {
  protected readonly logger = new Logger(ProductsRepository.name);

  constructor(
    @InjectModel(ChristmasTreeDocument.name)
    christmasTreeModel: Model<ChristmasTreeDocument>,
  ) {
    super(christmasTreeModel);
  }
}

@Injectable()
export class ProductsCategoryRepository extends AbstactRepository<ChristmastreeCategoryDocument> {
  protected readonly logger = new Logger(ProductsCategoryRepository.name);

  constructor(
    @InjectModel(ChristmastreeCategoryDocument.name)
    christmasTreeCategoryModel: Model<ChristmastreeCategoryDocument>,
  ) {
    super(christmasTreeCategoryModel);
  }
}

