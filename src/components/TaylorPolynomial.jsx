import { useState } from 'react'
import {
  Typography,
  FormLabel,
  TextField,
  Button,
  FormGroup
} from '@mui/material'
import * as math from "mathjs";

// strategy pattern
import { context } from '../functions/context';
import { calculateTrueError, calculateRelativeError} from '../functions/calculateApproximation';
import { Chop as ChopStrategy} from "../functions/Chop";
import { Round as RoundStrategy} from "../functions/Round";
import calculateTaylor from '../functions/calculateTaylor';
import katex from "katex";


function TaylorPolynomial() {
  const [degree, setDegree] = useState(1);
  const [taylorValue, setTaylorValue] = useState('');
  const [isCalculate, setIsCalculate] = useState(false);

  function renderText() {
    console.log(katex.renderToString(taylorValue));
    return katex.render(taylorValue)
  }

  function handleChangeDegree(e) {
    setDegree(e.target.value);
  }

  function handleSubmit() {
    setIsCalculate(true);
    setTaylorValue(calculateTaylor(degree));
  }

  function resetForm(e) {
    setEquation("");
    setDecimalPlace(0);
    setIsCalculate(false);
    e.preventDefault();
  }

  return (
    <div>
      <Typography variant='h1'>
        ln (x + 1)
      </Typography>
      <FormGroup>

        <TextField label='Degree' value={degree} onChange={handleChangeDegree} />
        <TextField label='x' />
        <Button type="submit" onClick={handleSubmit}>
          Calculate
        </Button>
        {isCalculate && renderText()}
      </FormGroup>
    </div>
  )
}

export default TaylorPolynomial