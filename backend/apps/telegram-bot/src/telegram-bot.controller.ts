import { Body, Controller, Post } from "@nestjs/common"
import { TelegramBotService } from "./telegram-bot.service";
import { TelegramOrderDto } from "@app/common";

@Controller('tg-bot')
export class TelegramBotController {
  constructor(private readonly telegramBotService: TelegramBotService) {}


  @Post('notify_bot')
  async notifyEmail(@Body() data : TelegramOrderDto) {
    return this.telegramBotService.onOrder(data);
  }

  @Post('set-webhook')
  async setWebhook(@Body() webhookUrl: string) {
    this.telegramBotService.setWebhook(webhookUrl);
  }
}