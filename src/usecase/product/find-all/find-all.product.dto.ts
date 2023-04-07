export interface InputFindAllProductsDto {}

type Product = {
    id: string;
    name: string;
    price: number;
}

export interface OutputFindAllProductsDto {
    products: Product[]
}