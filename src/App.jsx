import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './App.css'

// strategy pattern
import ErrorPropagation from './components/ErrorPropagation';
import TaylorPolynomial from './components/TaylorPolynomial';

function App() {
 const [option, setOption] = useState('approximation');

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <div className="App">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <Select
              id="select"
              defaultValue='approximation'
              value={option}
              onChange={handleChange}
            >
            <MenuItem value={'approximation'}>Error Propagated Approximation</MenuItem>
            <MenuItem value={'taylor'}>Taylor's Polynomial</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {option == "taylor" && <TaylorPolynomial/> }
      {option == "approximation" && <ErrorPropagation/> }
    </div>
  );
}

export default App
