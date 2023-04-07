import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";


const customer = new Customer("1", "Cesar");
const address = new Address("Rua dos bobos", "213545", "SP", 12);

customer.changeAddress(address);

const mockCustomerRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Find customer use case unit tests', ()=>{
    it("should find a customer", async () =>{
        const customerRepository = mockCustomerRepository();
        const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "1"
        };

        const output = {
            id: "1",
            name:"Cesar",
            address:{
                street: "Rua dos bobos",
                city: "SP",
                number: 12,
                zip: "213545"
            }
        }

        const result = await findCustomerUseCase.execute(input); 

        expect(result).toEqual(output);
    })
});