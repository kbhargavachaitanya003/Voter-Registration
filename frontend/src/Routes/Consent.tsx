import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormGroup, Typography, RadioGroup, FormControlLabel, Radio, FormHelperText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useStore from '../Store/Store';
import '../Styles/Consent.css';
import { useMutation } from '@tanstack/react-query';
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
  const [dialogOpen, setDialogOpen] = useState(false);

  const getSignature = async (drivingLicense: number) => {
    const { data } = await axios.get(`http://localhost:8080/api/getDrivingLicense/${drivingLicense}`);
    return data;
  };

  const mutationGetSignature = useMutation({
    mutationFn: getSignature, 
    onError: (error) => {
      console.error(error);
    }
  });

  const consentCheck = watch('consent');

  const handleBackConsent = () => {
    navigate('/step/0');
  };

  const handleNextConsent = () => {
    navigate('/step/1');
    handleNext();
  };

  const onSubmit = async (consentData: any) => {
    console.log(personalDetails);
    if (consentData.consent === 'consent' && personalDetails?.dl) {
      const signature = await mutationGetSignature.mutateAsync(personalDetails.dl);
      if (signature !== 'No' && signature) {
        setDLimage(signature);
        handleNextConsent();
      }
    } else {
      console.log('Consent declined');
      setDialogOpen(true);
    }
    setConsent(consentData);
  };

  useEffect(() => {
    register('consent', {
      required: 'Please select your consent option'
    });
  }, [register]);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  }

  return (
    <>
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
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Consent Declined"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            To Register Online you need to select Consent option or you may visit nearest registration office. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Consent;
