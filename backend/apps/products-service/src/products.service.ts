import { Injectable } from '@nestjs/common';
import {
  ProductsCategoryRepository,
  ProductsRepository,
} from './products.christmastree.repository';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private productsCategoryRepository: ProductsCategoryRepository,
  ) {}

  async setDataBase(res: any) {
    try {
      const resultCategory = await this.setCategories(res);
      const resultOffers = await this.setOffers(res);
      if (resultCategory && resultOffers) {
        return true;
      }
    } catch (error) {}
  }

  async setCategories(data: any) {
    try {
      return this.productsCategoryRepository.create(data);
    } catch (error) {
      throw error;
    }
  }

  async setOffers(data: any) {
    try {
      return this.productsRepository.create(data);
    } catch (error) {
      throw error;
    }
  }

  findAllOffer() {
    return this.productsRepository.find({});
  }

  findOneOffer(_id: string) {
    return this.productsRepository.findOne({ _id });
  }

  findAllCategories() {
    return this.productsCategoryRepository.find({});
  }

  findOneCategory(_id: string) {
    return this.productsCategoryRepository.findOne({ _id });
  }



}
