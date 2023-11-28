import HttpService from "./HttpService";
import { BACKEND_KEYS, FILTER_CONST } from "../common/consts";
import { MultiRange } from "../interfaces/MultiRange";
import { IOffer } from "../interfaces/Offer";
import { ICategory, ICategoryWithOffers } from "../interfaces/Category";
import { IFilterPageData } from "../interfaces/FilterPage";
import { asyncFilter } from "../utils/AsyncFilter";

class ChristmasTreeApi extends HttpService {
    constructor() {
        super(BACKEND_KEYS.PRODUCTS_SERVER_URL);
    }

    async getAllCategories(): Promise<Array<ICategory>> {
        return this.getWithCaching<Array<ICategory>>({
            url: BACKEND_KEYS.CHRISTMAS_TREE_CATEGORIES,
        }).then(response => response.filter(category => category.name !== "АРХИВ НЕАКТИВНЫХ"));
    }

    async getCategoryById(id: string) {
        return this.getWithCaching<ICategory>({
            url: `${BACKEND_KEYS.CHRISTMAS_TREE_CATEGORIES}/${id}`,
        });
    }

    async getAllOffers(available?: boolean) {
        return this.getWithCaching<Array<IOffer>>({
            url: BACKEND_KEYS.CHRISTMAS_TREE_OFFERS,
            params: {
                available
            }
        }).then(response => response.filter(offer => offer.newPrice != 0 && offer.price != 0));
    }

    async getOfferById(id: string) {
        return this.getWithCaching<IOffer>({
            url: `${BACKEND_KEYS.CHRISTMAS_TREE_OFFERS}/${id}`,
        });
    }

    async getOffersByCategoryId(categoryId: number) {
        const selectedCategory = await this.getCategoryById(
            categoryId.toString()
        );
        if (selectedCategory === null || selectedCategory === undefined)
            throw new Error("Id is invalid");

        if (selectedCategory.parentId != null) {
            return (await this.getAllOffers(true))
                .filter((offer) => offer.categoryId === categoryId);
        }

        const allCategories = await this.getAllCategories();
        const categoriesToFindOffers = allCategories.filter(
            (category) => category.parentId == selectedCategory?.id
        );
        const allOffers = await this.getAllOffers();
        return allOffers.filter(
            (offer) =>
                offer.categoryId === selectedCategory.id ||
                categoriesToFindOffers
                    .map((c) => c.id)
                    .includes(offer.categoryId)
        );
    }

    async getCategoriesWithOffers(
        categoriesCount: number,
        offersCount: number
    ): Promise<Array<ICategoryWithOffers>> {
        const allCategories = await this.getAllCategories();
        const generalCategories = allCategories.filter(
            (category) => category.parentId == null
        );

        var result = await Promise.all(
            generalCategories.map(async (category) => {
                return {
                    category: category,
                    offers: (
                        await this.getOffersByCategoryId(category.id)
                    ).slice(0, offersCount),
                };
            })
        );

        return result
            .filter((c) => c.offers.length != 0)
            .slice(0, categoriesCount);
    }

    async getCategoryWithOffersForFilterPage(
        page: number,
        categoryId?: number,
        available?: boolean,
        priceRange?: MultiRange,
        sorting?: boolean
    ) {
        if (page < 1) page = 1;

        const filterableCategories = await asyncFilter(
            await this.getAllCategories(), 
            async category => category.parentId === null &&
                (await this.getOffersByCategoryId(category.id)).length !== 0
        );

        const selectedCategory =
            categoryId != null
                ? filterableCategories.find((category) => category.id == categoryId)
                : undefined;

        let filteredOffersByPage = [];

        const allOffers = await this.getAllOffers();

        filteredOffersByPage = !!categoryId
            ? await this.getOffersByCategoryId(categoryId)
            : allOffers

        filteredOffersByPage = !!available 
            ? filteredOffersByPage.filter((offer) => offer.available == available) 
            : filteredOffersByPage;

        filteredOffersByPage = !!available 
            ? filteredOffersByPage.filter((offer) => offer.available == available) 
            : filteredOffersByPage;

        filteredOffersByPage = !!priceRange 
            ? filteredOffersByPage.filter(
                (offer) =>
                    offer.newPrice >= priceRange!.min &&
                    offer.newPrice <= priceRange!.max
            )
            : filteredOffersByPage;

        filteredOffersByPage = !!sorting 
            ? sorting
                ? filteredOffersByPage.sort(
                    (o1, o2) => o1.newPrice - o2.newPrice
                )
                : filteredOffersByPage.sort(
                    (o1, o2) => o2.newPrice - o1.newPrice
                )
            : filteredOffersByPage;

        const totalNumberOfPages = Math.ceil(
            filteredOffersByPage.length / FILTER_CONST.PAGE_SIZE
        );
        if (page > totalNumberOfPages) page = totalNumberOfPages;

        const startIndex = (page - 1) * FILTER_CONST.PAGE_SIZE;
        const offersByPage = filteredOffersByPage.slice(
            startIndex,
            startIndex + FILTER_CONST.PAGE_SIZE
        );

        return {
            selectedCategory,
            categoriesForFilter: filterableCategories,
            offers: offersByPage,
            priceRange: {
                min: Math.min(...allOffers.map((o) => o.newPrice)),
                max: Math.max(...allOffers.map((o) => o.newPrice)),
            },
            pagination: {
                page: page,
                numberOfPages: totalNumberOfPages,
                numberOfOffers: filteredOffersByPage.length,
                numberOfOffersPerPage: offersByPage.length,
            },
        } as IFilterPageData;
    }
}

const christmasTreeApi = new ChristmasTreeApi();
export default christmasTreeApi;
