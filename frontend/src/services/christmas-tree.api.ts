import HttpService from "./HttpService";
import { BACKEND_KEYS } from "../common/consts";

export class ChristmasTreeApi extends HttpService {
  constructor() {
    const baseUrl = BACKEND_KEYS.PRODUCTS_SERVER_URL;
    super(baseUrl);
  }

  getAllCategories() {
    return this.get({
      url: BACKEND_KEYS.CHRISTMAS_TREE_CATEGORIES
    });
  }

  getCategoryById(id: string) {
    return this.get({
      url: `${BACKEND_KEYS.CHRISTMAS_TREE_CATEGORIES}/${id}`
    });
  }

  getAllOffers() {
    return this.get({
      url: BACKEND_KEYS.CHRISTMAS_TREE_OFFERS
    });
  }

  getOfferById(id: string) {
    return this.get({
      url: `${BACKEND_KEYS.CHRISTMAS_TREE_OFFERS}/${id}`
    });
  }
}
