import * as math from 'mathjs';

export default function calculateTaylor(degree) {
  let resultingSeries = 'x';
  for (let i = 2; i <= degree; i++) {
    let temp = `${math.pow(-1, i + 1)}x^${i}/${i}`
    resultingSeries += temp;
  }
  const result = math.parse(resultingSeries);
  console.log(result.toTex());
  return result.toTex();
}