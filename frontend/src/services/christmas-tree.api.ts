import HttpService from "./HttpService";
import { BACKEND_KEYS } from "../common/consts";
import { MultiRange } from "../interfaces/MultiRange";
import { IOffer } from "../interfaces/Offer";
import { ICategory } from "../interfaces/Category";
import { IFilterPageData } from "../interfaces/FilterPage";

class ChristmasTreeApi extends HttpService {
    constructor() {
        super(BACKEND_KEYS.PRODUCTS_SERVER_URL);
    }

    async getAllCategories() {
        return this.get<any>({
            url: BACKEND_KEYS.CHRISTMAS_TREE_CATEGORIES,
        });
    }

    async getCategoryById(id: string) {
        return this.get<any>({
            url: `${BACKEND_KEYS.CHRISTMAS_TREE_CATEGORIES}/${id}`,
        });
    }

    async getAllOffers() {
        return this.get<Array<IOffer>>({
            url: BACKEND_KEYS.CHRISTMAS_TREE_OFFERS,
        });
    }

    async getOfferById(id: string) {
        return this.get<IOffer>({
            url: `${BACKEND_KEYS.CHRISTMAS_TREE_OFFERS}/${id}`,
        });
    }

    async getOffersByCategoryId(categoryId: number, available?: boolean, priceRange?: MultiRange) {
        let params: any = {
            categoryId,
        };

        if (available !== undefined) {
            params = {
                ...params,
                available
            } 
        }

        if (priceRange !== undefined) {
            params = {
                ...params,
                pricemin: priceRange?.min,
                pricemax: priceRange?.max,
            } 
        }
        
        return this.get<Array<IOffer>>({
            url: `${BACKEND_KEYS.CHRISTMAS_TREE_OFFERS}`,
            params: params
        });
    }

    async getCategoryWithOffersForFilterPage(categoryId: number, available?: boolean, priceRange?: MultiRange) {
        const allCategories = (await this.getAllCategories()) as Array<ICategory>;
        const selectedCategory = categoryId ? allCategories.find(category => category.id == categoryId) : allCategories.find(c => true);
        const generalCategories = allCategories?.filter((category) => category.parentId == null);
        const subCategories = allCategories?.filter((category) => category.parentId === selectedCategory?.id);
        const offers = await Promise.all(
            [selectedCategory!, ...subCategories!]
                .filter((category) => category != null)
                .map((category) =>
                    christmasTreeApi.getOffersByCategoryId(
                        category.id,
                        available,
                        priceRange
                    )
                )
            ).then((values) => values.flatMap((value) => value));

        return {
            selectedCategory,
            generalCategories,
            subCategories,
            offers,
            priceRange: {
                min: 0,
                max: 20000
            }
        } as IFilterPageData;
    }
}

const christmasTreeApi = new ChristmasTreeApi();
export default christmasTreeApi;