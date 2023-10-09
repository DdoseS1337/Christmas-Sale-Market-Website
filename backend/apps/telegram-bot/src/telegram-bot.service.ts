import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramBotService {
  getHello(): string {
    return 'Hello World!';
  }
}
