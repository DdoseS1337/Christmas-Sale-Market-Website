import { Test, TestingModule } from '@nestjs/testing';
import { TelegramBotController } from './telegram-bot.controller';
import { TelegramBotService } from './telegram-bot.service';

describe('TelegramBotController', () => {
  let telegramBotController: TelegramBotController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TelegramBotController],
      providers: [TelegramBotService],
    }).compile();

    telegramBotController = app.get<TelegramBotController>(TelegramBotController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(telegramBotController.getHello()).toBe('Hello World!');
    });
  });
});
