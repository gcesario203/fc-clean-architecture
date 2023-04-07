import IProductRepository from "../../../domain/product/repository/product.repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase{
    private _productRepository: IProductRepository;


    constructor(productRepository : IProductRepository) {
        this._productRepository = productRepository;        
    }

    async execute (input: InputFindProductDto) : Promise<OutputFindProductDto>
    {
        const foundProduct = await this._productRepository.find(input.id);

        return {
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price,
        }
    }
}