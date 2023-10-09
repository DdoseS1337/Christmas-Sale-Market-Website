import { NestFactory } from '@nestjs/core';
import { SupplierServiceModule } from './supplier-service.module';

async function bootstrap() {
  const app = await NestFactory.create(SupplierServiceModule);
  await app.listen(3000);
}
bootstrap();
