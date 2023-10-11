import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as xml2js from 'xml2js';
import { YmlCatalog } from './interfaces/catalog.interface';
import { Offer } from './interfaces/offers.interface';
import { PRODUCT_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class SupplierService {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productService: ClientProxy) {}

  async xmlParser(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      const xmlData = response.data;
      const parser = new xml2js.Parser({
        trim: true,
        explicitArray: false,
        mergeAttrs: true,
      });
      const result = await parser.parseStringPromise(xmlData);

      return result;
    } catch (error) {
      console.error('Помилка завантаження файлу:', error);
      throw error;
    }
  }

  async getDataElkiShop() {
    const url = 'https://butik-elok.in.ua/yandex/yml.xml';

    try {
      const result = await this.xmlParser(url);

      const catalog: YmlCatalog = result.yml_catalog;

      catalog.shop.categories = result.yml_catalog.shop.categories.category;
      catalog.shop.offers = result.yml_catalog.shop.offers.offer;

      
      const categories = await this.getElkiShopCategories(catalog.shop.categories)
      const offers = await this.getElkiShopOffers(catalog.shop.offers)
      console.log(categories, offers)
      const jsonData = JSON.stringify({categories, offers});
      return jsonData;

    } catch (error) {
      console.error('Помилка завантаження файлу:', error);
      throw error;
    }
  }

  async getElkiShopCategories(categories: Category[]) {
    const categoryList = JSON.stringify(categories);
    console.log(categoryList)
    return this.productService.send('set_supply_categories', categoryList).pipe(
      map(res => {
        return res;
      }));
  }

  async getElkiShopOffers(offers: { offer: Offer[] }) {
    const offerList = JSON.stringify(offers);
    // console.log(offerList)
    return this.productService.send('set_supply_offers', offerList).pipe(
      map(res => {
        return res;
      }));
  }
}
