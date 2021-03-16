import { Server } from 'node:http';
import supertest from 'supertest';
import app from '../src/App';

const request = supertest(app);

describe('A test', () => {

    it('A test', async () => {
        return request.get('/REST/1.0/shoppingItems')
        .expect(200)
    })
})