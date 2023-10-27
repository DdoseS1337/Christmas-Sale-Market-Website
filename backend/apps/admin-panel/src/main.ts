import { NestFactory } from '@nestjs/core';
import { AdminPanelModule } from './admin-panel.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AdminPanelModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: 'admin-panel',
    },
  });
  app.enableCors();
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
