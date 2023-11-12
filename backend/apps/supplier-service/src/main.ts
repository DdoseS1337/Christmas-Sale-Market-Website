import { NestFactory } from '@nestjs/core';
import { SupplierModule } from './supplier.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(SupplierModule);
  const configService = app.get(ConfigService);
  app.useLogger(app.get(Logger))
  app.enableCors();
  app.use(cookieParser());
  await app.listen(configService.get('PORT'));
}
bootstrap();
