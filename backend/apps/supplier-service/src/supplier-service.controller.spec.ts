import { Test, TestingModule } from '@nestjs/testing';
import { SupplierServiceController } from './supplier-service.controller';
import { SupplierServiceService } from './supplier-service.service';

describe('SupplierServiceController', () => {
  let supplierServiceController: SupplierServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SupplierServiceController],
      providers: [SupplierServiceService],
    }).compile();

    supplierServiceController = app.get<SupplierServiceController>(SupplierServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(supplierServiceController.getHello()).toBe('Hello World!');
    });
  });
});
