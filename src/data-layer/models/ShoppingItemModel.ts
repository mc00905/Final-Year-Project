import { ShoppingItemCategories } from '../enums/ShoppingItemCategories';
import * as mongoose from 'mongoose';
import { ShoppingItemDocument }  from '../types/ShoppingItem'

const shoppingItemSchema = new mongoose.Schema({
    numberOfStock: {
        required: true,
        type: Number,
    },
    inStock: {
        type: Boolean,
    },
    name: {
        required: true,
        type: String,
    },
    category: {
        required: true,
        type: String,
        enum: Object.values(ShoppingItemCategories)
    }
})

export const shoppingItemModel = mongoose.model<ShoppingItemDocument>("shoppingItem", shoppingItemSchema);