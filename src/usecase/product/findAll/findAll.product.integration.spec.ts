import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/db/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindAllProductsUseCase from "./findAll.product.usecase";


describe("find product use case integration tests", () => {
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

    afterEach(async () => await sequelize.close());

    it("should find a created product", async () => {
        const productRepository = new ProductRepository();

        const productOne = ProductFactory.create("A", "Martelo de borracha", 21);
        const productTwo = ProductFactory.create("B", "molinete shimano", 400);

        await productRepository.create(productOne as Product);

        await productRepository.create(productTwo as Product);

        const output = await new FindAllProductsUseCase(productRepository).execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(productOne.id);
        expect(output.products[0].name).toBe(productOne.name);
        expect(output.products[0].price).toBe(productOne.price);

        expect(output.products[1].id).toBe(productTwo.id);
        expect(output.products[1].name).toBe(productTwo.name);
        expect(output.products[1].price).toBe(productTwo.price);
    })
})