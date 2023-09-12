'use client'

import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Button,
  Radio
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './Diagnosis.scss';
import * as tf from '@tensorflow/tfjs';

// loaded_model = tf.keras.models.load_model("path_to_my_model_directory")
// loaded_model = tf.loadGraphModel('diagnosis/saved_model.pb')

// const model = await tf.loadGraphModel('diagnosis/saved_model.pb');

// console.log(model)


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
    // Name of the component
    MuiFormControlLabel: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
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

function makePredictions() {
  // Create an array of values from the details object
  const inputArray = [
    parseFloat(details.cough),
    parseFloat(details.fever),
    parseFloat(details.soreThroat),
    parseFloat(details.shortnessOfBreath),
    parseFloat(details.headAche),
    parseFloat(details.age),
    parseFloat(details.gender),
  ];

  // Make sure inputArray is of the correct shape expected by your model
  // For example, you might need to convert it to a 2D tensor
  const inputTensor = tf.tensor2d([inputArray]);

  // Use the model to make predictions
  const predictions = model.predict(inputTensor);

  // Handle predictions as needed
  console.log(predictions);
}

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

  const [model, setModel] = useState(null);

  useEffect(() => {
    // Define the async function to load the model
    async function loadModel() {
      try {
        const loadedModel = await tf.loadLayersModel('./model.json');
        setModel(loadedModel);
      } catch (error) {
        console.error('Error loading the model:', error);
      }
    }

    // Call the async function to load the model
    loadModel();
  }, []);

  // You can use the model in your component once it's loaded
  useEffect(() => {
    if (model) {
      // Example: Perform an inference using the loaded model
      const input = tf.tensor2d([[/* your input data here */]]);
      const predictions = model.predict(input);
      // Do something with predictions
    }
  }, [model]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleRadioChange = (event) => {
  //   setDetails((prevDetails) => ({
  //     ...prevDetails,

  //   }))
  //   setValue(event.target.value);
  //   setHelperText(' ');
  //   setError(false);
  // };

  const handleSubmit = () => {
    // Pass the details to another component or perform some action
    console.log('Details1:', details);
  };

  return (
    <section className="app px-32 mt-16">
      <h2 style={{ width: '60%', padding: '28px', color: 'black' }} className="font-bold text-5xl px-14">Diagnosis Form</h2>
      <form>
      {formFields.map((field) => (
          <FormControl key={field.name} error={error} variant="standard">
            <FormLabel id={`demo-customized-radios`}>{field.label}</FormLabel>
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
          </FormControl>
        ))}

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </section>

  );
}
export default Diagnosis; 
