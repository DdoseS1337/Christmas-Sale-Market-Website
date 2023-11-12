import { Test, TestingModule } from '@nestjs/testing';
import { ChristmasTreeOffersService } from './christmas-tree-offers.service';

describe('ChristmasTreeOffersService', () => {
  let service: ChristmasTreeOffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChristmasTreeOffersService],
    }).compile();

    service = module.get<ChristmasTreeOffersService>(ChristmasTreeOffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
