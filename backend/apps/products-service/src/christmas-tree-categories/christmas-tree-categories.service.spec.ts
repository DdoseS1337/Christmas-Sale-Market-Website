import { Test, TestingModule } from '@nestjs/testing';
import { ChristmasTreeCategoriesService } from './christmas-tree-categories.service';

describe('ChristmasTreeCategoriesService', () => {
  let service: ChristmasTreeCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChristmasTreeCategoriesService],
    }).compile();

    service = module.get<ChristmasTreeCategoriesService>(ChristmasTreeCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
