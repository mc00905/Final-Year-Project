import { ErrorWrapper400, ErrorWrapper404, ErrorWrapper412, ErrorWrapper500 } from '../../middleware/ErrorWrapper';

export enum ErrorLibrary {
    ShoppingItemNotFound = 'ShoppingItemNotFound',
    GenericInternalServerError = 'Internal Server Error',
}

export class ShoppingItemNotFoundError extends ErrorWrapper404 {
    constructor(
        query: { name: string },
    ) {
        super(ErrorLibrary.ShoppingItemNotFound, `Shopping Item not found with params: ${JSON.stringify(query)}`);
    }
}

export class GenericInternalServerError extends ErrorWrapper500 {
    constructor(
        message: string,
        details: string,
    ) {
        super(ErrorLibrary.GenericInternalServerError, message, details);
    }
}