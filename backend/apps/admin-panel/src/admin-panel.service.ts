import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminPanelService {
  getHello(): string {
    return 'Hello World!';
  }
}
