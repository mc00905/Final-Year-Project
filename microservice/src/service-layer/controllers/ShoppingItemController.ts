import { Body, Delete, Get, Path, Post, Put, Query, Route, SuccessResponse, Example, TsoaResponse, Res, Response, Controller } from 'tsoa';
import { PaginatedShoppingItemArr, ShoppingItem } from '../../middleware/types/ShoppingItem'
import { createShoppingItem, updateShoppingItemCategory, deleteShoppingItem, getShoppingItem, getShoppingItems, increaseShoppingItemStock, decreaseShoppingItemStock } from '../../data-layer/data-agents/ShoppingItemAgent';
import { ShoppingItemCategories } from '../../middleware/enums/ShoppingItemCategories';
import { ShoppingItemNotFoundError, ErrorLibrary } from '../../middleware/types/ErrorLibrary';
import { tsoaValidationErrorResponseBody } from '../../middleware/ErrorHandler';

@Route("/REST/1.0/shoppingItems")
export class ShoppingItemController extends Controller {
    /**
     * Create a new ShoppingItem
     * 
     * @example body { "name": "Banana", "category": "Fruit", "numberOfStock": "10" }
     */
    @Response<tsoaValidationErrorResponseBody>(400, 'Validation Error')
    @SuccessResponse("201", "Created")
    @Post("")
    public async createShoppingItem(@Body() body: Pick<ShoppingItem, 'category' | 'name' | 'numberOfStock'>): Promise<void> {
        this.setStatus(201);
        await createShoppingItem(body.name, body.category, body.numberOfStock);
    }
    /**
     * Update the Category of the ShoppingItem
     * 
     * @example body  { "category": "Fruit" }
     */
    @Response<tsoaValidationErrorResponseBody>(400, 'Validation Error')
    @Put("/{name}/category")
    public async updateShoppingItemCategory(@Path() name: string, @Body() body: Pick<ShoppingItem, 'category'>): Promise<ShoppingItem> {
        return await updateShoppingItemCategory(name, body.category);
    }
    /**
     * Increase the number of the ShoppingItem in stock by the value provided
     * 
     * @example body  { "value": 10 }
     */
    @Response<tsoaValidationErrorResponseBody>(400, 'Validation Error')
    @Put("/{name}/increaseStock")
    public async increaseShoppingItemStock(@Path() name: string, @Body() body: { value: number }): Promise<ShoppingItem> {
        return await increaseShoppingItemStock(name, body.value);
    }
    /**
     * Decrease the number of the ShoppingItem in stock by the value provided
     * 
     * @example body  { "value": 10 }
     */
    @Response<tsoaValidationErrorResponseBody>(400, 'Validation Error')
    @Put("/{name}/decreaseStock")
    public async decreaseShoppingItemStock(@Path() name: string, @Body() body: { value: number }): Promise<ShoppingItem> {
        return await decreaseShoppingItemStock(name, body.value);
    }
    /**
     * Get array of ShoppingItems
     * 
     * @param inStock Filter results based on whether stocck value is greater than 0 or not
     * @param category The Category to filter results by
     * @param page  Page of results to return
     * @param pageSize  Size of page to return
     */
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
        const query = [];
        if (category) query.push(['category', category]);
        if (inStock !== null && inStock !== undefined) query.push(['inStock', inStock]);
        return await getShoppingItems(query, page, pageSize);
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
    /**
     * Delete the targeted ShoppingItem resource
     * 
     * @param name The name of the resource
     */
    @Response<tsoaValidationErrorResponseBody>(400, 'Validation Error')
    @SuccessResponse("204", "Deleted")
    @Delete("/{name}")
    public async deleteShoppingItem(@Path() name: string): Promise<void> {
        await deleteShoppingItem(name);
    }
}
