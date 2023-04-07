import IProductRepository from "../../../domain/product/repository/product.repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase {
    private _productRepository: IProductRepository;


    constructor(productRepository : IProductRepository) {
        this._productRepository = productRepository;        
    }

    async execute (input: InputUpdateProductDto) : Promise<OutputUpdateProductDto>
    {
        const productToBeUpdated = await this._productRepository.find(input.id);

        productToBeUpdated.changeName(input.name)

        productToBeUpdated.changePrice(input.price);

        return {
            id: productToBeUpdated.id,
            name: productToBeUpdated.name,
            price: productToBeUpdated.price,
        }
    }
}