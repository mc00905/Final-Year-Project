import Nock from 'nock'
import { ShoppingItemCategories } from '../src/util/ShoppingItemCategories';
import { MicroserviceClient } from '../src/microservice-client/MicroserviceClient'

const client = new MicroserviceClient();

describe('MicroServiceClient', () => {
    describe('getShoppingItems()', () => {
        describe('Testing valid function calls of getShoppingItems()', () => {
            it ('Should return a successful response with no query params', async () => {
                const res = await client.getShoppingItems();
            })

        })
        describe('Testing a rate limited getShoppingItems request', () => {
            it('Should return the list of shoppingItems after three retries', async () => {        
                const firstFailedRequest =Nock('http://localhost:3000/REST/1.0')
                .get('/shoppingItems')
                .times(2)
                .reply(429)
                const retriedSuccessRequest = Nock('http://localhost:3000/REST/1.0')
                .get('/shoppingItems') 
                .reply(200, [{"name":"apple","category":"Fruit","numberOfStock":110,"inStock":true}]) 
    
                const res = await client.getShoppingItems();
                expect(res.data).toStrictEqual([{"name":"apple","category":"Fruit","numberOfStock":110,"inStock":true}])
            })
        })
    })

})
