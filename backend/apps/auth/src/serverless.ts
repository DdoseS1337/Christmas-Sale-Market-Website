import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { Callback, Context, Handler } from 'aws-lambda';
import { AuthModule } from './auth.module';
import { ReplaySubject, firstValueFrom } from 'rxjs';

const serverSubject = new ReplaySubject<Handler>();

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

bootstrap().then((server) => serverSubject.next(server));

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  const server = await firstValueFrom(serverSubject);
  return server(event, context, callback);
};
