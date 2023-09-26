'use client'

import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Button,
  Radio,
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './Diagnosis.scss';
import * as tf from '@tensorflow/tfjs';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const theme = createTheme({
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          color: 'black',
        },
      },
    },
  },
});

const formFields = [
  { name: 'gender', label: 'Gender' },
  { name: 'age', label: 'Is your Age 65 or above?' },
  { name: 'fever', label: 'Fever' },
  { name: 'soreThroat', label: 'Sore Throat' },
  { name: 'shortnessOfBreath', label: 'Shortness of Breath' },
  { name: 'headAche', label: 'Headache' },
  { name: 'cough', label: 'Coughing' },
];

const Diagnosis = () => {
  const [error, setError] = React.useState(false);
  const [details, setDetails] = useState({
    cough: '',
    fever: '',
    soreThroat: '',
    shortnessOfBreath: '',
    headAche: '',
    age: '',
    gender: '',
  })
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [showRedirectPopup, setshowRedirectPopup] = useState(false);
  const [result, setResult] = useState(null);
  const [model, setModel] = useState(null);

  const showWarning = (result) => {
    if (result > 0.50) {
      setShowWarningPopup(true);
    } else {
      setshowRedirectPopup(true)
    }
  };
  
  const closeWarning = () => {
    setShowWarningPopup(false);
  };

  const closeRedirect = () => {
    setshowRedirectPopup(false);
  };

  const handleResult = (result) => {
    if (result <= 0.40 && showWarningPopup2) {
      return (
        <div>
          <Dialog open={showWarningPopup} onClose={closeWarning}>
            <DialogTitle>Warning</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You are most likely have COVID-19. Please isolate yourself from others and contact health Canada for instructions.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeWarning} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
          <p>You don't have COVID-19.</p>
          <Button variant="contained" onClick={() => window.location.href = '/'}>Go to Main Page</Button>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    async function loadModel() {
      try {
        const loadedModel = await tf.loadLayersModel('/model/model.json');
        if (loadedModel) {
          loadedModel.layers.forEach(layer => {
            if (layer.trainable) {
              layer.setWeights(layer.getWeights().map(weight => tf.cast(weight, 'float32')));
            }
          });
          setModel(loadedModel);
        } else {
          console.error('Loaded model is undefined.');
        }
      } catch (error) {
        console.error('Error loading the model:', error);
      }
    }

    loadModel();
    console.log(model)
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(details)
  };

  const convertToBinary = (convertedValue) => {
    convertedValue = convertedValue == 'yes' ? '1' : '0';
    return convertedValue;
  };

  const handleSubmit = async () => {
    event.preventDefault(); 
    try {
      if (model) {
        const { cough, fever, soreThroat, shortnessOfBreath, headAche, age, gender } = details;
        let convertedGender;
        let convertedAge;
        if (gender == 'male') {
          convertedGender = '1'
        } else {
          convertedGender = '0'
        }

        if (age == 'yes') {
          convertedAge = '0'
        } else {
          convertedAge = '1'
        }

        const convertedCough = convertToBinary(cough);
        const convertedFever = convertToBinary(fever);
        const convertedSoreThroat = convertToBinary(soreThroat);
        const convertedShortnessOfBreath = convertToBinary(shortnessOfBreath);
        const convertedHeadAche = convertToBinary(headAche);

        console.log('Converted Values:', {
          cough: convertedCough,
          fever: convertedFever,
          soreThroat: convertedSoreThroat,
          shortnessOfBreath: convertedShortnessOfBreath,
          headAche: convertedHeadAche,
          age: convertedAge,
          gender: convertedGender,
        });

        const convertedInputArray = [
          parseInt(convertedCough, 10),
          parseInt(convertedFever, 10),
          parseInt(convertedSoreThroat, 10),
          parseInt(convertedShortnessOfBreath, 10),
          parseInt(convertedHeadAche, 10),
          parseInt(convertedAge, 10),
          parseInt(convertedGender, 10)
        ];

        console.log("convertedInputArray.jsx: ", convertedInputArray)  
        const input = tf.tensor2d([convertedInputArray], [1, convertedInputArray.length], 'int32');
        console.log("Input tensor:", input);
        const predictions = await model.predict(input.cast('int32'));
        const result = predictions.dataSync();
        console.log('Prediction:', result);
  
        showWarning(result);
      }

      console.log('Details1:', details);
    } catch (error){
      console.error('Error in handleSubmit:', error);
    }
  };

  return (
    <section className="app px-32 mt-16">
      <h2 style={{ width: '60%', padding: '28px', color: 'black' }} className="font-bold text-5xl px-14">Diagnosis Form</h2>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
            <FormControl key={field.name} error={error} variant="standard">
              <FormLabel id={`demo-customized-radios`}>{field.label}</FormLabel>
              
              {field.name === 'gender' ? (
                <RadioGroup
                  row
                  value={details[field.name]}
                  onChange={handleInputChange}
                  aria-labelledby={`demo-customized-radios`}
                  name={field.name}
                >
                  <FormControlLabel theme={theme} value="female" control={<BpRadio />} label="Female" />
                  <FormControlLabel theme={theme} value="male" control={<BpRadio />} label="Male" />
                </RadioGroup>
              ) : (
                <RadioGroup
                  row
                  value={details[field.name]}
                  onChange={handleInputChange}
                  aria-labelledby={`demo-customized-radios`}
                  name={field.name}
                >
                  <FormControlLabel theme={theme} value="yes" control={<BpRadio />} label="Yes" />
                  <FormControlLabel theme={theme} value="no" control={<BpRadio />} label="No" />
                </RadioGroup>
              )}
            </FormControl>
          ))}
          <Button variant="contained" type="submit">
            Submit
          </Button>
      </form>
      <Dialog open={showWarningPopup} onClose={closeWarning}>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You most likely have COVID-19. Please isolate yourself from others and contact health Canada for instructions.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeWarning} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showRedirectPopup} onClose={closeRedirect}>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You most likely don't have COVID-19. However, please contact health Canada for more instructoins.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => window.location.href = '/'}>
            Go to Main Page
          </Button>
          <Button onClick={closeRedirect} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}
export default Diagnosis; 
