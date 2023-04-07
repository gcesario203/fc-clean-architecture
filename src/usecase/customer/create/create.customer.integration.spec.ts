import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infrastructure/customer/db/sequelize/model/customer.model"
import CreateCustomerUseCase from "./create.customer.usecase"
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";


describe("Create customer use case integration tests", () => {
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

    afterEach(async () => {
        await sequelize.close();
    })
    
    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();

        const input = {
            name: "Cesar",
            address: {
                street: "Rua dos bobos",
                city: "SP",
                number: 12,
                zip: "213545"
            }
        }

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
})