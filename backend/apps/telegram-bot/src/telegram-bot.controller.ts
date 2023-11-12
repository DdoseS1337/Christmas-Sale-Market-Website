import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { TelegramBotService } from "./telegram-bot.service";
import { TelegramOrderDto } from "@app/common";


@Controller()
export class TelegramBotController {
  constructor(private readonly telegramBotService: TelegramBotService) {}


  @EventPattern('notify_bot')
  async notifyEmail(@Payload() data : TelegramOrderDto) {
    this.telegramBotService.onOrder(data);
  }
}