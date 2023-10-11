import { Injectable } from '@nestjs/common';
import { iProductDto } from './dto/products-info.dto';
@Injectable()
export class ProductsService {
  constructor() {}

  async setDataBase() {
    try {

      return true;
    } catch (error) {}
  }

  async setCategories(data: iProductDto) {
    try {
      return;
    } catch (error) {
      throw error;
    }
  }

  async setOffers(data: any) {
    try {
      return;
    } catch (error) {
      throw error;
    }
  }
}
