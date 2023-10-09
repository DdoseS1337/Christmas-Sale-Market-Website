import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailSenderService {
  getHello(): string {
    return 'Hello World!';
  }
}
