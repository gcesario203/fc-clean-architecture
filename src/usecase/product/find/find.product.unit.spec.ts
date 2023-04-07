import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const input = {
    id: "1"
}

const output = {
    id: "1",
    name: "Camiseta do Palmeiras tamanho GG",
    price: 399.40
}

const createdProduct = new Product("1", "Camiseta do Palmeiras tamanho GG", 399.40);

const mockProductRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(createdProduct)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("find product use case unit tests", ()=> {

    it("should find a created product", async () => {
        const productRepository = mockProductRepository();

        const result = await new FindProductUseCase(productRepository).execute(input);

        expect(result).toEqual(output);
    })

    it("should not find a product", async () => {
        const productRepository = mockProductRepository();

        productRepository.find.mockImplementation(() =>{
            throw new Error("Product not found")
        });

        const findProductUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: "1"
        };

        expect(async () =>{
            return await findProductUseCase.execute(input);
        }).rejects.toThrow("Product not found");
    })
} )