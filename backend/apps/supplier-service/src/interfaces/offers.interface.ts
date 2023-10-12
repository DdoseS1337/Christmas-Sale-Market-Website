export interface Offer {
    id: string;
    group_id: string;
    available: string;
    url: string;
    name: string;
    price: string;
    currencyId: string;
    categoryId: string;
    picture: string[];
    store: string;
    delivery: string;
    pickup: string;
    adult: string;
    manufacturer_warranty: string;
    param: Param[];
  }

  interface Param {
    name: string;
    _: string;
  }
  