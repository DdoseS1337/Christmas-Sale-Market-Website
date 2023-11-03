import { ICategory } from "./Category";
import { MultiRange } from "./MultiRange";
import { IOffer } from "./Offer";

export interface IFilterPageData {
    selectedCategory: ICategory;
    generalCategories: Array<ICategory>;
    subCategories: Array<ICategory>;
    offers: Array<IOffer>;
    priceRange: MultiRange;
}