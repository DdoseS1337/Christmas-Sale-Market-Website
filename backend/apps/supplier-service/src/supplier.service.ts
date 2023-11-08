import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as xml2js from 'xml2js';
import { PRODUCT_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';


import { YmlCatalog, Offer, Category } from './interfaces';
@Injectable()
export class SupplierService {
  private readonly logger = new Logger(SupplierService.name);
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

    const categories = this.productService
      .send('set_supply_categories', jsonDataCategories)
      .subscribe((res) => {
        return res;
      });

    const jsonDataOffers = JSON.stringify(transformOffers);
    const offers = this.productService
      .send('set_supply_offers', jsonDataOffers)
      .subscribe((res) => {
        return res;
      });

    if (categories && offers) {
      return 'Data successfully upload';
    }
  }

  @Cron('5 9,14,19,23 * * *')
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

      const categories = this.productService
        .send('update_supply_categories', jsonDataCategories)
        .subscribe((res) => {
          return res;
        });

      const jsonDataOffers = JSON.stringify(transformOffers);
      const offers = this.productService
        .send('update_supply_offers', jsonDataOffers)
        .subscribe((res) => {
          return res;
        });

      if (categories && offers) {
        this.logger.log('Data successfully updated');
      }
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

  randomFromInterval(min: number, max: number) {
    return Math.random() * (max - min) + min;
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
        newPrice: Math.floor(
          Number(offer.price) * this.randomFromInterval(1.35, 2),
        ),
        price: Math.floor(
          Number(offer.price) * this.randomFromInterval(2.1, 4)
        ),
      };
    });
    return transformOffers;
  }
}
