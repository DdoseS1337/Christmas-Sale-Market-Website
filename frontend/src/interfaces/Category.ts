import { IOffer } from "./Offer";

export interface ICategory {
    id: number;
    parentId: number;
    name: string;
}

export interface ICategoryWithOffers {
    category: ICategory;
    offers: Array<IOffer>;
}