import { MicroserviceClient } from './microservice-client/MicroserviceClient'

const client = new MicroserviceClient();
client.getShoppingItems().then(req => console.log(JSON.stringify(req))).catch(err => console.log(JSON.stringify(err.message)));
client.getShoppingItem('apple').then(req => console.log(JSON.stringify(req))).catch(err => console.log(JSON.stringify(err.message)));
client.increaseShoppingItemStock('apple', 10).then(req => console.log(JSON.stringify(req))).catch(err => console.log(JSON.stringify(err.message)));
client.createShoppingItem('banana', 'Fruit', 10).then(req => console.log(JSON.stringify(req))).catch(err => console.log(JSON.stringify(err.message)));
