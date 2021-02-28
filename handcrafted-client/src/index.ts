import { simpleAddition, simpleSubtraction } from './basic-setup-test';
import { MicroserviceClient } from './microservice-client/MicroserviceClient'


export const untestedFunction = (num1: number, num2: number): number => {
    if (num1 % 2 === 0) {
        return num1*num1;
    } else {
        return num1*num2;
    }
}

module.exports = { simpleAddition, simpleSubtraction, untestedFunction }

const client = new MicroserviceClient();
client.getShoppingItems().then(req => console.log(JSON.stringify(req))).catch(err => console.log(JSON.stringify(err.message)));
client.getShoppingItem('apple').then(req => console.log(JSON.stringify(req))).catch(err => console.log(JSON.stringify(err.message)));
client.increaseShoppingItemStock('apple', 10).then(req => console.log(JSON.stringify(req))).catch(err => console.log(JSON.stringify(err.message)));
client.createShoppingItem('banana', 'Fruit', 10).then(req => console.log(JSON.stringify(req))).catch(err => console.log(JSON.stringify(err.message)));
