import * as math from "mathjs";
import chop from "./Chop";

export default function calculateTaylor(degree, taylorValue, decimalPlace) {
  let validEquation = `${taylorValue}`;

  for (let i = 2; i <= degree; i++) {
    let validTemp;
    validTemp = `+(${taylorValue}^${i}/${i})`;
    if (i % 2 == 0) {
      validTemp = `-(${taylorValue}^${i}/${i})`;
    }
    validEquation += validTemp;
  }

  // const trueValue = math.evaluate(validEquation);
  return chop(validEquation, decimalPlace);
}
