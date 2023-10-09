import { NestFactory } from '@nestjs/core';
import { EmailSenderModule } from './email-sender.module';

async function bootstrap() {
  const app = await NestFactory.create(EmailSenderModule);
  await app.listen(3000);
}
bootstrap();
