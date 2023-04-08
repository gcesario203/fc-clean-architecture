import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import FindAllProductsUseCase from "../../../usecase/product/find-all/find-all.product.usecase";


export const productRoute = express.Router();

productRoute.post('/', async (request: Request, response: Response) => {
    const useCase = new CreateProductUseCase(new ProductRepository());
    try {
        const productDto = {...request.body}

        const output = await useCase.execute(productDto);

        response.send(output);
    } catch (error) {
        response.status(500).send(error);
    }
})

productRoute.get('/', async (request: Request, response: Response) => {
    const useCase = new FindAllProductsUseCase(new ProductRepository());

    try {
        const output = await useCase.execute({});

        response.status(200).send(output);
    } catch (error) {
        response.status(500).send(error);
    }
})