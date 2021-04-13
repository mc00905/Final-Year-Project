// tslint:disable
/**
 * example-repo
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as globalImportUrl from 'url';
import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @enum {string}
 */
export enum ErrorLibraryShoppingItemNotFound {
    ShoppingItemNotFound = 'ShoppingItemNotFound'
}

/**
 * 
 * @export
 * @interface InlineObject
 */
export interface InlineObject {
    /**
     * 
     * @type {number}
     * @memberof InlineObject
     */
    value: number;
}
/**
 * 
 * @export
 * @interface InlineObject1
 */
export interface InlineObject1 {
    /**
     * 
     * @type {number}
     * @memberof InlineObject1
     */
    value: number;
}
/**
 * 
 * @export
 * @interface InlineResponse404
 */
export interface InlineResponse404 {
    /**
     * 
     * @type {string}
     * @memberof InlineResponse404
     */
    message: string;
    /**
     * 
     * @type {ErrorLibraryShoppingItemNotFound}
     * @memberof InlineResponse404
     */
    errorIdentifier: ErrorLibraryShoppingItemNotFound;
}
/**
 * 
 * @export
 * @interface PaginatedShoppingItemArr
 */
export interface PaginatedShoppingItemArr {
    /**
     * List of ShoppingItems
     * @type {Array<ShoppingItem>}
     * @memberof PaginatedShoppingItemArr
     */
    shoppingItems: Array<ShoppingItem>;
    /**
     * Current Page
     * @type {number}
     * @memberof PaginatedShoppingItemArr
     */
    page: number;
    /**
     * Total number of Pages available
     * @type {number}
     * @memberof PaginatedShoppingItemArr
     */
    totalPages: number;
}
/**
 * From T, pick a set of properties whose keys are in the union K
 * @export
 * @interface PickShoppingItemCategory
 */
export interface PickShoppingItemCategory {
    /**
     * 
     * @type {ShoppingItemCategories}
     * @memberof PickShoppingItemCategory
     */
    category: ShoppingItemCategories;
}
/**
 * From T, pick a set of properties whose keys are in the union K
 * @export
 * @interface PickShoppingItemCategoryOrNameOrNumberOfStock
 */
export interface PickShoppingItemCategoryOrNameOrNumberOfStock {
    /**
     * 
     * @type {ShoppingItemCategories}
     * @memberof PickShoppingItemCategoryOrNameOrNumberOfStock
     */
    category: ShoppingItemCategories;
    /**
     * The identifying name of the ShoppingItem
     * @type {string}
     * @memberof PickShoppingItemCategoryOrNameOrNumberOfStock
     */
    name: string;
    /**
     * The number of the ShoppingItem in stock
     * @type {number}
     * @memberof PickShoppingItemCategoryOrNameOrNumberOfStock
     */
    numberOfStock: number;
}
/**
 * ShoppingItem objects store the information relating to a product within the store.  It stores all of the identifying and meta information about the product.
 * @export
 * @interface ShoppingItem
 */
export interface ShoppingItem {
    /**
     * The identifying name of the ShoppingItem
     * @type {string}
     * @memberof ShoppingItem
     */
    name: string;
    /**
     * 
     * @type {ShoppingItemCategories}
     * @memberof ShoppingItem
     */
    category: ShoppingItemCategories;
    /**
     * The number of the ShoppingItem in stock
     * @type {number}
     * @memberof ShoppingItem
     */
    numberOfStock: number;
    /**
     * Boolean representing whether stock is greater than 0
     * @type {boolean}
     * @memberof ShoppingItem
     */
    inStock: boolean;
}
/**
 * Enum storing all potential categories a ShoppingItem falls under
 * @export
 * @enum {string}
 */
export enum ShoppingItemCategories {
    Frozen = 'Frozen',
    Fruit = 'Fruit',
    Vegetable = 'Vegetable',
    Dairy = 'Dairy',
    Bakery = 'Bakery'
}

/**
 * 
 * @export
 * @interface TsoaValidationErrorResponseBody
 */
export interface TsoaValidationErrorResponseBody {
    /**
     * 
     * @type {{ [key: string]: object; }}
     * @memberof TsoaValidationErrorResponseBody
     */
    details?: { [key: string]: object; };
    /**
     * 
     * @type {string}
     * @memberof TsoaValidationErrorResponseBody
     */
    errorIdentifier: TsoaValidationErrorResponseBodyErrorIdentifierEnum;
    /**
     * 
     * @type {string}
     * @memberof TsoaValidationErrorResponseBody
     */
    message: string;
}

/**
    * @export
    * @enum {string}
    */
