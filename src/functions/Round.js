import * as math from "mathjs";


export class Round {
  constructor() {
    this.approximate = function (equation, decimalPlace) {
      try {
        // do the calculations here
        const trueValue = math.evaluate(equation);
        const roundedError = trueValue.toFixed(decimalPlace); 
        // console.log("Rounding");
        return roundedError;
      } catch (e) {
        console.log(e);
        return `There was a problem processing your request: ${e.message}`
      }
    }
  };
}
