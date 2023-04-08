import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory"
import ProductModel from "../../../infrastructure/product/db/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Update product use case integration tests", () => {
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

    afterAll(async () => await sequelize.close());
    
    it("should a product be updated", async () => {
        const productRepository = new ProductRepository();

        const product = ProductFactory.create("A", "Biscoito", 12.99);

        const input = {
            id: product.id,
            name: "Bolacha",
            price: 12.99
        }

        await productRepository.create(product as Product)

        const productUpdated = new UpdateProductUseCase(productRepository);

        const output = await productUpdated.execute(input);

        expect(output).toEqual(input);
    })
})