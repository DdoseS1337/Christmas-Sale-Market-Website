import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as xml2js from 'xml2js';
import { YmlCatalog } from './interfaces/catalog.interface';

@Injectable()
export class SupplierService {
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

      const jsonData = JSON.stringify(catalog);
      return jsonData;

    } catch (error) {
      console.error('Помилка завантаження файлу:', error);
      throw error;
    }
  }
}