export enum TsoaValidationErrorResponseBodyErrorIdentifierEnum {
    ValidationError = 'Validation Error'
}


/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a new ShoppingItem
         * @param {PickShoppingItemCategoryOrNameOrNumberOfStock} pickShoppingItemCategoryOrNameOrNumberOfStock 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createShoppingItem: async (pickShoppingItemCategoryOrNameOrNumberOfStock: PickShoppingItemCategoryOrNameOrNumberOfStock, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'pickShoppingItemCategoryOrNameOrNumberOfStock' is not null or undefined
            if (pickShoppingItemCategoryOrNameOrNumberOfStock === null || pickShoppingItemCategoryOrNameOrNumberOfStock === undefined) {
                throw new RequiredError('pickShoppingItemCategoryOrNameOrNumberOfStock','Required parameter pickShoppingItemCategoryOrNameOrNumberOfStock was null or undefined when calling createShoppingItem.');
            }
            const localVarPath = `/REST/1.0/shoppingItems`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof pickShoppingItemCategoryOrNameOrNumberOfStock !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(pickShoppingItemCategoryOrNameOrNumberOfStock !== undefined ? pickShoppingItemCategoryOrNameOrNumberOfStock : {}) : (pickShoppingItemCategoryOrNameOrNumberOfStock || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Decrease the number of the ShoppingItem in stock by the value provided
         * @param {string} name 
         * @param {InlineObject1} inlineObject1 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        decreaseShoppingItemStock: async (name: string, inlineObject1: InlineObject1, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'name' is not null or undefined
            if (name === null || name === undefined) {
                throw new RequiredError('name','Required parameter name was null or undefined when calling decreaseShoppingItemStock.');
            }
            // verify required parameter 'inlineObject1' is not null or undefined
            if (inlineObject1 === null || inlineObject1 === undefined) {
                throw new RequiredError('inlineObject1','Required parameter inlineObject1 was null or undefined when calling decreaseShoppingItemStock.');
            }
            const localVarPath = `/REST/1.0/shoppingItems/{name}/decreaseStock`
                .replace(`{${"name"}}`, encodeURIComponent(String(name)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof inlineObject1 !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(inlineObject1 !== undefined ? inlineObject1 : {}) : (inlineObject1 || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Delete the targeted ShoppingItem resource
         * @param {string} name The name of the resource
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteShoppingItem: async (name: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'name' is not null or undefined
            if (name === null || name === undefined) {
                throw new RequiredError('name','Required parameter name was null or undefined when calling deleteShoppingItem.');
            }
            const localVarPath = `/REST/1.0/shoppingItems/{name}`
                .replace(`{${"name"}}`, encodeURIComponent(String(name)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Gets the ShoppingItem with the supplied name
         * @param {string} name The unique name of the ShoppingItem
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getShoppingItem: async (name: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'name' is not null or undefined
            if (name === null || name === undefined) {
                throw new RequiredError('name','Required parameter name was null or undefined when calling getShoppingItem.');
            }
            const localVarPath = `/REST/1.0/shoppingItems/{name}`
                .replace(`{${"name"}}`, encodeURIComponent(String(name)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get array of ShoppingItems
         * @param {boolean} [inStock] Filter results based on whether stocck value is greater than 0 or not
         * @param {ShoppingItemCategories} [category] The Category to filter results by
         * @param {number} [page] Page of results to return
         * @param {number} [pageSize] Size of page to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getShoppingItems: async (inStock?: boolean, category?: ShoppingItemCategories, page?: number, pageSize?: number, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/REST/1.0/shoppingItems`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (inStock !== undefined) {
                localVarQueryParameter['inStock'] = inStock;
            }

            if (category !== undefined) {
                localVarQueryParameter['category'] = category;
            }

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Increase the number of the ShoppingItem in stock by the value provided
         * @param {string} name 
         * @param {InlineObject} inlineObject 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        increaseShoppingItemStock: async (name: string, inlineObject: InlineObject, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'name' is not null or undefined
            if (name === null || name === undefined) {
                throw new RequiredError('name','Required parameter name was null or undefined when calling increaseShoppingItemStock.');
            }
            // verify required parameter 'inlineObject' is not null or undefined
            if (inlineObject === null || inlineObject === undefined) {
                throw new RequiredError('inlineObject','Required parameter inlineObject was null or undefined when calling increaseShoppingItemStock.');
            }
            const localVarPath = `/REST/1.0/shoppingItems/{name}/increaseStock`
                .replace(`{${"name"}}`, encodeURIComponent(String(name)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof inlineObject !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(inlineObject !== undefined ? inlineObject : {}) : (inlineObject || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Update the Category of the ShoppingItem
         * @param {string} name 
         * @param {PickShoppingItemCategory} pickShoppingItemCategory 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateShoppingItemCategory: async (name: string, pickShoppingItemCategory: PickShoppingItemCategory, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'name' is not null or undefined
            if (name === null || name === undefined) {
                throw new RequiredError('name','Required parameter name was null or undefined when calling updateShoppingItemCategory.');
            }
            // verify required parameter 'pickShoppingItemCategory' is not null or undefined
            if (pickShoppingItemCategory === null || pickShoppingItemCategory === undefined) {
                throw new RequiredError('pickShoppingItemCategory','Required parameter pickShoppingItemCategory was null or undefined when calling updateShoppingItemCategory.');
            }
            const localVarPath = `/REST/1.0/shoppingItems/{name}/category`
                .replace(`{${"name"}}`, encodeURIComponent(String(name)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof pickShoppingItemCategory !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(pickShoppingItemCategory !== undefined ? pickShoppingItemCategory : {}) : (pickShoppingItemCategory || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Create a new ShoppingItem
         * @param {PickShoppingItemCategoryOrNameOrNumberOfStock} pickShoppingItemCategoryOrNameOrNumberOfStock 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createShoppingItem(pickShoppingItemCategoryOrNameOrNumberOfStock: PickShoppingItemCategoryOrNameOrNumberOfStock, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DefaultApiAxiosParamCreator(configuration).createShoppingItem(pickShoppingItemCategoryOrNameOrNumberOfStock, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Decrease the number of the ShoppingItem in stock by the value provided
         * @param {string} name 
         * @param {InlineObject1} inlineObject1 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async decreaseShoppingItemStock(name: string, inlineObject1: InlineObject1, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ShoppingItem>> {
            const localVarAxiosArgs = await DefaultApiAxiosParamCreator(configuration).decreaseShoppingItemStock(name, inlineObject1, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Delete the targeted ShoppingItem resource
         * @param {string} name The name of the resource
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteShoppingItem(name: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DefaultApiAxiosParamCreator(configuration).deleteShoppingItem(name, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Gets the ShoppingItem with the supplied name
         * @param {string} name The unique name of the ShoppingItem
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getShoppingItem(name: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ShoppingItem>> {
            const localVarAxiosArgs = await DefaultApiAxiosParamCreator(configuration).getShoppingItem(name, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get array of ShoppingItems
         * @param {boolean} [inStock] Filter results based on whether stocck value is greater than 0 or not
         * @param {ShoppingItemCategories} [category] The Category to filter results by
         * @param {number} [page] Page of results to return
         * @param {number} [pageSize] Size of page to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getShoppingItems(inStock?: boolean, category?: ShoppingItemCategories, page?: number, pageSize?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedShoppingItemArr>> {
            const localVarAxiosArgs = await DefaultApiAxiosParamCreator(configuration).getShoppingItems(inStock, category, page, pageSize, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Increase the number of the ShoppingItem in stock by the value provided
         * @param {string} name 
         * @param {InlineObject} inlineObject 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async increaseShoppingItemStock(name: string, inlineObject: InlineObject, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ShoppingItem>> {
            const localVarAxiosArgs = await DefaultApiAxiosParamCreator(configuration).increaseShoppingItemStock(name, inlineObject, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update the Category of the ShoppingItem
         * @param {string} name 
         * @param {PickShoppingItemCategory} pickShoppingItemCategory 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateShoppingItemCategory(name: string, pickShoppingItemCategory: PickShoppingItemCategory, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ShoppingItem>> {
            const localVarAxiosArgs = await DefaultApiAxiosParamCreator(configuration).updateShoppingItemCategory(name, pickShoppingItemCategory, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Create a new ShoppingItem
         * @param {PickShoppingItemCategoryOrNameOrNumberOfStock} pickShoppingItemCategoryOrNameOrNumberOfStock 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createShoppingItem(pickShoppingItemCategoryOrNameOrNumberOfStock: PickShoppingItemCategoryOrNameOrNumberOfStock, options?: any): AxiosPromise<void> {
            return DefaultApiFp(configuration).createShoppingItem(pickShoppingItemCategoryOrNameOrNumberOfStock, options).then((request) => request(axios, basePath));
        },
        /**
         * Decrease the number of the ShoppingItem in stock by the value provided
         * @param {string} name 
         * @param {InlineObject1} inlineObject1 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        decreaseShoppingItemStock(name: string, inlineObject1: InlineObject1, options?: any): AxiosPromise<ShoppingItem> {
            return DefaultApiFp(configuration).decreaseShoppingItemStock(name, inlineObject1, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete the targeted ShoppingItem resource
         * @param {string} name The name of the resource
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteShoppingItem(name: string, options?: any): AxiosPromise<void> {
            return DefaultApiFp(configuration).deleteShoppingItem(name, options).then((request) => request(axios, basePath));
        },
        /**
         * Gets the ShoppingItem with the supplied name
         * @param {string} name The unique name of the ShoppingItem
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getShoppingItem(name: string, options?: any): AxiosPromise<ShoppingItem> {
            return DefaultApiFp(configuration).getShoppingItem(name, options).then((request) => request(axios, basePath));
        },
        /**
         * Get array of ShoppingItems
         * @param {boolean} [inStock] Filter results based on whether stocck value is greater than 0 or not
         * @param {ShoppingItemCategories} [category] The Category to filter results by
         * @param {number} [page] Page of results to return
         * @param {number} [pageSize] Size of page to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getShoppingItems(inStock?: boolean, category?: ShoppingItemCategories, page?: number, pageSize?: number, options?: any): AxiosPromise<PaginatedShoppingItemArr> {
            return DefaultApiFp(configuration).getShoppingItems(inStock, category, page, pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * Increase the number of the ShoppingItem in stock by the value provided
         * @param {string} name 
         * @param {InlineObject} inlineObject 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        increaseShoppingItemStock(name: string, inlineObject: InlineObject, options?: any): AxiosPromise<ShoppingItem> {
            return DefaultApiFp(configuration).increaseShoppingItemStock(name, inlineObject, options).then((request) => request(axios, basePath));
        },
        /**
         * Update the Category of the ShoppingItem
         * @param {string} name 
         * @param {PickShoppingItemCategory} pickShoppingItemCategory 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateShoppingItemCategory(name: string, pickShoppingItemCategory: PickShoppingItemCategory, options?: any): AxiosPromise<ShoppingItem> {
            return DefaultApiFp(configuration).updateShoppingItemCategory(name, pickShoppingItemCategory, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * Create a new ShoppingItem
     * @param {PickShoppingItemCategoryOrNameOrNumberOfStock} pickShoppingItemCategoryOrNameOrNumberOfStock 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public createShoppingItem(pickShoppingItemCategoryOrNameOrNumberOfStock: PickShoppingItemCategoryOrNameOrNumberOfStock, options?: any) {
        return DefaultApiFp(this.configuration).createShoppingItem(pickShoppingItemCategoryOrNameOrNumberOfStock, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Decrease the number of the ShoppingItem in stock by the value provided
     * @param {string} name 
     * @param {InlineObject1} inlineObject1 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public decreaseShoppingItemStock(name: string, inlineObject1: InlineObject1, options?: any) {
        return DefaultApiFp(this.configuration).decreaseShoppingItemStock(name, inlineObject1, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Delete the targeted ShoppingItem resource
     * @param {string} name The name of the resource
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public deleteShoppingItem(name: string, options?: any) {
        return DefaultApiFp(this.configuration).deleteShoppingItem(name, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Gets the ShoppingItem with the supplied name
     * @param {string} name The unique name of the ShoppingItem
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public getShoppingItem(name: string, options?: any) {
        return DefaultApiFp(this.configuration).getShoppingItem(name, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get array of ShoppingItems
     * @param {boolean} [inStock] Filter results based on whether stocck value is greater than 0 or not
     * @param {ShoppingItemCategories} [category] The Category to filter results by
     * @param {number} [page] Page of results to return
     * @param {number} [pageSize] Size of page to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public getShoppingItems(inStock?: boolean, category?: ShoppingItemCategories, page?: number, pageSize?: number, options?: any) {
        return DefaultApiFp(this.configuration).getShoppingItems(inStock, category, page, pageSize, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Increase the number of the ShoppingItem in stock by the value provided
     * @param {string} name 
     * @param {InlineObject} inlineObject 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public increaseShoppingItemStock(name: string, inlineObject: InlineObject, options?: any) {
        return DefaultApiFp(this.configuration).increaseShoppingItemStock(name, inlineObject, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Update the Category of the ShoppingItem
     * @param {string} name 
     * @param {PickShoppingItemCategory} pickShoppingItemCategory 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public updateShoppingItemCategory(name: string, pickShoppingItemCategory: PickShoppingItemCategory, options?: any) {
        return DefaultApiFp(this.configuration).updateShoppingItemCategory(name, pickShoppingItemCategory, options).then((request) => request(this.axios, this.basePath));
    }

}


