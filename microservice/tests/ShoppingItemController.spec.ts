import { Server } from 'node:http';
import supertest from 'supertest';
import mongoose = require("mongoose");
import { ShoppingItemCategories } from '../src/middleware/enums/ShoppingItemCategories';
import { shoppingItemModel } from '../src/data-layer/models/ShoppingItemModel'

import app from '../src/App';


describe('A test', () => {
    beforeAll(async () => {
        await shoppingItemModel.create({
            name: 'Banana',
            category: ShoppingItemCategories.FRUIT,
            numberOfStock: 10,
            inStock: true,
        });
        await shoppingItemModel.create({
            name: 'Baguette',
            category: ShoppingItemCategories.BAKERY,
            numberOfStock: 0,
            inStock: false,
        });
        await shoppingItemModel.create({
            name: 'Pear',
            category: ShoppingItemCategories.FRUIT,
            numberOfStock: 0,
            inStock: false,
        });
    })
    afterAll(async () => {
        await shoppingItemModel.deleteMany();
        await mongoose.disconnect()
    })
    describe('GET /invalidRoute', () => {
        it('GET /invalidRoute', async () => {
            const request = supertest.agent(app);
            const res = await request.get('/REST/1.0/invalidRoute')
            .expect(404)
        })
    })
    describe('GET /documentation', () => {
        it('GET /documentation', async () => {
            const request = supertest.agent(app);
            const res = await request.get('/REST/1.0/documentation/')
            .expect(200)
        })
    })

    describe('GET /shoppingItems', () => {
        it('GET /shoppingItems without query params', async () => {
            const request = supertest.agent(app);
            const res = await request.get('/REST/1.0/shoppingItems')
            .expect(200)
            expect(res.body.shoppingItems.length).toBe(3);
        })
        it('GET /shoppingItems with inStock query param set to true', async () => {
            const request = supertest.agent(app);
            const res = await request.get('/REST/1.0/shoppingItems?inStock=true')
            .expect(200)
            expect(res.body.shoppingItems.length).toBe(1);
        })
        it('GET /shoppingItems with category query param set to Fruit', async () => {
            const request = supertest.agent(app);
            const res = await request.get('/REST/1.0/shoppingItems?category=Fruit')
            .expect(200)
            expect(res.body.shoppingItems.length).toBe(2);
        })
    })
    describe('GET /shoppingItems/{name}', () => {
        it('GET /shoppingItems/{name} on a valid resource', async () => {
            const request = supertest.agent(app);
            await request.get('/REST/1.0/shoppingItems/Banana')
            .expect(200)
        })
        it('GET /shoppingItems/{name} on an invalid resource', async () => {
            const request = supertest.agent(app);
            await request.get('/REST/1.0/shoppingItems/Papaya')
            .expect(404)
        })
    })
    describe('PUT /shoppingItems/{name}/category', () => {
        it('PUT /shoppingItems/{name}/category on an valid resource', async () => {
            const request = supertest.agent(app);
            const res = await request.put('/REST/1.0/shoppingItems/Banana/category').send({
                category: ShoppingItemCategories.VEGETABLE
            })
            .expect(200)
            expect(res.body).toMatchObject({
                category: ShoppingItemCategories.VEGETABLE
            })
        })
    })
    describe('PUT /shoppingItems/{name}/increaseStock', () => {
        it('PUT /shoppingItems/{name}/increaseStock on an valid resource', async () => {
            const request = supertest.agent(app);
            const res = await request.put('/REST/1.0/shoppingItems/Banana/increaseStock').send({
                value: 10
            })
            .expect(200)
            expect(res.body).toMatchObject({
                numberOfStock: 20
            })
        })
    })
    describe('PUT /shoppingItems/{name}/decreaseStock', () => {
        it('PUT /shoppingItems/{name}/decreaseStock on an valid resource', async () => {
            const request = supertest.agent(app);
            const res = await request.put('/REST/1.0/shoppingItems/Banana/decreaseStock').send({
                value: 10
            })
            .expect(200)
            expect(res.body).toMatchObject({
                numberOfStock: 10
            })
        })
    })
    describe('POST /shoppingItems', () => {
        it('POST /shoppingItems with a valid request', async () => {
            const request = supertest.agent(app);
            const res = await request.post('/REST/1.0/shoppingItems').send({
                name: "Grapes",
                category: ShoppingItemCategories.FRUIT,
                numberOfStock: 2,
            })
            .expect(201)
            await shoppingItemModel.deleteOne({name: 'Grapes'}).exec();
        })
        it('POST /shoppingItems with an invalid request', async () => {
            const request = supertest.agent(app);
            const res = await request.post('/REST/1.0/shoppingItems').send({
                category: ShoppingItemCategories.FRUIT,
                numberOfStock: 2,
            })
            .expect(400)
        })
    })
    describe('DELETE /shoppingItems/{name}', () => {
        it('DELETE /shoppingItems/{name} on an existing resource', async () => {
            const request = supertest.agent(app);
            await shoppingItemModel.create({
                name: 'Bagel',
                category: ShoppingItemCategories.BAKERY,
                numberOfStock: 0,
                inStock: false,
            });
            const res = await request.delete('/REST/1.0/shoppingItems/Bagel')
            .expect(204)
        })
        it('DELETE /shoppingItems/{name} on a resource that does not exist', async () => {
            const request = supertest.agent(app);
            const res = await request.delete('/REST/1.0/shoppingItems/Unknown')
            .expect(404)
        })
    })
    
})