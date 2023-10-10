import { NestFactory } from '@nestjs/core';
import { SupplierModule } from './supplier.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(SupplierModule);
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
