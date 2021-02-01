import { SafeResourceUrl } from '@angular/platform-browser';


export interface GameModel {
    title: string;
    game_code: string;
    game_image: string;
    game_description?: string;

    release_us?: string;
    release_eu?: string;

    link_us?: string;
    link_eu?: string;

    tags: string[];
    likes: number;
    dislikes: number;
    reviews: number;

    recomends?: boolean;
    has_review?: boolean;
    has_wish?: boolean;

    price: number;
    sale_price: number;
    discount_percent: number;
}

export interface GameAdminTableModel {
    id: number;
    title: string;
    code_unique: string;
    likes: number;
    dislikes: number;
    highlighted: boolean;
    hide: boolean;
    image_eu_square: string;
}

export interface GameSelectIdModel {
    id: number;
    title: string;
}

export interface GameSelectGameCodeModel {
    game_code: string;
    title: string;
}

export interface GameSearchForm {
    searchText: string;
    tags: { [id: number]: boolean };
    orderBy: string;
    releaseStatus: string;
    highlightsOnly: boolean;
    unratedOnly: boolean;
    pages: number;
    dateFrom: string;
    dateTo: string;
    priceFrom: string;
    priceTo: string;
    onSaleOnly: boolean;
    minDiscount: number;
}

export interface GameMedia {
    id?: number;
    loaded?: boolean;
    media_type: 'IMG' | 'YTB';
    url: string | SafeResourceUrl;
}

export interface GamePrices {
    [country: string]: {
        price: string,
        sale: string,
    };
}
