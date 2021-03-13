import { Document, LeanDocument } from 'mongoose'
import { ShoppingItemCategories } from '../enums/ShoppingItemCategories';


/**
 * ShoppingItem objects store the information relating to a product within the store.
 * It stores all of the identifying and meta information about the product.
 */
export interface ShoppingItem {
    /**
     * The identifying name of the ShoppingItem
     */
    name: string;
    category: ShoppingItemCategories;
    numberOfStock: number;
    inStock: boolean;
}

export interface PaginatedShoppingItemArr {
    shoppingItems: ShoppingItem[],
    page: number,
    totalPages: number,
}

export interface ShoppingItemDocument extends Document, ShoppingItem { }
export interface LeanShoppingItem extends LeanDocument<ShoppingItemDocument> { }