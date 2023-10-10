import { Injectable } from '@nestjs/common';

@Injectable()
export class SupplierServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
