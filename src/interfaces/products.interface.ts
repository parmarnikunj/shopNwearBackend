export interface Product {
    title: string;
    gtin: string;
    gender: string;
    sale_price: string;
    price: string;
    image_link: string;
    additional_image_link: string
}

export interface ProductQuery {
    gender: string
    sale_price: string
    page: number
    limit: number
}
