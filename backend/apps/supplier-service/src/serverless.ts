import { NestFactory } from '@nestjs/core';
import { SupplierModule } from './supplier.module';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { ReplaySubject, firstValueFrom } from 'rxjs';


const serverSubject = new ReplaySubject<Handler>()

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(SupplierModule);
  app.useLogger(app.get(Logger));
  app.enableCors();
  app.use(cookieParser());

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
