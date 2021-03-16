
import { ShoppingItemCategories } from '../src/middleware/enums/ShoppingItemCategories';
import mongoose = require("mongoose");
import { createShoppingItem, deleteShoppingItem } from '../src/data-layer/data-agents/ShoppingItemAgent';

describe('Testing the ShoppingItemAgent', () => {
    beforeAll(async () => {
        await mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true })
    })
    afterAll(async () => await mongoose.disconnect())
    it('Should Successfully Create a Valid Shopping Item', async () => {
        await createShoppingItem('name', ShoppingItemCategories.FRUIT, 1)
    })
    it('Should Successfully Delete the Valid Shopping Item', async () => {
        await deleteShoppingItem('name');
    })
})
