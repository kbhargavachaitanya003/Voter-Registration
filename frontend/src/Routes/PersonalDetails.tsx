import React, { useState } from 'react';
import { Box, Button, TextField, FormControl, FormGroup, Grid, Typography, Select, MenuItem, InputLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { PersonalDetailsData, AddressData } from '../Components/types';
import useStore from '../Store/Store';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import '../Styles/PersonalDetails.css';

const PersonalDetails: React.FC = () => {
  const { register, handleSubmit, formState, control, setError, clearErrors } = useForm<PersonalDetailsData>();
  const { errors } = formState;
  const navigate = useNavigate();
  const setPersonalDetails = useStore(state => state.setPersonalDetails);
  const personalDetails = useStore(state => state.personalDetails);
  const address = useStore(state => state.address);
  const setAddress = useStore(state => state.setAddress);
  const setReferenceNumber = useStore(state => state.setReferenceNumber);
  const [licenseError, setLicenseError] = useState('');
  const [ssnError, setSsnError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const checkDrivingLicense = async (drivingLicense: number) => {
    const { data } = await axios.get(`http://localhost:8080/api/checkDrivingLicense/${drivingLicense}`);
    return data;
  };

  const mutationCheckDrivingLicense = useMutation({
    mutationFn: checkDrivingLicense, 
    onError: (error) => {
      console.error(error);
    }
  });

  const handleBackPersonalDetails = () => {
    navigate('/');
  };

  const handleNextPersonalDetails = () => {
    navigate('/consent');
  };

  const generateTenDigitNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000);
  }

  const onSubmit = async (personalData: PersonalDetailsData) => {
    const today = dayjs();
    const birthDate = dayjs(personalData.dob);

    if (birthDate.isAfter(today)) {
      setError('dob', {
        type: 'manual',
        message: 'Invalid Date'
      });
      return;
    }

    const age = today.diff(birthDate, 'year');

    if (age < 17) {
      setError('dob', {
        type: 'manual',
        message: 'You are not eligible'
      });
    } else {
      clearErrors('dob');
      const formattedDate = birthDate.format('MM/DD/YYYY');
      personalData.dob = formattedDate;
      setPersonalDetails(personalData);
      const rNumber = generateTenDigitNumber();
      console.log(rNumber);
      setReferenceNumber(rNumber);

      if (personalData.dl !== undefined) {
        const data = await mutationCheckDrivingLicense.mutateAsync(personalData.dl);
        if (data === 'Yes') {
          const updatedAddress = {
            ...address,
            city: personalData.town
          }
          setAddress(updatedAddress);
          handleNextPersonalDetails();
        } else if (data === 'No') {
          setOpenDialog(true);
        } else {
          console.log('Error');
        }
      } else {
        console.log('Driving License is undefined');
      }
    }
  };

  const handleLicenseKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
      setLicenseError('Only numbers are allowed');
    } else {
      setLicenseError('');
    }
  };

  const handlessnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
      setSsnError('Only numbers are allowed');
    } else {
      setSsnError('');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className='per-form'>
        <FormControl fullWidth>
          <FormGroup>
            <Typography variant='h5' className='per-header'>Type of Change</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} className='changeType-grid'>
                <FormControl variant='outlined' fullWidth error={!!errors.voterType} className='per-detail-changeType'>
                  <InputLabel id="voterType-label">{errors.voterType?.message || 'Type of Voter*'}</InputLabel>
                  <Controller
                    name='voterType'
                    control={control}
                    rules={{ required: 'Type of Voter is required' }}
                    defaultValue={personalDetails?.voterType || ''}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label={errors.voterType?.message || 'Type of Voter*'}
                      >
                        <MenuItem value='New Voter Registration'>New Voter Registration</MenuItem>
                        <MenuItem value='Change Voter Registration'>Change Voter Registration</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  label={errors.town?.message || 'Current Town of Residence*'}
                  className='per-detail'
                  defaultValue={personalDetails?.town || ''}
                  {...register('town', {
                    required: {
                      value: true,
                      message: 'Current Town of Residence is required'
                    }
                  })}
                  error={!!errors.town}
                />
              </Grid>
            </Grid>
            <Typography variant='h5' className='per-header'>Personal Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  className='per-detail'
                  label='Prefix'
                  defaultValue={personalDetails?.prefix || ''}
                  {...register('prefix')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  className='per-detail'
                  defaultValue={personalDetails?.firstName || ''}
                  label={errors.firstName?.message || 'First Name*'}
                  {...register('firstName', {
                    required: {
                      value: true,
                      message: 'First Name is required'
                    }
                  })}
                  error={!!errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  className='per-detail'
                  defaultValue={personalDetails?.lastName || ''}
                  label={errors.lastName?.message || 'Last Name*'}
                  {...register('lastName', {
                    required: {
                      value: true,
                      message: 'Last Name is required'
                    }
                  })}
                  error={!!errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  className='per-detail'
                  label='Middle Name'
                  defaultValue={personalDetails?.middleName || ''}
                  {...register('middleName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  className='per-detail'
                  label='Suffix'
                  defaultValue={personalDetails?.suffix || ''}
                  {...register('suffix')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name='dob'
                    control={control}
                    defaultValue={personalDetails?.dob ? dayjs(personalDetails.dob) : null}
                    rules={{ required: 'Date is required' }}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label={typeof errors.dob?.message === 'string' ? errors.dob.message : 'Date of Birth*'}
                        value={field.value || null}
                        onChange={(date) => field.onChange(date)}
                        slotProps={{
                          textField: {
                            className: 'per-detail',
                            error: !!errors.dob,
                            helperText: errors.dob?.message === 'You are not eligible' ? 'Your age must be 18 years and above' : (errors.dob?.message === 'Invalid Date' ? 'Date of Birth cannot be in the future' : '')
                          }
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={errors.dl?.message || 'Driving License*'}
                  variant='outlined'
                  className='per-detail'
                  defaultValue={personalDetails?.dl || ''}
                  {...register('dl', {
                    required: {
                      value: true,
                      message: 'Driving License is required'
                    },
                    pattern: {
                      value: /^[0-9]{9}$/,
                      message: 'Invalid Driving License'
                    }
                  })}
                  error={!!errors.dl || !!licenseError}
                  helperText={licenseError || (errors.dl?.message === 'Invalid Driving License' ? 'Driving License Should be a 9-digit number' : '')}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    onKeyPress: handleLicenseKeyPress
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={errors.ssn?.message || 'SSN'}
                  variant='outlined'
                  className='per-detail'
                  defaultValue={personalDetails?.ssn || ''}
                  {...register('ssn', {
                    pattern: {
                      value: /^[0-9]{4}$/,
                      message: 'Invalid SSN'
                    }
                  })}
                  error={!!errors.ssn || !!ssnError}
                  helperText={ssnError || (errors.ssn ? 'SSN Should be a 4-digit number' : 'Please enter last 4-digits of your SSN')}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    onKeyPress: handlessnKeyPress
                  }}
                />
              </Grid>
            </Grid>
            <Box mt={2} className='person-button-box'>
              <Button onClick={handleBackPersonalDetails}>Back</Button>
              <Button variant='contained' color='primary' type='submit'>
                Next
              </Button>
            </Box>
          </FormGroup>
        </FormControl>
      </form>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Invalid Driving License</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This driving license is invalid. For voter registration, please reach out to the nearest registration office.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PersonalDetails;
