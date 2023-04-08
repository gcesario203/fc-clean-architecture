import { app, sequelize } from '../express';

import request from 'supertest'

describe("E2E tests for product", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    })

    it("should create a product", async () => {

        const createdTypeAProductResponse = await request(app)
                                                    .post('/product')
                                                    .send({
                                                        name: "Produto generico da shein",
                                                        price: 5,
                                                        type: "A"
                                                    })

        const createdTypeBProductResponse = await request(app)
                                                    .post('/product')
                                                    .send({
                                                        name: "Produto generico da havan",
                                                        price: 5,
                                                        type: "B"
                                                    })

        expect(createdTypeAProductResponse.status).toBe(200);

        expect(createdTypeAProductResponse.body.name).toBe("Produto generico da shein");
        expect(createdTypeAProductResponse.body.price).toBe(5)

        expect(createdTypeBProductResponse.status).toBe(200);

        expect(createdTypeBProductResponse.body.name).toBe("Produto generico da havan");
        expect(createdTypeBProductResponse.body.price).toBe(5 * 2)
    })

    it('should thrown an error sending invalid data', async () => {
        const producWithoutTypeResponse = await request(app)
                                                    .post('/product')
                                                    .send({
                                                        name: "Produto generico da havan",
                                                        price: 5
                                                    })

        const productWithoutPriceResponse = await request(app)
                                                    .post('/product')
                                                    .send({
                                                        name: "Produto generico da shein",
                                                        price: 0,
                                                        type: "A"
                                                    })

        const productWithoutNameResponse = await request(app)
                                                    .post('/product')
                                                    .send({
                                                        name: "",
                                                        price: 0,
                                                        type: "A"
                                                    })

        expect(producWithoutTypeResponse.status).toBe(500)
        expect(productWithoutPriceResponse.status).toBe(500)
        expect(productWithoutNameResponse.status).toBe(500)
    })

    it("should list all created products", async () => {
        const createdTypeAProductResponse = await request(app)
                                                    .post('/product')
                                                    .send({
                                                        name: "Produto generico da shein",
                                                        price: 5,
                                                        type: "A"
                                                    })

        const createdTypeBProductResponse = await request(app)
                                                    .post('/product')
                                                    .send({
                                                        name: "Produto generico da havan",
                                                        price: 5,
                                                        type: "B"
                                                    })

        expect(createdTypeAProductResponse.status).toBe(200)
        expect(createdTypeBProductResponse.status).toBe(200)

        const listAllProductsResponse = await request(app)
                                                .get('/product')
                                                .send();
                                                
        expect(listAllProductsResponse.status).toBe(200)

        expect(listAllProductsResponse.body.products.length).toBe(2)

        expect(listAllProductsResponse.body.products[0].id).toBe(createdTypeAProductResponse.body.id)
        expect(listAllProductsResponse.body.products[1].id).toBe(createdTypeBProductResponse.body.id)
    })
})