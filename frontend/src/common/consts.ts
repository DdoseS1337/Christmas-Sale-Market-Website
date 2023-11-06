export const BACKEND_KEYS = {
  PRODUCTS_SERVER_URL: "http://localhost:3001",
  ORDER_SERVER_URL: "http://localhost:3003",
  CHRISTMAS_TREE_CATEGORIES: "christmas-tree-categories",
  CHRISTMAS_TREE_OFFERS: "christmas-tree-offers",
};

export const STORAGE_KEYS = {
  JWT_TOKEN_STUDENT: "JWT_TOKEN_STUDENT",
  JWT_TOKEN_INSTRUCTOR: "JWT_TOKEN_INSTRUCTOR",
  ADDRESS: "ADDRESS",
  TOKEN: "TOKEN",
  ACCESSTOKEN: "accessToken",
};

export const CACHING_CONST = {
  CACHING_PERIOD_IN_SECONDS: 60
}

export const FILTER_CONST = {
  PAGE_SIZE: 16,
  QUERY_PARAMETERS: {
    AVAILABLE: "available",
    CATEGORY_ID: "categoryId",
    PAGE: "page",
    PRICE_MIN: "priceMin",
    PRICE_MAX: "priceMax",
    SORTING: "sorting",
  },
  SORTING_VALUES: {
    ABC: "ABC",
    DESC: "DESC",
  }
}