import { ShoppingItem, LeanShoppingItem, ShoppingItemDocument, PaginatedShoppingItemArr } from '../../middleware/types/ShoppingItem';
import { shoppingItemModel } from '../models/ShoppingItemModel';
import { ShoppingItemCategories } from '../../middleware/enums/ShoppingItemCategories';
import { ShoppingItemNotFoundError, GenericInternalServerError } from '../../middleware/types/ErrorLibrary';

export const createShoppingItem = async (name: string, category: ShoppingItemCategories, numberOfStock: number): Promise<void> => {
    const filter = { name };
    const inStock = numberOfStock > 0;
    const update = { name, category, numberOfStock, inStock };
    await shoppingItemModel.findOneAndUpdate(filter, update, { upsert: true, useFindAndModify: false, new: true }).lean().exec();
}

export const updateShoppingItemCategory = async (name: string, category: ShoppingItemCategories): Promise<ShoppingItem> => {
    const update = { name, category };
    const filter = { name };
    return await shoppingItemModel.findOneAndUpdate(filter, update, { useFindAndModify: false, new: true }).select('-_id -v').lean().exec().then(document => {
        if (!document) throw new ShoppingItemNotFoundError(filter);
        return document;
    });
}

export const increaseShoppingItemStock = async (name: string, value: number): Promise<ShoppingItem> => {
    const filter = { name };
    return await shoppingItemModel.findOneAndUpdate(filter, { $inc: { numberOfStock: value }, inStock: true }, { useFindAndModify: false, new: true }).select('-_id -v').lean().exec().then(document => {
        if (!document) throw new ShoppingItemNotFoundError(filter);
        return document;
    });
}

export const decreaseShoppingItemStock = async (name: string, value: number): Promise<ShoppingItem> => {
    const filter = { name };
    const query = await shoppingItemModel.findOne(filter).lean().exec();
    if (!query) throw new ShoppingItemNotFoundError(filter);
    const numberOfStockOld = query.numberOfStock;
    const newStockValue = numberOfStockOld - value;
    const numberOfStock = newStockValue > 0 ? newStockValue : 0;
    const inStock = numberOfStock > 0;
    const update = { numberOfStock, inStock };
    return await shoppingItemModel.findOneAndUpdate(filter, update, { useFindAndModify: false, new: true }).select('-_id -v').lean().exec().then(document => {
        if (!document) throw new ShoppingItemNotFoundError(filter);
        return document;
    });

}

export const getShoppingItem = async (name: string): Promise<ShoppingItem> => {
    const filter = { name };
    return await shoppingItemModel.findOne(filter).select('-_id -v -__v').lean().exec().then(document => {
        if (!document) throw new ShoppingItemNotFoundError(filter);
        return document;
    });
}

export const getShoppingItems = async (query?: any[], page:number=1, pageSize:number=10): Promise<PaginatedShoppingItemArr> => {
    const objectQuery = query? Object.fromEntries(query) : {};
    const results = await shoppingItemModel.paginate(objectQuery, {
        select: '-_id -v',
        lean: true,
        limit: pageSize,
        page,
    });
    return {
        page,
        shoppingItems: results.docs,
        totalPages: results.totalPages,
    }
}

export const deleteShoppingItem = async (name: string): Promise<void> => {
    const filter = { name }
    await shoppingItemModel.findOneAndRemove(filter, { useFindAndModify: false }).exec().then(document => {
        if (!document) throw new ShoppingItemNotFoundError(filter);
    });
}