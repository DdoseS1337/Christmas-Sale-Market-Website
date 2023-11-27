import { ICategory } from "./Category";
import { MultiRange } from "./MultiRange";
import { IOffer } from "./Offer";

export interface IFilterPageData {
    selectedCategory: ICategory;
    categoriesForFilter: Array<ICategory>;
    offers: Array<IOffer>;
    priceRange: MultiRange;
    pagination: IFilterPagination;
}

export interface IFilterPagination {
    page: number;
    numberOfPages: number;
    numberOfOffersPerPage: number;
    numberOfOffers: number;
}