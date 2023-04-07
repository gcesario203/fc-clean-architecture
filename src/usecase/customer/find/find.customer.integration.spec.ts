import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/db/sequelize/model/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe('Find customer use case integration tests', ()=>{
    
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel]);

        await sequelize.sync();
    })

    // afterEach(async () => {
    //     await sequelize.close();
    // })

    it("should find a customer", async () =>{

        const customer = new Customer("1", "Cesar");
        const address = new Address("Rua dos bobos", "213545", "SP", 12);

        customer.changeAddress(address);

        const customerRepository = new CustomerRepository();

        const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

        await customerRepository.create(customer);

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

        await sequelize.close();
    })

    it("should not find a customer", async () =>{
        const customerRepository = new CustomerRepository();

        const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "1"
        };

        const teste = async () =>{
            await findCustomerUseCase.execute(input);

            await sequelize.close();
        }

        expect(teste).rejects.toThrow("Customer not found");
    })

});