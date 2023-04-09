import { app, sequelize } from '../express';

import request from 'supertest'

describe("E2E tests for customer", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    })

    it("should create a user", async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                name: "Ho Chi Minh",
                address: {
                    street: "Rua dos bobos",
                    city: "SP",
                    number: 12,
                    zip: "213545"
                }
            });

        expect(response.status).toBe(200);

        expect(response.body.name).toBe("Ho Chi Minh")
        expect(response.body.address.street).toBe("Rua dos bobos")
        expect(response.body.address.city).toBe("SP")
        expect(response.body.address.number).toBe(12)
        expect(response.body.address.zip).toBe("213545")
    })

    it("should throw an error sending invalid data", async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                name: "",
                address: {
                    street: "Rua dos bobos",
                    city: "SP",
                    number: 12,
                    zip: "213545"
                }
            });

        expect(response.status).toBe(500);
    })

    it("should list all customers", async () => {
        const hoChiMinResponse = await request(app)
            .post('/customer')
            .send({
                name: "Ho Chi Minh",
                address: {
                    street: "Rua dos bobos",
                    city: "SP",
                    number: 12,
                    zip: "213545"
                }
            });

        const karlMarxResponse = await request(app)
            .post('/customer')
            .send({
                name: "karl Marx",
                address: {
                    street: "Rua dos bobos",
                    city: "SP",
                    number: 21,
                    zip: "213545"
                }
            });

        const leninResponse = await request(app)
            .post('/customer')
            .send({
                name: "Vladmir ulyanov ilych",
                address: {
                    street: "Rua dos bobos",
                    city: "SP",
                    number: 13,
                    zip: "213545"
                }
            });

        expect(hoChiMinResponse.status).toBe(200)
        expect(leninResponse.status).toBe(200)
        expect(karlMarxResponse.status).toBe(200)

        const listResponse = await request(app)
            .get('/customer')
            .send();

        expect(listResponse.status).toBe(200)
        expect(listResponse.body.customers.length).toBe(3)

        expect(listResponse.body.customers[0].id).toBe(hoChiMinResponse.body.id)
        expect(listResponse.body.customers[1].id).toBe(karlMarxResponse.body.id)
        expect(listResponse.body.customers[2].id).toBe(leninResponse.body.id)

        const listResponseXml = await request(app)
            .get('/customer')
            .set("Accept", "application/xml")
            .send();


        expect(listResponseXml.status).toBe(200)

        expect(listResponseXml.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
    })
})