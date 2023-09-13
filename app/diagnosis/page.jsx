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


async function makePrediction() {
  const inputData = tf.tensor2d([[/* your input data here */]]);
  const prediction = model.predict(inputData);
  const result = prediction.dataSync(); // Get the prediction result as an array
  // Process and use the result as needed
  console.log('Prediction:', result);
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
  const inputArray = [
    parseInt(details.cough, 10),
    parseInt(details.fever, 10),
    parseInt(details.soreThroat, 10),
    parseInt(details.shortnessOfBreath, 10),
    parseInt(details.headAche, 10),
    parseInt(details.age, 10),
    parseInt(details.gender, 10),
  ];

  useEffect(() => {
    // Define the async function to load the model
    async function loadModel() {
      try {
        // const loadedModel = await tf.loadLayersModel('./model.json');
        const loadedModel = await tf.loadLayersModel('/model/model.json');
        if (loadedModel) {
          console.log("loadedModel", loadedModel)
          console.log("loadedmodel's summary: ", loadedModel.summary())
          let newModel = tf.keras.models.clone_model(loadedModel, dtype=tf.int32)
          newModel.set_weights(loadedModel.get_weights()) // copy the weights from loadedModel
          console.log("newModel", newModel)
          setModel(newModel);
        } else {
          console.error('Loaded model is undefined.');
        }
      } catch (error) {
        console.error('Error loading the model:', error);
      }
    }

    // Call the async function to load the model
    loadModel();
    console.log(model)
  }, []);


  // useEffect(() => {
  //   // Define the async function to load the model
  //   async function loadModel() {
  //     try {
  //       // const loadedModel = await tf.loadLayersModel('./model.json');
  //       const model = await tf.loadLayersModel('http://localhost:3000/model/model.json');
  //       if (model) {
  //         console.log("loadedModel", model)
  //         let newModel = tf.keras.models.clone_model(model, dtype=tf.int32)
  //         newModel.set_weights(model.get_weights()) // copy the weights from loadedModel
  //         console.log("newModel", newModel)
  //         setModel(newModel);
  //       } else {
  //         console.error('Loaded model is undefined.');
  //       }
  //     } catch (error) {
  //       console.error('Error loading the model:', error);
  //     }
  //   }

  //   // Call the async function to load the model
  //   loadModel();
  //   console.log(model)
  // }, []);


  // You can use the model in your component once it's loaded
  useEffect(() => {
    if (model) {
      // Example: Perform an inference using the loaded model
      // const input = tf.tensor2d([[1,1,1,1,1,1,1]]).toInt();
      // const input = tf.tensor2d([[1, 1, 1, 1, 1, 1, 1]]); // Assuming 'int32' is the expected data type
      const input = tf.tensor2d([inputArray], [1, inputArray.length], 'float32');

      console.log("Input tensor:", input);
      const predictions = model.predict(input);
      const result = predictions.dataSync();

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
    // Ensure that the model is loaded
    console.log("swag")
    if (model) {
      console.log("Swag2")

      const input = tf.tensor2d([inputArray], [1, inputArray.length], 'int64');

      console.log("Input tensor:", input);
      const predictions = model.predict(input.cast('int32'));
      const result = predictions.dataSync();
      console.log('Prediction:', result);
    }

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
