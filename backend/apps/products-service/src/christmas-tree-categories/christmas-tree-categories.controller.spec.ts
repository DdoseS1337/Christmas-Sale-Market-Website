import { Test, TestingModule } from '@nestjs/testing';
import { ChristmasTreeCategoriesController } from './christmas-tree-categories.controller';

describe('ChristmasTreeCategoriesController', () => {
  let controller: ChristmasTreeCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChristmasTreeCategoriesController],
    }).compile();

    controller = module.get<ChristmasTreeCategoriesController>(ChristmasTreeCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
