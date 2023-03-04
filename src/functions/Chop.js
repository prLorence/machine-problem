import * as math from "mathjs";


export class Chop {
  constructor() {
    this.calculate = function (equation, decimalPlace) {
      try {
        const result = math.evaluate(equation);
        const decimal = math.pow(10, decimalPlace);
        const resultChopped = math.floor(result * decimal) / decimal;
      
        return `Chopping result: ${resultChopped}`;
      } catch (e) {
        console.log(e);
        return `There was a problem processing your request: ${e.message}`
      }
    }
  };
}
