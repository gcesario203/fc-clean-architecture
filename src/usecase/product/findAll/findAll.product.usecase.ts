import IProductRepository from "../../../domain/product/repository/product.repository.interface";
import { InputFindAllProductsDto, OutputFindAllProductsDto } from "./findAll.product.dto";

export default class FindAllProductsUseCase {
    private _productRepository: IProductRepository;


    constructor(productRepository : IProductRepository) {
        this._productRepository = productRepository;        
    }

    async execute (input: InputFindAllProductsDto) : Promise<OutputFindAllProductsDto>
    {
        const foundProducts = await this._productRepository.findAll();

        return {
            products: foundProducts.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price
            }))
        }
    }
}