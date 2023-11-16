import { NestFactory } from '@nestjs/core';
import { OrderServiceModule } from './order-service.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { ReplaySubject, firstValueFrom } from 'rxjs';


const serverSubject = new ReplaySubject<Handler>()

async function bootstrap() {
  const app = await NestFactory.create(OrderServiceModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.useLogger(app.get(Logger));
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

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
