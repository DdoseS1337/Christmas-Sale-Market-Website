import { Test, TestingModule } from '@nestjs/testing';
import { EmailSenderController } from './email-sender.controller';
import { EmailSenderService } from './email-sender.service';

describe('EmailSenderController', () => {
  let emailSenderController: EmailSenderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmailSenderController],
      providers: [EmailSenderService],
    }).compile();

    emailSenderController = app.get<EmailSenderController>(EmailSenderController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(emailSenderController.getHello()).toBe('Hello World!');
    });
  });
});
