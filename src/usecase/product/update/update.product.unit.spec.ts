import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory"
import UpdateProductUseCase from "./update.product.usecase";


const product = ProductFactory.create("A", "Biscoito", 12.99) as Product;

const input = {
    id: product.id,
    name: "Bolacha",
    price: 12.99
}

const mockProductRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Update product use case unit tests", () => {
    it("should a product be updated", async () => {
        const productRepository = mockProductRepository();

        const productUpdated = new UpdateProductUseCase(productRepository);

        console.log('ccc', input.id)
        console.log('ddd', product.id)
        const output = await productUpdated.execute(input);

        expect(output).toEqual(input);
    })
})