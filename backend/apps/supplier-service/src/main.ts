import { NestFactory } from '@nestjs/core';
import { SupplierServiceModule } from './supplier-service.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(SupplierServiceModule);
  app.useLogger(app.get(Logger))
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('PORT')
    }
  })
  await app.startAllMicroservices();
}
bootstrap();
