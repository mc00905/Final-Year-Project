
import { ShoppingItemCategories } from '../src/middleware/enums/ShoppingItemCategories';
import mongoose = require("mongoose");
import { createShoppingItem, deleteShoppingItem } from '../src/data-layer/data-agents/ShoppingItemAgent';
import { shoppingItemModel } from '../src/data-layer/models/ShoppingItemModel'

describe('Testing the ShoppingItemAgent', () => {
    beforeAll(async () => {
        await mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true })
    })
    afterAll(async () => {
        await shoppingItemModel.deleteMany();
        await mongoose.disconnect()
    })
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
