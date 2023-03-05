import * as math from 'mathjs';
import { resultingSeries } from './getTaylor';

export default function calculateTaylor(val) {
  let taylor = math.parse(resultingSeries);
  taylor = taylor.compile();
  let scope = {
    x: val
  }
  console.log(taylor.evaluate(scope));
}