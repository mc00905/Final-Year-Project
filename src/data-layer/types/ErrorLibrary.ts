import { ErrorWrapper400, ErrorWrapper404, ErrorWrapper412, ErrorWrapper500 } from '../../middleware/ErrorWrapper';

export enum ErrorLibrary {
    ShoppingItemNotFound = 'ShoppingItemNotFound'
}

export class ShoppingItemNotFoundError extends ErrorWrapper404 {
    constructor(
        query: { name: string },
    ) {
        super(ErrorLibrary.ShoppingItemNotFound, `Shopping Item not found with params: ${JSON.stringify(query)}`);
    }
}