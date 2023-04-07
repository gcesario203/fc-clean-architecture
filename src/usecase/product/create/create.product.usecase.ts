import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import IProductRepository from "../../../domain/product/repository/product.repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase{
    private _productRepository: IProductRepository;


    constructor(productRepository : IProductRepository) {
        this._productRepository = productRepository;        
    }

    async execute (input: InputCreateProductDto) : Promise<OutputCreateProductDto>
    {
        var newProduct = ProductFactory.create(input.type, input.name, input.price);

        await this._productRepository.create(newProduct as Product);

        return {
            id: newProduct.id,
            name: newProduct.name,
            price: newProduct.price,
            type: input.type,
        }
    }
}