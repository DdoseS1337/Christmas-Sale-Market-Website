import HttpService from "./HttpService";
import { BACKEND_KEYS } from "../common/consts";

class ChristmasTreeApi extends HttpService {
    constructor() {
        const baseUrl = BACKEND_KEYS.PRODUCTS_SERVER_URL;
        super(baseUrl);
    }

    async getAllCategories() {
        return this.get({
            url: BACKEND_KEYS.CHRISTMAS_TREE_CATEGORIES,
        });
    }

    async getCategoryById(id: string) {
        return this.get({
            url: `${BACKEND_KEYS.CHRISTMAS_TREE_CATEGORIES}/${id}`,
        });
    }

    async getAllOffers() {
        return this.get({
            url: BACKEND_KEYS.CHRISTMAS_TREE_OFFERS,
        });
    }

    async getOfferById(id: string) {
        return this.get({
            url: `${BACKEND_KEYS.CHRISTMAS_TREE_OFFERS}/${id}`,
        });
    }

    async getOffersByCategoryId(categoryId: number, available: boolean) {
        return this.get({
            url: `${BACKEND_KEYS.CHRISTMAS_TREE_OFFERS}?categoryId=${categoryId}&available=${available}`,
        });
    }
}

const christmasTreeApi = new ChristmasTreeApi();

export default christmasTreeApi;
