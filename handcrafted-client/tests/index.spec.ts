import Nock from 'nock'
import { MicroserviceClient } from '../src/microservice-client/MicroserviceClient'

const client = new MicroserviceClient();

describe('Testing my client', () => {
    describe('Testing a rate limittied getShoppingItems request', () => {
        it('Should return the list of shoppingItems after three retries', async () => {        
            const firstFailedRequest =Nock('http://localhost:3000/REST/1.0')
            .get('/shoppingItems') 
            .reply(429)
            const secondFailedRequest =Nock('http://localhost:3000/REST/1.0')
            .get('/shoppingItems') 
            .reply(429)
            const retriedSuccessRequest = Nock('http://localhost:3000/REST/1.0')
            .get('/shoppingItems') 
            .reply(200, [{"name":"apple","category":"Fruit","numberOfStock":110,"inStock":true}]) 

            const res = await client.getShoppingItems();
            expect(res).toStrictEqual([{"name":"apple","category":"Fruit","numberOfStock":110,"inStock":true}])
        })
    })
})
