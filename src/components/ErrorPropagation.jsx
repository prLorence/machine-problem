import { useState } from 'react'
import {
  Box,
  Modal,
  Typography,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
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

const Chop = new ChopStrategy();
const Round = new RoundStrategy();

function ErrorPropagation() {
  const [equation, setEquation] = useState("");
  const [decimalPlace, setDecimalPlace] = useState(0);
  const [approximateValue, setApproximateValue] = useState(0);
  const [trueValue, setTrueValue] = useState(0);
  const [isCalculate, setIsCalculate] = useState(false);
  const [approximateMethod, setApproximateMethod] = useState(null);
  const [errMessage, setErrMessage] = useState("");
  
  context.setStrategy(approximateMethod ? Chop : Round);

  function handleChangeEquation(e) {
    setEquation(e.target.value);
  }

  function handleChangeDecimalPlace(e) {
    setDecimalPlace(e.target.value);
  }

  function handleSubmit(e) {
    if (approximateMethod === null) {
      setErrMessage('Please choose an approximation method.');
      return;
    }

    if (equation === "") {
      setErrMessage('Please enter a value to approximate');
      return;
    }

    try {
      setTrueValue(math.evaluate(equation));
      setApproximateValue(context.approximationMethod.approximate(equation, decimalPlace));
      setIsCalculate(true);
      e.preventDefault();
    } catch (e) {
      setErrMessage(`There was a problem processing your request: ${e.message}`)
    }
  }

  function resetForm(e) {
    setEquation("");
    setDecimalPlace(0);
    setIsCalculate(false);
    e.preventDefault();
  }

  function handleRadioChange(e) {
    setApproximateMethod(e.target.value);
  }

  return (
    <div className="App">
      <FormGroup>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Approximation Method</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
              onChange={handleRadioChange}
              row
            >
            <FormControlLabel value="Chop" control={<Radio disabled={isCalculate} />} label={Chop.constructor.name} />
            <FormControlLabel value="Round" control={<Radio disabled={isCalculate} />} label={Round.constructor.name} />
            </RadioGroup>
          </FormControl>
          <TextField
            id="equation"
            label="Enter your equation"
            disabled={isCalculate}
            value={equation}
            onChange={handleChangeEquation} />

          <TextField
            id="decimal-place"
            label="Decimal Places"
            disabled={isCalculate}
            value={decimalPlace}
            onChange={handleChangeDecimalPlace} />

          {!isCalculate ? <Button type="submit" onClick={handleSubmit}>
            Calculate
          </Button>: <Button onClick={resetForm}> Restart </Button>}
          {!isCalculate && `${errMessage}`}
          {/* {isCalculate && <Button onClick={resetForm}> Restart </Button>}  */}
          {isCalculate && `Approximated Value: ${context.approximationMethod.approximate(equation, decimalPlace)}`}
          {isCalculate && `True Error of Approximation: ${calculateTrueError(trueValue, approximateValue)}`}
          {isCalculate && `Relative Error of Approximation: ${calculateRelativeError(trueValue, approximateValue)} %`}
      </FormGroup>
    </div>
  )
}

export default ErrorPropagation;
