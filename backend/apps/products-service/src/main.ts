import { NestFactory } from '@nestjs/core';
import { ProductsServiceModule } from './products.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ProductsServiceModule);
  app.useLogger(app.get(Logger))
  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT'));
}
bootstrap();
