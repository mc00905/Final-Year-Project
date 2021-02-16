import { Document, LeanDocument, } from 'mongoose'
import { ShoppingItemCategories } from '../enums/ShoppingItemCategories';

export interface ShoppingItem {
    name: string;
    category: ShoppingItemCategories;
    numberOfStock: number;
    inStock: boolean;
}

export interface ShoppingItemDocument extends Document, ShoppingItem {}
export interface LeanShoppingItem extends LeanDocument<ShoppingItemDocument> {}