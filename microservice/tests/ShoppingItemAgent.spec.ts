
import { ShoppingItemCategories } from '../src/middleware/enums/ShoppingItemCategories';
import mongoose = require("mongoose");
import { createShoppingItem, decreaseShoppingItemStock, deleteShoppingItem, getShoppingItem, getShoppingItems, increaseShoppingItemStock, updateShoppingItemCategory } from '../src/data-layer/data-agents/ShoppingItemAgent';
import { shoppingItemModel } from '../src/data-layer/models/ShoppingItemModel'
import { createNoSubstitutionTemplateLiteral } from 'typescript';

describe('Testing the ShoppingItemAgent', () => {
    beforeAll(async () => {
        await mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true })
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
    describe('getShoppingItems()', () => {
        describe('Testing valid requests', () => {
            it('Making a default request should return a single paginated response with 3 results', async () => {
                const response = await getShoppingItems();
                expect(response).toHaveProperty("shoppingItems");
                expect(response).toHaveProperty("page");
                expect(response).toHaveProperty("totalPages");
                expect(response.shoppingItems.length).toBe(3);
            })
            it('Making a request with the query parameter Category set to Fruit should return a single paginated response with 2 results', async () => {
                const response = await getShoppingItems([
                    ['category', ShoppingItemCategories.FRUIT]
                ]);
                expect(response).toHaveProperty("shoppingItems");
                expect(response).toHaveProperty("page");
                expect(response).toHaveProperty("totalPages");
                expect(response.shoppingItems.length).toBe(2);
            })
            it('Making a request with the query parameter InStock set to true should return a single paginated response with 1 results', async () => {
                const response = await getShoppingItems([
                    ['inStock', true]
                ]);
                expect(response).toHaveProperty("shoppingItems");
                expect(response).toHaveProperty("page");
                expect(response).toHaveProperty("totalPages");
                expect(response.shoppingItems.length).toBe(1);
            })
            it('Making a request with the query parameter InStock set to false should return a single paginated response with 2 results', async () => {
                const response = await getShoppingItems([
                    ['inStock', false]
                ]);
                expect(response).toHaveProperty("shoppingItems");
                expect(response).toHaveProperty("page");
                expect(response).toHaveProperty("totalPages");
                expect(response.shoppingItems.length).toBe(2);
            })
        })
    })
    describe('getShoppingItem()', () => {
        describe('Testing valid requests', () => {
            it('Making a request for a Banana should successfully return the ShoppingItem', async () => {
                const newDoc = await getShoppingItem('Banana')
                expect(newDoc).toHaveProperty("name");
                expect(newDoc).toHaveProperty("category");
                expect(newDoc).toHaveProperty("numberOfStock");
                expect(newDoc).toHaveProperty("inStock");
                expect(newDoc).toMatchObject({
                    name: 'Banana',
                    category: ShoppingItemCategories.FRUIT,
                    numberOfStock: 10,
                    inStock: true,
                })
            })
        })
        describe('Testing invalid requests', () => {
            it('Making a request for a Papaya should throw a 404 ShoppingItemNotFound', async () => {
                try {
                    const newDoc = await getShoppingItem('Papaya')
                    throw new Error('Expected to fail');
                } catch (err) {
                    expect(err.status).toBe(404);
                    expect(err.errorIdentifier).toBe('ShoppingItemNotFound');
                }
            })
        })
    })
    describe('createShoppingItem()', () => {
        describe('Testing valid requests', () => {
            it('Should Successfully Create a Valid Shopping Item', async () => {
                await createShoppingItem('Strawberry', ShoppingItemCategories.FRUIT, 1)
                const newDoc = await shoppingItemModel.findOne({name: 'Strawberry'}).lean().exec()
                expect(newDoc).toHaveProperty("name");
                expect(newDoc).toHaveProperty("category");
                expect(newDoc).toHaveProperty("numberOfStock");
                expect(newDoc).toHaveProperty("inStock");
                expect(newDoc).toMatchObject({
                    name: 'Strawberry',
                    category: ShoppingItemCategories.FRUIT,
                    numberOfStock: 1,
                    inStock: true,
                })
            })
        })
    })
    describe('updateShoppingItemCategory()', () => {
        describe('Testing valid requests', () => {
            it('Updating the category of a Banana should return a successful response', async () => {
                const newDoc = await updateShoppingItemCategory('Banana', ShoppingItemCategories.VEGETABLE)
                expect(newDoc).toHaveProperty("name");
                expect(newDoc).toHaveProperty("category");
                expect(newDoc).toHaveProperty("numberOfStock");
                expect(newDoc).toHaveProperty("inStock");
                expect(newDoc).toMatchObject({
                    name: 'Banana',
                    category: ShoppingItemCategories.VEGETABLE,
                    numberOfStock: 10,
                    inStock: true,
                })
                await updateShoppingItemCategory('Banana', ShoppingItemCategories.FRUIT)
            })
        })
        describe('Testing invalid requests', () => {
            it('Updating the category of a Papaya should return a successful response', async () => {
                try {
                    const newDoc = await updateShoppingItemCategory('Papaya', ShoppingItemCategories.VEGETABLE)
                    throw new Error('Expected to fail');
                } catch (err) {
                    expect(err.status).toBe(404);
                    expect(err.errorIdentifier).toBe('ShoppingItemNotFound');
                }
            })
        })
    })
    describe('increaseShoppingItemStock()', () => {
        describe('Testing valid requests', () => {
            it('Increasing the stock of a Banana should return a successful response', async () => {
                const newDoc = await increaseShoppingItemStock('Banana', 10)
                expect(newDoc).toHaveProperty("name");
                expect(newDoc).toHaveProperty("category");
                expect(newDoc).toHaveProperty("numberOfStock");
                expect(newDoc).toHaveProperty("inStock");
                expect(newDoc).toMatchObject({
                    name: 'Banana',
                    category: ShoppingItemCategories.FRUIT,
                    numberOfStock: 20,
                    inStock: true,
                })
            })
        })
        describe('Testing invalid requests', () => {
            it('Increasing the number of stock of a Papaya should return a  Not Found error', async () => {
                try {
                    const newDoc = await increaseShoppingItemStock('Papaya', 10)
                    throw new Error('Expected to fail');
                } catch (err) {
                    expect(err.status).toBe(404);
                    expect(err.errorIdentifier).toBe('ShoppingItemNotFound');
                }
            })
        })
    })
    describe('decreaseShoppingItemStock()', () => {
        describe('Testing valid requests', () => {
            it('Decreasing the stock of a Banana should return a successful response', async () => {
                const newDoc = await decreaseShoppingItemStock('Banana', 10)
                expect(newDoc).toHaveProperty("name");
                expect(newDoc).toHaveProperty("category");
                expect(newDoc).toHaveProperty("numberOfStock");
                expect(newDoc).toHaveProperty("inStock");
                expect(newDoc).toMatchObject({
                    name: 'Banana',
                    category: ShoppingItemCategories.FRUIT,
                    numberOfStock: 10,
                    inStock: true,
                })
            })
            it('Decreasing the stock of a Banana below zero should round to zero', async () => {
                const newDoc = await decreaseShoppingItemStock('Banana', 1000)
                expect(newDoc).toHaveProperty("name");
                expect(newDoc).toHaveProperty("category");
                expect(newDoc).toHaveProperty("numberOfStock");
                expect(newDoc).toHaveProperty("inStock");
                expect(newDoc).toMatchObject({
                    name: 'Banana',
                    category: ShoppingItemCategories.FRUIT,
                    numberOfStock: 0,
                    inStock: false,
                })
            })
        })
        describe('Testing invalid requests', () => {
            it('Decreasing the number of stock of a Papaya should return a  Not Found error', async () => {
                try {
                    const newDoc = await decreaseShoppingItemStock('Papaya', 10)
                    throw new Error('Expected to fail');
                } catch (err) {
                    expect(err.status).toBe(404);
                    expect(err.errorIdentifier).toBe('ShoppingItemNotFound');
                }
            })
        })
    })
})
