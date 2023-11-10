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

export const CONTACTS = {
    telephone: "+1234567890",
    email: "example@gmail.com",
    viber: "https://www.viber.com/ua/",
};

export const CACHING_CONST = {
    CACHING_PERIOD_IN_SECONDS: 60,
};

export const FILTER_CONST = {
    PAGE_SIZE: 12,
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
    },
};

export const SIMILAR_PRODUCTS = {
    ROW_LENGTH: 10,
};

export const BREAKPOINTS = {
    TABLET: {
        HEADER: {
            LOGO: 500,
            SEARCHBAR: 1100,
            BASKET: 1100,
        },
        PRESENT_SECTION: {
            LEFT_BANNER_MENU: 1100,
            IMAGES: 1700,
        },
    },
    PHONE: {
        HEADER: {
            SECOND_ROW: 780,
        },
    },
};
