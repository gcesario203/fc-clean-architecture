import ProductFactory from "../../../domain/product/factory/product.factory";
import FindAllProductsUseCase from "./find-all.product.usecase";

const productOne = ProductFactory.create("A", "Martelo de borracha", 21);
const productTwo = ProductFactory.create("B", "molinete shimano", 400);


const mockProductRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([productOne, productTwo])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("find product use case unit tests", ()=> {

    it("should find a created product", async () => {
        const productRepository = mockProductRepository();

        const output = await new FindAllProductsUseCase(productRepository).execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(productOne.id);
        expect(output.products[0].name).toBe(productOne.name);
        expect(output.products[0].price).toBe(productOne.price);

        expect(output.products[1].id).toBe(productTwo.id);
        expect(output.products[1].name).toBe(productTwo.name);
        expect(output.products[1].price).toBe(productTwo.price);
    })
} )