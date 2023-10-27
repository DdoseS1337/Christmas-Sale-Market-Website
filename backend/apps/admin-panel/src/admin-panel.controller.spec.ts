import { Test, TestingModule } from '@nestjs/testing';
import { AdminPanelController } from './admin-panel.controller';
import { AdminPanelService } from './admin-panel.service';

describe('AdminPanelController', () => {
  let adminPanelController: AdminPanelController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AdminPanelController],
      providers: [AdminPanelService],
    }).compile();

    adminPanelController = app.get<AdminPanelController>(AdminPanelController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(adminPanelController.getHello()).toBe('Hello World!');
    });
  });
});
