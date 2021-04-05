import { AxiosResponse } from 'axios';
import { Http } from '../util/Http'
import { PaginatedShoppingItemArr, ShoppingItem } from '../util/ShoppingItem'
import { ShoppingItemCategories } from '../util/ShoppingItemCategories'


export class MicroserviceClient {
    private http: Http;

    constructor() {
        this.http = new Http('http://localhost:3000/REST/1.0')
    }

    public getShoppingItems = async (page?: number, pageSize?: Number, category?: ShoppingItemCategories, inStock?: boolean): Promise<AxiosResponse<PaginatedShoppingItemArr>> => {
        const queryParams = {
            page, pageSize, category, inStock
        }
        return await this.http.get<PaginatedShoppingItemArr>('/shoppingItems', queryParams)
    }


    public getShoppingItem = async (itemQuery: string): Promise<AxiosResponse<ShoppingItem>> => {
        return await this.http.get<ShoppingItem>(`/shoppingItems/${itemQuery}`)
    }

    public increaseShoppingItemStock = async (itemQuery: string, value: number): Promise<AxiosResponse<ShoppingItem>> => {
        const body = {
            value,
        }
        return await this.http.put<ShoppingItem>(`/shoppingItems/${itemQuery}/increaseStock`, body);
    }

    public decreaseShoppingItemStock = async (itemQuery: string, value: number): Promise<AxiosResponse<ShoppingItem>> => {
        const body = {
            value,
        }
        return await this.http.put<ShoppingItem>(`/shoppingItems/${itemQuery}/decreaseStock`, body);
    }

    
    public createShoppingItem = async (name: string, category: string, numberOfStock: number): Promise<AxiosResponse<void>> => {
        const body = {
            name, category, numberOfStock
        }
        return await this.http.post<void>(`/shoppingItems`, body);
    }

    public deleteShoppingItem = async (name: string): Promise<AxiosResponse<void>> => {
        return await this.http.del<void>(`/shoppingItems/${name}`);
    }
}

export default MicroserviceClient;