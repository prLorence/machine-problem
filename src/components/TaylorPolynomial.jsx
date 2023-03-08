import { useState } from 'react'
import { createPortal } from 'react-dom';
import {
  Typography,
  TextField,
  Button,
  Box,
  FormGroup
} from '@mui/material'

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

import getTaylor from '../functions/getTaylor';
import calculateTaylor from '../functions/calculateTaylor';
import { inputGroup, inputStyle} from './ErrorPropagation';

const outputContainer = {
  marginTop: "1em",
  marginBottom: "0.5em",
  display: "flex",
  justifyContent: "space-around"
}

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: "100%",
  maxWidth: "700px",
  flexWrap: "wrap"
}

const mathContainer = {
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
}

const formStyle = {
  width: "100%",
  maxWidth: "700px"
}

function TaylorPolynomial() {
  // input values
  const [degree, setDegree] = useState(0);
  const [taylorValue, setTaylorValue] = useState(0);
  const [decimalPlace, setDecimalPlace] = useState(0);

  const [taylorEquation, setTaylorEquation] = useState('');
  const [isCalculate, setIsCalculate] = useState(false);

  function handleChangeDegree(e) {
    setDegree(e.target.value);
  }

  function handleChangeTaylorValue(e) {
    setTaylorValue(e.target.value);
  }

  function handleChangeDecimalPlace(e) {
    setDecimalPlace(e.target.value);
  }

  function handleSubmit() {
    setIsCalculate(true);
    setTaylorEquation(getTaylor(degree, taylorValue, decimalPlace));
  }

  function handleReset(e) {
    e.preventDefault();
    setTaylorEquation('');
    setDegree(0)
    setTaylorValue(0);
    setDecimalPlace(0);
    setIsCalculate(false);
  }

  return (
    <Box sx={style}>
      <FormGroup sx={formStyle}>
        <Typography variant='h2'>
          ln (x + 1)
        </Typography>

        <Box sx={inputGroup}>
          <TextField sx={inputStyle} disabled={isCalculate} label='Degree' value={degree} onChange={handleChangeDegree} />
          <TextField sx={inputStyle} disabled={isCalculate} label='X' value={taylorValue} onChange={handleChangeTaylorValue} />
          <TextField disabled={isCalculate} label='Decimal places' value={decimalPlace} onChange={handleChangeDecimalPlace} />
        </Box>

        {!isCalculate && <Button variant="contained" type="submit" onClick={handleSubmit}> Calculate </Button>}
        {isCalculate && <Button variant="contained" onClick={handleReset}> Reset </Button>}

      </FormGroup>
        {/* where math equation happens */}
        <Box sx={outputContainer}>
          {isCalculate && <InlineMath>{`n=${degree}`}</InlineMath>}
          {isCalculate && <InlineMath>{`x=${taylorValue}`}</InlineMath>}
        </Box>
        <Box sx={mathContainer}>
        {isCalculate && <BlockMath >{`P_{${degree}}(x)=${taylorEquation}`}</BlockMath>}
          <Box sx={{ display: "flex", width: "60%", justifyContent: 'space-around'}}> 
            <Typography> (Chopped) </Typography>
            {isCalculate && <InlineMath >{`P_{${degree}}(x) = ${calculateTaylor(degree, taylorValue, decimalPlace).chopped}`}</InlineMath>}
          </Box>
          <Box sx={{ display: "flex", width: "60%", justifyContent: 'space-around'}}> 
          <Typography> (Rounded) </Typography>
          {isCalculate && <InlineMath >{`P_{${degree}}(x) = ${calculateTaylor(degree, taylorValue, decimalPlace).rounded}`}</InlineMath>}
          </Box>
        </Box>
    </Box>
  )
}

export default TaylorPolynomial