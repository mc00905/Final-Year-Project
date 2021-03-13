import { ShoppingItemCategories } from '../../middleware/enums/ShoppingItemCategories';
import { PaginateModel, Document, Schema, model } from 'mongoose';
import { ShoppingItem, ShoppingItemDocument } from '../../middleware/types/ShoppingItem'
import MongoosePaginate from 'mongoose-paginate-v2'
const shoppingItemSchema = new Schema({
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
shoppingItemSchema.plugin(MongoosePaginate);

interface ShoppingItemModel<T extends Document> extends PaginateModel<T> {}
export const shoppingItemModel: ShoppingItemModel<ShoppingItemDocument> = model<ShoppingItemDocument>('shoppingItem', shoppingItemSchema) as ShoppingItemModel<ShoppingItemDocument>;
