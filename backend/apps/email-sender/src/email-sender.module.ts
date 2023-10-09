import { Module } from '@nestjs/common';
import { EmailSenderController } from './email-sender.controller';
import { EmailSenderService } from './email-sender.service';

@Module({
  imports: [],
  controllers: [EmailSenderController],
  providers: [EmailSenderService],
})
export class EmailSenderModule {}
