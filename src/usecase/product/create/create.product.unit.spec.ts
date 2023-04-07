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

const mockProductRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Create product use case unit tests", () => {

    it("should create a product", async () => {
        const productRepository = mockProductRepository();

        const createProductUseCase = new CreateProductUseCase(productRepository);

        const outputTypeA = await createProductUseCase.execute(inputTypeA);
        const outputTypeB =await  createProductUseCase.execute(inputTypeB);

        expect(outputTypeA).toEqual({
            id: expect.any(String),
            name: inputTypeA.name,
            price: inputTypeA.price,
            type: inputTypeA.type
        })

        expect(outputTypeB).toEqual({
            id: expect.any(String),
            name: inputTypeB.name,
            price: inputTypeB.price * 2,
            type: inputTypeB.type
        })
    })

    it("should throw an error when trying to insert a product with empty name", async () => {
        const productRepository = mockProductRepository();

        const createProductUseCase = new CreateProductUseCase(productRepository);

        inputTypeA.name = "";

        await expect(createProductUseCase.execute(inputTypeA)).rejects.toThrow("Name is required")
    })

    it("should throw an error when trying to insert a product with the price lower or equals 0", async () => {
        const productRepository = mockProductRepository();

        const createProductUseCase = new CreateProductUseCase(productRepository);

        inputTypeB.price = 0;

        await expect(createProductUseCase.execute(inputTypeB)).rejects.toThrow('The price is less or equals 0')
    })
})