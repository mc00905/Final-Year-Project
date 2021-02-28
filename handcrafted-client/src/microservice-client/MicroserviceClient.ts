import { Http } from '../util/Http'

export class MicroserviceClient {
    private http: Http;

    constructor() {
        this.http = new Http('http://localhost:3000/REST/1.0')
    }

    public getShoppingItems = async () => {
        return await this.http.get('/shoppingItemsssd')
    }
}