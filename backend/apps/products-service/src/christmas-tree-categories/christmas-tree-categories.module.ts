import { Module } from '@nestjs/common';
import { ChristmasTreeCategoriesController } from './christmas-tree-categories.controller';
import { ChristmasTreeCategoriesService } from './christmas-tree-categories.service';
import { ChristmastreeCategoryRepository } from './christmas-tree-categories.repository';
import { DatabaseModule } from '@app/common';
import { ChristmastreeCategoryDocument, ChristmastreeCategorySchema } from './models/christmas-category.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: ChristmastreeCategoryDocument.name,
        schema: ChristmastreeCategorySchema,
      },
    ]),
  ],
  controllers: [ChristmasTreeCategoriesController],
  providers: [ChristmasTreeCategoriesService, ChristmastreeCategoryRepository],
  exports: [ChristmasTreeCategoriesService]
})
export class ChristmasTreeCategoriesModule {}
