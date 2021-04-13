import * as Nock from 'nock'
import { DefaultApi, ShoppingItemCategories } from '../index'

const client = new DefaultApi();

describe('MicroServiceClient', () => {
    describe('getShoppingItems()', () => {
        describe('Testing valid function calls of getShoppingItems()', () => {
            it ('Should return a successful response with no query params', async () => {
                const request = Nock('http://localhost:3000/REST/1.0')
                .get('/shoppingItems') 
                .reply(200, {page: 1, totalPages: 1, shoppingItems: [{"name":"apple","category":"Fruit","numberOfStock":110,"inStock":true}]});
                const res = await client.getShoppingItems();
                expect(res.data).toStrictEqual({page: 1, totalPages: 1, shoppingItems: [{"name":"apple","category":"Fruit","numberOfStock":110,"inStock":true}]});
            })
            it ('Should return a successful response with the inStock query parameter set to true', async () => {
                const request = Nock('http://localhost:3000/REST/1.0')
                .get('/shoppingItems')
                .query({ inStock: true })
                .reply(200, {page: 1, totalPages: 1, shoppingItems: [{"name":"apple","category":"Fruit","numberOfStock":110,"inStock":true}]});
                const res = await client.getShoppingItems(true, undefined, undefined, undefined);
                expect(res.data).toStrictEqual({page: 1, totalPages: 1, shoppingItems: [{"name":"apple","category":"Fruit","numberOfStock":110,"inStock":true}]});
            })

        })
        describe('Testing a rate limited getShoppingItems request', () => {
            it('Should return the list of shoppingItems after succeeding on the 4th attempt', async () => {        
                const failThrice = Nock('http://localhost:3000/REST/1.0')
                .get('/shoppingItems')
                .times(3)
                .reply(429)
                const retriedSuccessRequest = Nock('http://localhost:3000/REST/1.0')
                .get('/shoppingItems') 
                .reply(200, {page: 1, totalPages: 1, shoppingItems: [{"name":"apple","category":"Fruit","numberOfStock":110,"inStock":true}]});
    
                const res = await client.getShoppingItems();
                expect(res.data).toStrictEqual({page: 1, totalPages: 1, shoppingItems: [{"name":"apple","category":"Fruit","numberOfStock":110,"inStock":true}]})
            })
            it('Should throw a 429 when the final retry fails', async () => {        
                const failFourTimes = Nock('http://localhost:3000/REST/1.0')
                .get('/shoppingItems')
                .times(4)
                .reply(429);
                try {
                    const res = await client.getShoppingItems();
                    throw new Error('Expected to fail');
                } catch (err) {
                    expect(err.status === 429)
                }
            })
        })
    })

    describe('getShoppingItem()', () => {
        describe('Testing valid function calls of getShoppingItem()', () => {
            it ('Searching for a resource that exists should result in a sucessful ShoppingItem response', async () => {
                const request = Nock('http://localhost:3000/REST/1.0')
                .get('/shoppingItems/apple')
                .reply(200, {"name":"apple","category":"Fruit","numberOfStock":110,"inStock":true});
                const res = await client.getShoppingItem('apple');
                expect(res.status).toBe(200);
                expect(res.data).toStrictEqual({"name":"apple","category":"Fruit","numberOfStock":110,"inStock":true})
            })
        })

        describe('Testing invalid function calls of getShoppingItem()', () => {
            it ('Searching for a resource that doesn\'t exist should throw a 404 error', async () => {
                try {
                    const failedRequest = Nock('http://localhost:3000/REST/1.0')
                    .get('/shoppingItems/mango')
                    .reply(404, {
                        "errorIdentifier": "ShoppingItemNotFound",
                        "message": "Shopping Item not found with params: {\"name\":\"mango\"}"
                    });
                    const res = await client.getShoppingItem('mango');
                    throw new Error('Expected to fail')
                } catch (err) {
                    expect(err.errorIdentifier).toBe('ShoppingItemNotFound')

                }
            })
        })
    })

    describe('createShoppingItem()', () => {
        describe('Testing valid function calls of createShoppingItems()', () => {
            it ('Sending a valid request body should result in a successful response', async () => {
                const request = Nock('http://localhost:3000/REST/1.0')
                .post('/shoppingItems', {
                    name: 'pear',
                    category: ShoppingItemCategories.Fruit,
                    numberOfStock: 1,
                })
                .reply(201);
                const res = await client.createShoppingItem({ name: 'pear', numberOfStock: 1, category: ShoppingItemCategories.Fruit });
                expect(res.status).toBe(201);
            })
        })
        describe('Testing invalid function calls of createShoppingItems()', () => {
            it ('Sending an invalid request body with a missing field should result in an error being thrown', async () => {
                try {
                    const res = await client.createShoppingItem(null);
                    throw new Error('Expected to fail');
                } catch (err) {
                    expect(err).toMatchObject({message: "Required parameter pickShoppingItemCategoryOrNameOrNumberOfStock was null or undefined when calling createShoppingItem."});
                }
            })
        })
    })

    describe('deleteShoppingItems()', () => {
        describe('Testing valid function calls of deleteShoppingItem()', () => {
            it('Deleting an existing resource should succeed', async () => {
                const request = Nock('http://localhost:3000/REST/1.0')
                .delete('/shoppingItems/pear')
                .reply(204);
                const res = await client.deleteShoppingItem('pear');
                expect(res.status).toBe(204);
            })
        })

        describe('Testing invalid function calls of deleteShoppingItem()', () => {
            it ('Deleting a resource that doesn\'t exist should throw a 404 error', async () => {
                try {
                    const failedRequest = Nock('http://localhost:3000/REST/1.0')
                    .delete('/shoppingItems/mango')
                    .reply(404, {
                        "errorIdentifier": "ShoppingItemNotFound",
                        "message": "Shopping Item not found with params: {\"name\":\"mango\"}"
                    });
                    const res = await client.deleteShoppingItem('mango');
                    throw new Error('Expected to fail')
                } catch (err) {
                    expect(err.errorIdentifier).toBe('ShoppingItemNotFound')

                }
            })
        })
    })

    describe('increaseShoppingItemStock()', () => {
        describe('Testing valid function calls of increaseShoppingItemStock()', () => {
            it ('Sending a valid request body should result in a successful response', async () => {
                const request = Nock('http://localhost:3000/REST/1.0')
                .put('/shoppingItems/pear/increaseStock', {
                    value: 10
                })
                .reply(200, {
                    name: 'pear',
                    category: ShoppingItemCategories.Fruit,
                    numberOfStock: 11,
                    inStock: true,
                });
                const res = await client.increaseShoppingItemStock('pear', { value: 10 });
                expect(res.status).toBe(200);
                expect(res.data).toStrictEqual({"name":"pear","category":"Fruit","numberOfStock":11,"inStock":true})

            })
        })
    })

    describe('descreaseShoppingItemStock()', () => {
        describe('Testing valid function calls of decreaseShoppingItemStock()', () => {
            it ('Sending a valid request body should result in a successful response', async () => {
                const request = Nock('http://localhost:3000/REST/1.0')
                .put('/shoppingItems/pear/decreaseStock', {
                    value: 10
                })
                .reply(200, {
                    name: 'pear',
                    category: ShoppingItemCategories.Fruit,
                    numberOfStock: 11,
                    inStock: true,
                });
                const res = await client.decreaseShoppingItemStock('pear', {value: 10});
                expect(res.status).toBe(200);
                expect(res.data).toStrictEqual({"name":"pear","category":"Fruit","numberOfStock":11,"inStock":true})

            })
        })
    })
})
