import { NestFactory } from '@nestjs/core';
import { SupplierModule } from './supplier.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(SupplierModule);
  app.useLogger(app.get(Logger))
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
