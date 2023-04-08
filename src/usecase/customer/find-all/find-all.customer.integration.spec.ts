import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/db/sequelize/model/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindAllCustomersUseCase from "./find-all.customer.usecase";

const customerOne = CustomerFactory.createWithAddress("Carlos Marcio", new Address("Rua Augusta", "321548", "SP", 12));

const customerTwo = CustomerFactory.createWithAddress("Frederico dos Anjos", new Address("Rua Augusta", "321548", "SP", 12));

describe("Find All customer use case integration tests", () => {

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

    afterAll(async () => await sequelize.close());

    it("should return all created customers", async () => {
        const customerRepository = new CustomerRepository();

        const findAllUseCase = new FindAllCustomersUseCase(customerRepository);

        await customerRepository.create(customerOne);
        await customerRepository.create(customerTwo);
        
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