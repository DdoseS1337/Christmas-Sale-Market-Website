import { Offer } from './offers.interface';

export interface Shop {
  name: string[];
  company: string[];
  agency: string[];
  email: string[];
  url: string[];
  platform: string[];
  version: string[];
  currencies: Currency[];
  categories: Category[];
  offers: Offer[];
}

interface Currency {
  id: string;
  rate: string;
}

export interface Category {
  _: string;
  id: string;
  parentId?: string;
}
