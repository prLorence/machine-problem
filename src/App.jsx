import { useState } from 'react'
import './App.css'
import { Modal, FormLabel, Radio, RadioGroup, FormControlLabel, FormControl, TextField, InputLabel, Button, FormGroup} from '@mui/material'
import { calculateApproximation } from './functions/calculateApproximation';

import { Chop as ChopStrategy} from "./functions/Chop";
import { Round as RoundStrategy} from "./functions/Round";

const Chop = new ChopStrategy();
const Round = new RoundStrategy();

function App() {
  const [equation, setEquation] = useState("");
  const [decimalPlace, setDecimalPlace] = useState(0);
  const [isCalculate, setIsCalculate] = useState(false);
  const [isChopping, setIsChopping] = useState(false);
  
  // context
  calculateApproximation.setStrategy(isChopping ? Chop : Round);

  function handleChangeEquation(e) {
    setEquation(e.target.value);
  }

  function handleChangeDecimalPlace(e) {
    setDecimalPlace(e.target.value);
  }

  function handleCalculate(e) {
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
              <FormControlLabel value="Chop" control={<Radio />} label={Chop.constructor.name} />
              <FormControlLabel value="Round" control={<Radio />} label={Round.constructor.name} />
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

          <Button type="submit" onClick={handleCalculate}>
            Calculate
          </Button>

          {isCalculate && <Button onClick={resetForm}> Restart </Button>}
          {isCalculate && `${calculateApproximation.calculate(equation, decimalPlace)}`}
      </FormGroup>
    </div>
  )
}

export default App
