import { Server } from 'node:http';
import supertest from 'supertest';
import mongoose = require("mongoose");

import app from '../src/App';


describe('A test', () => {
    afterAll(async () => {
        await mongoose.disconnect()
    })
    it('GET /shoppingItems', async () => {
        const request = supertest.agent(app);
        await request.get('/REST/1.0/shoppingItems')
        .expect(200)
    })
})