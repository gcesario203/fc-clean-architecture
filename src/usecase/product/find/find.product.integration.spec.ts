import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/db/sequelize/model/product.model";
import FindProductUseCase from "./find.product.usecase";

const input = {
    id: "1"
}

const output = {
    id: "1",
    name: "Camiseta do Palmeiras tamanho GG",
    price: 399.40
}

describe("find product use case integration tests", ()=> {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);

        await sequelize.sync();
    })
    
    it("should find a created product", async () => {
        const createdProduct = new Product("1", "Camiseta do Palmeiras tamanho GG", 399.40);
        const productRepository = new ProductRepository();

        await productRepository.create(createdProduct);

        const result = await new FindProductUseCase(productRepository).execute(input);

        expect(result).toEqual(output);
        
        await sequelize.close();
    })

    it("should not find a product", async () => {
        const productRepository = new ProductRepository();


        const findProductUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: "1"
        };

        await expect(async () =>{
            return findProductUseCase.execute(input);
        }).rejects.toThrow("Product not found");

        await sequelize.close();
    })
} )