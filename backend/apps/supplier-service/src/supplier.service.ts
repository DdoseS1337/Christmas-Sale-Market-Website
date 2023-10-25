import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as xml2js from 'xml2js';
import { YmlCatalog, Offer, Category } from './interfaces';
import { PRODUCT_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupplierService {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productService: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

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
    try {
      const url = this.configService.get('ELKI_URL');
      const result = await this.xmlParser(url);
      const catalog: YmlCatalog = result.yml_catalog;

      catalog.shop.categories = result.yml_catalog.shop.categories.category;
      catalog.shop.offers = result.yml_catalog.shop.offers.offer;

      const categories = await this.getElkiShopCategories(
        catalog.shop.categories,
      );
      const offers = await this.getElkiShopOffers(catalog.shop.offers);

      if (categories && offers) {
        return 'Data successfully upload';
      }
    } catch (error) {
      throw new NotFoundException('File upload error');
    }
  }

  async getElkiShopCategories(categories: Category[]) {
    const transformCategories = categories.map((category) => {
      return {
        ...category,
        name: category._,
        supplier_name: this.getDataElkiShop.name,
      };
    });
    const jsonData = JSON.stringify(transformCategories);
    return this.productService
      .send('set_supply_categories', jsonData)
      .subscribe((res) => {
        return res;
      });
  }

  async getElkiShopOffers(offers: Offer[]) {
    const transformOffers = offers.map((offer) => {
      const modifiedParams = offer.param.map((item) => {
        return { name: item.name, description: item._ };
      });
      return {
        ...offer,
        param: modifiedParams,
        supplier_name: this.getDataElkiShop.name,
        newPrice: String(Number(offer.price) * 2),
        price: String(Number(offer.price) * 4),
      };
    });

    const jsonData = JSON.stringify(transformOffers);
    return this.productService
      .send('set_supply_offers', jsonData)
      .subscribe((res) => {
        return res;
      });
  }
}
