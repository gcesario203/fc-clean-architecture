import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/db/sequelize/model/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import CreateProductUseCase from "./create.product.usecase"



const inputTypeA = {
    name: "Coxa de frango",
    price: 19.99,
    type: "A"
}

const inputTypeB = {
    name: "Picanha",
    price: 52.29,
    type: "B"
}

describe("Create product use case integration tests", () => {
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

    it("should create a product", async () => {
        const productRepository = new ProductRepository();

        const createProductUseCase = new CreateProductUseCase(productRepository);

        const outputTypeA = await createProductUseCase.execute(inputTypeA);
        const outputTypeB =await  createProductUseCase.execute(inputTypeB);

        expect(outputTypeA).toEqual({
            id: expect.any(String),
            name: inputTypeA.name,
            price: inputTypeA.price,
        })

        expect(outputTypeB).toEqual({
            id: expect.any(String),
            name: inputTypeB.name,
            price: inputTypeB.price * 2,
        })
        
        await sequelize.close();
    })

    it("should throw an error when trying to insert a product with empty name", async () => {
        const productRepository = new ProductRepository();

        const createProductUseCase = new CreateProductUseCase(productRepository);

        inputTypeA.name = "";

        await expect(createProductUseCase.execute(inputTypeA)).rejects.toThrow("Name is required")
        
        await sequelize.close();
    })

    it("should throw an error when trying to insert a product with the price lower or equals 0", async () => {
        const productRepository = new ProductRepository();

        const createProductUseCase = new CreateProductUseCase(productRepository);

        inputTypeB.price = 0;

        await expect(createProductUseCase.execute(inputTypeB)).rejects.toThrow('The price is less or equals 0')

        await sequelize.close();
    })

    it("should throw an error when trying to create a product with invalid type", async() => {
        const productRepository = new ProductRepository();

        const createProductUseCase = new CreateProductUseCase(productRepository);

        inputTypeB.type = "C";

        await expect(createProductUseCase.execute(inputTypeB)).rejects.toThrow("Product type not supported!")

        await sequelize.close();
    })
})