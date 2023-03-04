import * as math from "mathjs";


export class Round {
  constructor() {
    this.approximate = function () {
      try {
        // do the calculations here
        return `Rounding method`;
      } catch (e) {
        console.log(e);
        return `There was a problem processing your request: ${e.message}`
      }
    }
  };
}
