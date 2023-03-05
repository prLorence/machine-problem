import * as math from 'mathjs';

export let taylorEquation = '';
export let resultingSeries = 'x';

export default function getTaylor(degree) {
  for (let i = 2; i <= degree; i++) {
    const constant = math.pow(-1, i + 1);
    let temp;
    temp = `+${constant}/${i}x^${i}`
    if (i % 2 == 0) {
      temp = `${constant}/${i}x^${i}`
    }
    resultingSeries += temp;
  }
  taylorEquation = math.parse(resultingSeries);
  console.log(resultingSeries)
  return taylorEquation.toTex();
}