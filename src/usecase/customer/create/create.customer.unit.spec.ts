import CreateCustomerUseCase from "./create.customer.usecase"


const input = {
    name: "Cesar",
    address: {
        street: "Rua dos bobos",
        city: "SP",
        number: 12,
        zip: "213545"
    }
}

const mockCustomerRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Create customer use case unit tests", () => {
    it("should create a customer", async () => {
        const customerRepository = mockCustomerRepository();

        const output = await new CreateCustomerUseCase(customerRepository).execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                city: input.address.city,
                number: input.address.number,
                zip: input.address.zip
            }
        });
    })

    it("should throw a error when name is missing", async () => {
        const customerRepository = mockCustomerRepository();

        input.name = "";

        await expect(new CreateCustomerUseCase(customerRepository).execute(input))
                   .rejects
                   .toThrow("Name is required")
    })

    it("should throw a error when street is missing", async () => {
        const customerRepository = mockCustomerRepository();

        input.address.street = "";

        await expect(new CreateCustomerUseCase(customerRepository).execute(input))
                   .rejects
                   .toThrow("Street is required")
    }) 
})