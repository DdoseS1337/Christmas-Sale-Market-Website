import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as xml2js from 'xml2js';
import { ConfigService } from '@nestjs/config';
import { YmlCatalog, Offer, Category } from './interfaces';
import { PRODUCT_SERVICE_URL } from '@app/common';
@Injectable()
export class SupplierService {
  private readonly logger = new Logger(SupplierService.name);
  constructor(
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

      return catalog;
    } catch (error) {
      throw new NotFoundException('File upload error');
    }
  }

  async restoreData() {
    const catalogData = await this.getDataElkiShop();

    const transformCategories = await this.getElkiShopCategories(
      catalogData.shop.categories,
    );
    const transformOffers = await this.getElkiShopOffers(
      catalogData.shop.offers,
    );

    const jsonDataCategories = JSON.stringify(transformCategories);
    const categories = await axios.post(
      `${PRODUCT_SERVICE_URL.PROD}/products/set_supply_categories`,
      {
        data: jsonDataCategories,
      },
    );
    const jsonDataOffers = JSON.stringify(transformOffers);
    const offers = await axios.post(
      `${PRODUCT_SERVICE_URL.PROD}/products/set_supply_offers`,
      {
        data: jsonDataOffers,
      },
    );

    if (categories && offers) {
      return 'Data successfully upload';
    }
  }

  async updateDate() {
    try {
      this.logger.log('Data start updating');
      const catalogData = await this.getDataElkiShop();

      const transformCategories = await this.getElkiShopCategories(
        catalogData.shop.categories,
      );
      const transformOffers = await this.getElkiShopOffers(
        catalogData.shop.offers,
      );

      const jsonDataCategories = JSON.stringify(transformCategories);

      // const categories = this.productService
      //   .send('update_supply_categories', jsonDataCategories)
      //   .subscribe((res) => {
      //     return res;
      //   });

      // const jsonDataOffers = JSON.stringify(transformOffers);
      // const offers = this.productService
      //   .send('update_supply_offers', jsonDataOffers)
      //   .subscribe((res) => {
      //     return res;
      //   });

      // if (categories && offers) {
      //   this.logger.log('Data successfully updated');
      // }
    } catch (error) {
      this.logger.error('Error update');
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
    return transformCategories;
  }

  randomFromIntervalInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  async getElkiShopOffers(offers: Offer[]) {
    const transformOffers = offers.map((offer) => {
      const modifiedParams = offer.param.map((item) => {
        return { name: item.name, description: item._ };
      });

      const priceX = this.randomFromIntervalInt(3, 4);
      const oldPrice = Number(offer.price) * priceX;
      const discount = this.randomFromIntervalInt(4, 13) * 5;

      const newPrice = oldPrice - oldPrice * discount * 0.01;

      return {
        ...offer,
        param: modifiedParams,
        supplier_name: this.getDataElkiShop.name,
        newPrice: Math.floor(newPrice),
        price: Math.floor(oldPrice),
      };
    });
    return transformOffers;
  }
}
