import { NestFactory } from '@nestjs/core';
import { ProductsServiceModule } from './products.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { Callback, Context, Handler } from 'aws-lambda';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import * as bodyParser from 'body-parser';
import { ReplaySubject, firstValueFrom } from 'rxjs';

const serverSubject = new ReplaySubject<Handler>()

async function bootstrap() {
  const app = await NestFactory.create(ProductsServiceModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: 'products',
    },
  });
  app.enableCors();
  app.useLogger(app.get(Logger));
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

bootstrap().then(server => serverSubject.next(server))

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  const server = await firstValueFrom(serverSubject)
  return server(event, context, callback);
};
