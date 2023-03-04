import * as math from "mathjs";


export class Chop {
  constructor() {
    this.approximate = function (equation, decimalPlace) {
      try {
        const trueValue = math.evaluate(equation);
        const decimal = math.pow(10, decimalPlace);
        const resultChopped = math.floor(trueValue * decimal) / decimal;
      
        return resultChopped;
        // return `Chopping result: ${resultChopped}`;
      } catch (e) {
        console.log(e);
        return `There was a problem processing your request: ${e.message}`
      }
    }
  };
}
