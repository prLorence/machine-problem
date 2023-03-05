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
import { BlockMath } from 'react-katex';

// strategy pattern
const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: "100%",
  maxWidth: "500px",
  flexWrap: "wrap"
  // alignItems: 'center',
}

const formStyle = {
  width: "100%",
  maxWidth: "500px"
}


import getTaylor from '../functions/getTaylor';
import { inputStyle } from './ErrorPropagation';

function TaylorPolynomial() {
  const [degree, setDegree] = useState(0);
  const [taylorEquation, setTaylorEquation] = useState('');
  const [isCalculate, setIsCalculate] = useState(false);

  function handleChangeDegree(e) {
    setDegree(e.target.value);
  }

  function handleSubmit() {
    setIsCalculate(true);
    setTaylorEquation(getTaylor(degree));
  }

  function handleReset(e) {
    setTaylorEquation('');
    setDegree(0)
    setIsCalculate(false);
    e.preventDefault();
  }

  return (
    <Box sx={style}>
      <FormGroup sx={formStyle} fullWidth>
        <Typography variant='h2'>
          ln (x + 1)
        </Typography>
        <TextField sx={inputStyle} disabled={isCalculate} label='Degree' value={degree} onChange={handleChangeDegree} />
        {!isCalculate && <Button variant="contained" sx={inputStyle} type="submit" onClick={handleSubmit}> Calculate </Button>}
        {isCalculate && <Button variant="contained" sx={inputStyle} onClick={handleReset}> Reset </Button>}
      </FormGroup>
      {/* where math equation happens */}
        {isCalculate && <BlockMath >{taylorEquation}</BlockMath>}
    </Box>
  )
}

export default TaylorPolynomial