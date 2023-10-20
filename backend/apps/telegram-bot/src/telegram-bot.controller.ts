import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { TelegramBotService } from "./telegram-bot.service";
import { CreateUserOrderDto } from "@app/common";


@Controller()
export class TelegramBotController {
  constructor(private readonly telegramBotService: TelegramBotService) {}


  @EventPattern('notify_bot')
  async notifyEmail(@Payload() data : CreateUserOrderDto) {
    this.telegramBotService.onOrder(data);
  }
}