import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";


const customer = CustomerFactory.createWithAddress("Vladimir Ilyich Ulianov", new Address("Ulitsa Ilyinka", "1215456", "Moscow", 23));

const input = {
    id: customer.id,
    name: "Ioseb Besarionis dze Jughashvili",
    address: {
        street: "Kakha Kaladze",
        city: "Tiblissi",
        number: 42,
        zip: "45451",
    }
}

const mockCustomerRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Update customer use case unit tests", () => {
    it("should update a customer", async () => {
        const customerRepository = mockCustomerRepository();

        const customerUpdateRepository = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateRepository.execute(input);

        expect(output).toEqual(input);

    })
})