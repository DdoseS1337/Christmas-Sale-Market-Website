import { Test, TestingModule } from '@nestjs/testing';
import { ProductsServiceController } from './products-service.controller';
import { ProductsServiceService } from './products-service.service';

describe('ProductsServiceController', () => {
  let productsServiceController: ProductsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductsServiceController],
      providers: [ProductsServiceService],
    }).compile();

    productsServiceController = app.get<ProductsServiceController>(ProductsServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(productsServiceController.getHello()).toBe('Hello World!');
    });
  });
});
