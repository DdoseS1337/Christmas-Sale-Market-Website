export interface IShortOffer {
    id: number;
	name: string;
	newPrice: number;
	price?: number;
	picture: string;
	available: boolean;
}

export interface IOffer extends Omit<IShortOffer, "picture"> {
	group_id: number;
	available: boolean;
	url: string;
	supplier_name: string;
	currencyId: string;
	categoryId: number;
	picture: string[];
	store: boolean;
	delivery: boolean;
	pickup: boolean;
	adult: boolean;
	manufacturer_warranty: boolean;
	vendorCode: string[];
	param: Array<{ name: string; description: string }>;
}