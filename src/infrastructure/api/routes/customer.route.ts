import express, { Request, Response } from "express";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import FindAllCustomersUseCase from "../../../usecase/customer/find-all/find-all.customer.usecase";


export const customerRoute = express.Router();


customerRoute.post('/', async (request: Request, response: Response) => {
    const useCase = new CreateCustomerUseCase(new CustomerRepository());

    try {
        const customerDto = {...request.body};

        const output = await useCase.execute(customerDto);

        response.status(200).send(output);
    } catch (error) {
        response.status(500).send(error);
    }
});

customerRoute.get('/', async (request: Request, response: Response) => {
    const useCase = new FindAllCustomersUseCase(new CustomerRepository());

    try {
        const output = await useCase.execute({});

        response.status(200).send(output);
    } catch (error) {
        response.status(500).send(error);
    }
})