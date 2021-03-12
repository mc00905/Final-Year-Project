import { Http } from '../util/Http'

interface ShoppingItem {
    name: string;
    category: string;
    inStock: boolean;
    numberOfStock: number;
}

export class MicroserviceClient {
    private http: Http;

    constructor() {
        this.http = new Http('http://localhost:3000/REST/1.0')
    }

    public getShoppingItems = async () => {
        return await this.http.get<ShoppingItem[]>('/shoppingItems')
    }


    public getShoppingItem = async (itemQuery: string) => {
        return await this.http.get<ShoppingItem>(`/shoppingItems/${itemQuery}`)
    }

    public increaseShoppingItemStock = async (itemQuery: string, value: number) => {
        const body = {
            value,
        }
        return await this.http.put<ShoppingItem>(`/shoppingItems/${itemQuery}/increaseStock`, body);
    }

    public decreaseShoppingItemStock = async (itemQuery: string, value: number) => {
        const body = {
            value,
        }
        return await this.http.put<ShoppingItem>(`/shoppingItems/${itemQuery}/decreaseStock`, body);
    }

    
    public createShoppingItem = async (name: string, category: string, numberOfStock: number) => {
        const body = {
            name, category, numberOfStock
        }
        return await this.http.post<void>(`/shoppingItems`, body);
    }
}

export default MicroserviceClient;