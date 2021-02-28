import { ShoppingItem, LeanShoppingItem, ShoppingItemDocument } from '../types/ShoppingItem';
import { shoppingItemModel } from '../models/ShoppingItemModel';
import { ShoppingItemCategories } from '../enums/ShoppingItemCategories';
import { ShoppingItemNotFoundError, GenericInternalServerError } from '../types/ErrorLibrary';

export const createShoppingItem = async (name: string, category: ShoppingItemCategories, numberOfStock: number): Promise<void> => {
    const filter = { name };
    const inStock = numberOfStock > 0;
    const update = { name, category, numberOfStock, inStock };
    try {
        await shoppingItemModel.findOneAndUpdate(filter, update, { upsert: true, useFindAndModify: false, new: true }).lean().exec();
    } catch (e) {
        throw e;
    }
}

export const updateShoppingItemCategory = async (name: string, category: ShoppingItemCategories): Promise<ShoppingItem> => {
    const update = { name, category };
    const filter = { name };
    try {
        return await shoppingItemModel.findOneAndUpdate(filter, update, { upsert: true, useFindAndModify: false, new: true }).select('-_id -v').lean().exec().then(document => {
            if (!document) throw new GenericInternalServerError('Failed to update ShoppingItem category', `Failed to update ShoppingItem category for item: ${JSON.stringify(filter)} with value: ${JSON.stringify(update)}`);
            return document;
        });
    } catch (e) {
        throw e;
    }
}

export const increaseShoppingItemStock = async (name: string, value: number): Promise<ShoppingItem> => {
    const filter = { name };
    try {
        return await shoppingItemModel.findOneAndUpdate(filter, { $inc: { numberOfStock: value }, inStock: true }, { useFindAndModify: false, new: true }).lean().exec().then(document => {
            if (!document) throw new GenericInternalServerError('Failed to increase stock', `Failed to increase stock for item: ${filter}`);
            return document;
        });
    } catch (e) {
        throw e;
    }
}

export const decreaseShoppingItemStock = async (name: string, value: number): Promise<ShoppingItem> => {
    const filter = { name };
    try {
        const query = await shoppingItemModel.findOne(filter).lean().exec();
        if (!query) throw new Error(`No documents found with filter ${JSON.stringify(filter)}`);
        const numberOfStockOld = query.numberOfStock;
        const newStockValue = numberOfStockOld - value;
        const numberOfStock = newStockValue > 0 ? newStockValue : 0;
        const inStock = numberOfStock > 0;
        const update = { numberOfStock, inStock };
        return await shoppingItemModel.findOneAndUpdate(filter, update, { useFindAndModify: false, new: true }).lean().exec().then(document => {
            if (!document) throw new GenericInternalServerError('Failed to decrease stock', `Failed to descrease stock for item: ${filter}`);
            return document;
        });
    } catch (e) {
        throw e;
    }
}

export const getShoppingItem = async (name: string): Promise<ShoppingItem> => {
    const filter = { name };
    try {
        return await shoppingItemModel.findOne(filter).select('-_id -v -__v').lean().exec().then(document => {
            if (!document) throw new ShoppingItemNotFoundError(filter);
            return document;
        });
    } catch (e) {
        throw e;
    }
}

export const getShoppingItems = async (query?: Object): Promise<ShoppingItem[]> => {
    try {
        if (query) return await shoppingItemModel.find(query).select('-_id -v').lean().exec();
        else return await shoppingItemModel.find().select('-_id -v -__v').lean().exec();
    } catch (e) {
        throw e;
    }
}

export const deleteShoppingItem = async (name: string): Promise<void> => {
    const filter = { name }
    try {
        await shoppingItemModel.findOneAndRemove(filter, { useFindAndModify: false }).exec();
    } catch (e) {
        throw e;
    }
}