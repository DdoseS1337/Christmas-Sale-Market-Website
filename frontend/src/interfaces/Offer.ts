export interface IShortOffer {
    id: string;
	title: string;
	actualPrice: number;
	oldPrice?: number;
	image: string;
}

export interface IOffer {
	_id: string;
	id: string;
	group_id: string;
	available: boolean;
	url: string;
	name: string;
	supplier_name: string;
	price: number;
	newPrice: number;
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