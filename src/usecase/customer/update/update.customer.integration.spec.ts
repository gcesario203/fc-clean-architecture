import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/db/sequelize/model/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
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

describe("Update customer use case integration tests", () => {
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
    
    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();

        const customerUpdateRepository = new UpdateCustomerUseCase(customerRepository);

        await customerRepository.create(customer);

        const output = await customerUpdateRepository.execute(input);

        expect(output).toEqual(input);

        await sequelize.close();

    })
})