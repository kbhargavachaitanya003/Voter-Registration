import React from 'react';
import { Box, Button, FormControl, FormGroup, Typography, RadioGroup, FormControlLabel, Radio, FormHelperText } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useStore from '../Store/Store';
import '../Styles/Consent.css';
import axios from 'axios';


interface ConsentProps {
  handleNext: () => void;
}

const Consent: React.FC<ConsentProps> = ({ handleNext }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    mode: 'onBlur'
  });
  const setConsent = useStore(state => state.setConsent);
  const personalDetails = useStore(state => state.personalDetails);
  const setDLimage = useStore(state => state.setDLImage);

  const getSignature = async (drivingLisense: number) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/getDrivingLisense/${drivingLisense}`);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const consentCheck = watch('consent');

  const handleBackConsent = () => {
    navigate('/step/0');
  };

  const handleNextConsent = () => {
    navigate('/step/1');
    handleNext();
  };

  const onSubmit = async (data: any) => {
    if(data.consent === 'consent' && personalDetails?.dl) {
      const signature = await getSignature(personalDetails.dl);
      if (signature) {
        setDLimage(signature);
      }
      handleNextConsent();
    } else {
      console.log('Consent declined');
    }
    setConsent(data);
  };

  React.useEffect(() => {
    register('consent', {
      required: 'Please select your consent option'
    });
  }, [register]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='cons-form'>
      <FormControl error={!!errors.consent}>
        <FormGroup>
          <Typography variant="h5" className='cons-text'>
            To register we are going to use the digital signature that you have in the driving license. Please select below for your consent.
          </Typography>
          <RadioGroup
            row
            className='cons-radio'
            aria-labelledby="demo-controlled-radio-buttons-group"
            value={consentCheck || ''}
            onChange={e => setValue('consent', e.target.value)}
          >
            <FormControlLabel value="consent" control={<Radio />} label="Consent" />
            <FormControlLabel value="decline" control={<Radio />} label="Decline" />
          </RadioGroup>
          {errors.consent && (
            <FormHelperText className='cons-helper'>{String(errors.consent.message)}</FormHelperText>
          )}
          <Box mt={2}>
            <Button onClick={handleBackConsent}>Back</Button>
            <Button variant="contained" color="primary" type="submit">
              Next
            </Button>
          </Box>
        </FormGroup>
      </FormControl>
    </form>
  );
};

export default Consent;
