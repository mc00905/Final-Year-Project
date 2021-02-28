import { simpleAddition, simpleSubtraction } from './basic-setup-test';


export const untestedFunction = (num1: number, num2: number): number => {
    if (num1 % 2 === 0) {
        return num1*num1;
    } else {
        return num1*num2;
    }
}

module.exports = { simpleAddition, simpleSubtraction, untestedFunction }
