
const SERVER_URL = "https://christmas-tree-api.store";
export const BACKEND_KEYS = {
    PRODUCTS_SERVER_URL: SERVER_URL,
    ORDER_SERVER_URL: SERVER_URL,
    CHRISTMAS_TREE_CATEGORIES: "products-service/christmas-tree-categories",
    CHRISTMAS_TREE_OFFERS: "products-service/christmas-tree-offers",
    SEND_ORDER: "order-service/user-order"
};

export const STORAGE_KEYS = {
    JWT_TOKEN_STUDENT: "JWT_TOKEN_STUDENT",
    JWT_TOKEN_INSTRUCTOR: "JWT_TOKEN_INSTRUCTOR",
    ADDRESS: "ADDRESS",
    TOKEN: "TOKEN",
    ACCESSTOKEN: "accessToken",
};

export const NOVA_POSHTA = {
    BASE_URL: "https://api.novaposhta.ua/v2.0/json",
    API_KEY: process.env.REACT_APP_NOVA_POSHTA_API_KEY
}

export const CONTACTS = {
    telephone: "+380956162463",
    email: "ua.christmas.tree.market@gmail.com",
    viber: "viber://chat?number=%2B380930057538",
};

export const CACHING_CONST = {
    CACHING_PERIOD_IN_SECONDS: 300,
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
        SEARCH: "search",
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
            LOGO: 510,
            SEARCHBAR: 1100,
            BASKET: 1100,
        },
        PRESENT_SECTION: {
            LEFT_BANNER_MENU: 1100,
            IMAGES: 1700,
        },
    },
    PHONE: {
        HIDE_SNOW: 1000,
        HEADER: {
            SECOND_ROW: 780,
        },
    },
};
