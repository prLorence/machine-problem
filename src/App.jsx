import { useState } from 'react'
import './App.css'
import {
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
import { context } from './functions/context';
import { calculateTrueError, calculateRelativeError} from './functions/calculateApproximation';
import { Chop as ChopStrategy} from "./functions/Chop";
import { Round as RoundStrategy} from "./functions/Round";

const Chop = new ChopStrategy();
const Round = new RoundStrategy();

function App() {
  const [equation, setEquation] = useState("");
  const [decimalPlace, setDecimalPlace] = useState(0);
  const [isCalculate, setIsCalculate] = useState(false);
  const [isChopping, setIsChopping] = useState(false);
  const [approximateValue, setApproximateValue] = useState(0);
  const [trueValue, setTrueValue] = useState(0);
  
  context.setStrategy(isChopping ? Chop : Round);
  
  function handleChangeEquation(e) {
    setEquation(e.target.value);
  }

  function handleChangeDecimalPlace(e) {
    setDecimalPlace(e.target.value);
  }

  function handleCalculate(e) {
    setTrueValue(math.evaluate(equation));
    setApproximateValue(context.approximationMethod.approximate(equation, decimalPlace));
    setIsCalculate(true);
    e.preventDefault();
  }

  function resetForm(e) {
    setEquation("");
    setDecimalPlace(0);
    setIsCalculate(false);
    e.preventDefault();
  }

  function handleRadioChange(e) {
    if (e.target.value === "Chop") {
      setIsChopping(true);
      return;
    }
    setIsChopping(!isChopping);
  }

  return (
    <div className="App">
      <FormGroup>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Approximation Method</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
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

          {!isCalculate && <Button type="submit" onClick={handleCalculate}>
            Calculate
          </Button>}

          {isCalculate && <Button onClick={resetForm}> Restart </Button>}
          {isCalculate && `Approximated Value: ${context.approximationMethod.approximate(equation, decimalPlace)}`}
          {isCalculate && `True Error of Approximation: ${calculateTrueError(trueValue, approximateValue)}`}
          {isCalculate && `Relative Error of Approximation: ${calculateRelativeError(trueValue, approximateValue)} %`}
      </FormGroup>
    </div>
  )
}

export default App
