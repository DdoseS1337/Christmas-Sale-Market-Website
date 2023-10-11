import { Test, TestingModule } from '@nestjs/testing';
import { ChristmasTreeOffersController } from './christmas-tree-offers.controller';

describe('ChristmasTreeOffersController', () => {
  let controller: ChristmasTreeOffersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChristmasTreeOffersController],
    }).compile();

    controller = module.get<ChristmasTreeOffersController>(ChristmasTreeOffersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
