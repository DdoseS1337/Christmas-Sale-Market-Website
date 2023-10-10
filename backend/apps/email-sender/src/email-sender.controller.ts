import { Controller, Get } from '@nestjs/common';
import { EmailSenderService } from './email-sender.service';

@Controller()
export class EmailSenderController {
  constructor(private readonly emailSenderService: EmailSenderService) {}

  @Get()
  getHello(): string {
    return this.emailSenderService.getHello();
  }
}
