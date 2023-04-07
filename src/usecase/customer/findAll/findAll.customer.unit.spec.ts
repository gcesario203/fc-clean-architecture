import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import FindAllCustomersUseCase from "./findAll.customer.usecase";

const customerOne = CustomerFactory.createWithAddress("Carlos Marcio", new Address("Rua Augusta", "321548", "SP", 12));

const customerTwo = CustomerFactory.createWithAddress("Frederico dos Anjos", new Address("Rua Augusta", "321548", "SP", 12));

const mockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customerOne, customerTwo])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Find All customer use case unit tests", () => {

    it("should return all created customers", async () => {
        const customerRepository = mockRepository();

        const findAllUseCase = new FindAllCustomersUseCase(customerRepository);

        const output = await findAllUseCase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customerOne.id);
        expect(output.customers[0].name).toBe(customerOne.name);
        expect(output.customers[0].address.street).toBe(customerOne.Address.street);

        expect(output.customers[1].id).toBe(customerTwo.id);
        expect(output.customers[1].name).toBe(customerTwo.name);
        expect(output.customers[1].address.street).toBe(customerTwo.Address.street);
    });
})