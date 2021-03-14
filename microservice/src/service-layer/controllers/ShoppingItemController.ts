import { Body, Delete, Get, Path, Post, Put, Query, Route, SuccessResponse, Example, TsoaResponse, Res, Response } from 'tsoa';
import { PaginatedShoppingItemArr, ShoppingItem } from '../../middleware/types/ShoppingItem'
import { createShoppingItem, updateShoppingItemCategory, deleteShoppingItem, getShoppingItem, getShoppingItems, increaseShoppingItemStock, decreaseShoppingItemStock } from '../../data-layer/data-agents/ShoppingItemAgent';
import { ShoppingItemCategories } from '../../middleware/enums/ShoppingItemCategories';
import { ErrorWrapper, } from '../../middleware/ErrorWrapper';
import { ShoppingItemNotFoundError, ErrorLibrary } from '../../middleware/types/ErrorLibrary';
import { genericErrorResponseBody, tsoaValidationErrorResponseBody } from '../../middleware/ErrorHandler';

@Route("/REST/1.0/shoppingItems")
export class ShoppingItemController {
    /**
     * Create a new ShoppingItem
     * 
     * @example body { "name": "apple", "category": "Fruit", "numberOfStock": "10" }
     */
    @Response<tsoaValidationErrorResponseBody>(400, 'Validation Error')
    @SuccessResponse("201", "Created")
    @Post("")
    public async createShoppingItem(@Body() body: Pick<ShoppingItem, 'category' | 'name' | 'numberOfStock'>): Promise<void> {
        await createShoppingItem(body.name, body.category, body.numberOfStock);
    }
    @Response<tsoaValidationErrorResponseBody>(400, 'Validation Error')
    @Put("/{name}/category")
    public async updateShoppingItemCategory(@Path() name: string, @Body() body: Pick<ShoppingItem, 'category'>): Promise<ShoppingItem> {
        return await updateShoppingItemCategory(name, body.category);
    }
    @Response<tsoaValidationErrorResponseBody>(400, 'Validation Error')
    @Put("/{name}/increaseStock")
    public async increaseShoppingItemStock(@Path() name: string, @Body() body: { value: number }): Promise<ShoppingItem> {
        return await increaseShoppingItemStock(name, body.value);
    }
    @Response<tsoaValidationErrorResponseBody>(400, 'Validation Error')
    @Put("/{name}/decreaseStock")
    public async decreaseShoppingItemStock(@Path() name: string, @Body() body: { value: number }): Promise<ShoppingItem> {
        return await decreaseShoppingItemStock(name, body.value);
    }
    @Response<tsoaValidationErrorResponseBody>(400, 'Validation Error')
    @Get("")
    @Example<ShoppingItem[]>([{
        name: "apple",
        category: ShoppingItemCategories.FRUIT,
        inStock: true,
        numberOfStock: 14,
    },{
        name: "cabbage",
        category: ShoppingItemCategories.VEGETABLE,
        inStock: false,
        numberOfStock: 0,
    }])
    public async getShoppingItems(@Query() inStock?: boolean, @Query() category?: ShoppingItemCategories, @Query() page?: number, @Query() pageSize?: number): Promise<PaginatedShoppingItemArr> {
        if (inStock !== null && inStock !== undefined && category) return await getShoppingItems({ inStock, category }, page, pageSize);
        if (inStock !== null && inStock !== undefined) return await getShoppingItems({ inStock }, page, pageSize);
        if (category) return await getShoppingItems({ category }, page, pageSize);
        return await getShoppingItems(undefined, page, pageSize);
    }


    
    /**
     * Gets the ShoppingItem with the supplied name
     * @param name The unique name of the ShoppingItem
     * 
     * @example name "apple"
     */
    @Response<tsoaValidationErrorResponseBody>(400, 'Validation Error')
    @Example<ShoppingItem>({
        name: "apple",
        category: ShoppingItemCategories.FRUIT,
        inStock: true,
        numberOfStock: 14,
    })
    @Get("/{name}")
    public async getShoppingItem(
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

    @Response<tsoaValidationErrorResponseBody>(400, 'Validation Error')
    @SuccessResponse("204", "Deleted")
    @Delete("/{name}")
    public async deleteShoppingItem(@Path() name: string): Promise<void> {
        await deleteShoppingItem(name);
    }
}
