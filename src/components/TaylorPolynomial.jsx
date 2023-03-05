import { useState } from 'react'
import {
  Typography,
  TextField,
  Button,
  FormGroup
} from '@mui/material'

import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

// strategy pattern

import getTaylor from '../functions/getTaylor';
import calculateTaylor from '../functions/calculateTaylor';
import { inputStyle } from './ErrorPropagation';

function TaylorPolynomial() {
  const [degree, setDegree] = useState(0);
  const [taylorParam, setTaylorParam] = useState(0);
  const [taylorValue, setTaylorValue] = useState('');
  const [isCalculate, setIsCalculate] = useState(false);

  function handleChangeDegree(e) {
    setDegree(e.target.value);
  }

  function handleChangeParam(e) {
    setTaylorParam(e.target.value);
  }

  function handleSubmit() {
    calculateTaylor(taylorParam);
    setIsCalculate(true);
    setTaylorValue(getTaylor(degree));
  }

  function handleReset(e) {
    setDegree(0)
    setTaylorValue('');
    setTaylorParam(0);
    setIsCalculate(false);
    e.preventDefault();
  }

  return (
    <div>
      <Typography variant='h2'>
        ln (x + 1)
      </Typography>
      <FormGroup>

        <TextField sx={inputStyle} label='Degree' value={degree} onChange={handleChangeDegree} />
        {/* <TextField label='x' value={taylorParam} onChange={handleChangeParam} /> */}
        {!isCalculate && <Button variant="contained" sx={inputStyle} type="submit" onClick={handleSubmit}> Calculate </Button>}
        {isCalculate && <Button variant="contained" sx={inputStyle} onClick={handleReset}> Reset </Button>}
        {isCalculate && <BlockMath>{taylorValue}</BlockMath>}
      </FormGroup>
    </div>
  )
}

export default TaylorPolynomial