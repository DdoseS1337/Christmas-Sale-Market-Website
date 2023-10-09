import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
