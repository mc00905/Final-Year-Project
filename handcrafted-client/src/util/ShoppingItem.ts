import { ShoppingItemCategories } from './ShoppingItemCategories';


/**
 * ShoppingItem objects store the information relating to a product within the store.
 * It stores all of the identifying and meta information about the product.
 */
export interface ShoppingItem {
    /**
     * The identifying name of the ShoppingItem
     */
    name: string;
    /**
     * The category of the ShoppingItem
     */
    category: ShoppingItemCategories;
    /**
     * The number of the ShoppingItem in stock
     */
    numberOfStock: number;
    /**
     * Boolean representing whether stock is greater than 0
     */
    inStock: boolean;
}

export interface PaginatedShoppingItemArr {
    /**
     * List of ShoppingItems
     */
    shoppingItems: ShoppingItem[],
    /**
     * Current Page
     */
    page: number,
    /**
     * Total number of Pages available
     */
    totalPages: number,
}