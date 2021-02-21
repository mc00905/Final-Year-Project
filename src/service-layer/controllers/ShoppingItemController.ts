import { Body, Delete, Get, Path, Post, Put, Query, Route, SuccessResponse, Example, TsoaResponse, Res, Response } from 'tsoa';
import { ShoppingItem } from '../../data-layer/types/ShoppingItem'
import { createShoppingItem, updateShoppingItemCategory, deleteShoppingItem, getShoppingItem, getShoppingItems, increaseShoppingItemStock, decreaseShoppingItemStock } from '../../data-layer/data-agents/ShoppingItemAgent';
import { ShoppingItemCategories } from '../../data-layer/enums/ShoppingItemCategories';
import { ErrorWrapper, } from '../../middleware/ErrorWrapper';
import { ShoppingItemNotFoundError, ErrorLibrary } from '../../data-layer/types/ErrorLibrary';

@Route("/REST/1.0/shoppingItems")
export class ShoppingItemController {
    /**
     * Create a new ShoppingItem
     */
    @SuccessResponse("201", "Created")
    @Post("")
    public async createShoppingItem (@Body() body: Pick<ShoppingItem, 'category' | 'name' | 'numberOfStock'>): Promise<void> {
        await createShoppingItem(body.name, body.category, body.numberOfStock);
    }
    @Put("/{name}/category")
    public async updateShoppingItem (@Path() name: string, @Body() body: Pick<ShoppingItem, 'category'>): Promise<ShoppingItem> {
        return await updateShoppingItemCategory(name, body.category);
    }

    @Put("/{name}/increaseStock")
    public async increaseShoppingItemStock (@Path() name: string, @Body() body: { value: number }): Promise<ShoppingItem> {
        return await increaseShoppingItemStock(name, body.value);
    }

    @Put("/{name}/decreaseStock")
    public async decreaseShoppingItemStock (@Path() name: string, @Body() body: { value: number }): Promise<ShoppingItem> {
        return await decreaseShoppingItemStock(name, body.value);
    }
    @Get("")
    public async getShoppingItems (@Query() inStock?: boolean, @Query() category?: ShoppingItemCategories, ): Promise<ShoppingItem[]> {
        if (inStock !== null && inStock !== undefined) return await getShoppingItems({ inStock });
        if (category) return await getShoppingItems({ category });
        return await getShoppingItems();
    }
    /**
     * Gets the ShoppingItem with the supplied name
     * @param name The unique name of the ShoppingItem
     * 
     * @example name "apple"
     */
    @Example<ShoppingItem>({
        name: "apple",
        category: ShoppingItemCategories.BAKERY,
        inStock: true,
        numberOfStock: 14,
    })
    @Get("/{name}")
    public async getShoppingItem (
        @Path() name: string,
        @Res() shoppingItemNotFoundRes: TsoaResponse<404, {
            errorIdentifier: ErrorLibrary.ShoppingItemNotFound,
            message: string,
        }>
    ): Promise<ShoppingItem> {
        try {
            return await getShoppingItem(name);
        } catch (err) {
            if (err instanceof ShoppingItemNotFoundError) {
              return shoppingItemNotFoundRes(404, { errorIdentifier: ErrorLibrary.ShoppingItemNotFound, message: err.message, });
            } else {
                throw err;
            }
        }
    }

    @SuccessResponse("204", "Deleted")
    @Delete("/{name}")
    public async deleteShoppingItem (@Path() name: string): Promise<void> {
        await deleteShoppingItem(name);
    }
}
