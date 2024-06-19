import React from 'react';
import { Box, Button, TextField, FormControl, FormGroup, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { PersonalDetailsData } from '../Components/types';
import useStore from '../Store/Store';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import '../Styles/PersonalDetails.css';

const PersonalDetails: React.FC = () => {
  const { register, handleSubmit, formState, control, setError, clearErrors } = useForm<PersonalDetailsData>();
  const { errors } = formState;
  const navigate = useNavigate();
  const setPersonalDetails = useStore(state => state.setPersonalDetails);
  const PersonalDetails = useStore(state => state.personalDetails);

  const handleBackPersonalDetails = () => {
    navigate('/');
  };

  const handleNextPersonalDetails = () => {
    navigate('/consent');
  };

  const onSubmit = (data: any) => {
    const today = dayjs();
    const birthDate = dayjs(data.dob);
    const age = today.diff(birthDate, 'year');

    if (age < 18) {
      setError('dob', {
        type: 'manual',
        message: 'You are not eligible'
      });
    } else {
      clearErrors('dob');
      const formattedDate = birthDate.format('MM/DD/YYYY');
      data.dob = formattedDate;
      setPersonalDetails(data);
      handleNextPersonalDetails();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className='per-form'>
      <FormControl fullWidth>
        <FormGroup>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                className='per-detail'
                defaultValue={PersonalDetails?.firstName || ''}
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
                defaultValue={PersonalDetails?.lastName || ''}
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name='dob'
                  control={control}
                  defaultValue={PersonalDetails?.dob ? dayjs(PersonalDetails.dob) : null}
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
                          helperText: errors.dob?.message === 'You are not eligible' ? 'Your age must be 18 years and above' : ''
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
                defaultValue={PersonalDetails?.dl || ''}
                {...register('dl', {
                  required: {
                    value: true,
                    message: 'Driving License is required'
                  },
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: 'Invalid Driving License'
                  }
                })}
                error={!!errors.dl}
                helperText={errors.dl?.message === 'Invalid Driving License' ? 'Driving License Should be a 6-digit number' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={errors.ssn?.message || 'SSN'}
                variant='outlined'
                className='per-detail'
                defaultValue={PersonalDetails?.ssn || ''}
                {...register('ssn', {
                  pattern: {
                    value: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
                    message: 'Invalid SSN'
                  }
                })}
                error={!!errors.ssn}
                helperText={errors.ssn ? 'SSN Should be in the format xxx-xxx-xxxx (all numbers)' : ''}
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button onClick={handleBackPersonalDetails}>Back</Button>
            <Button variant='contained' color='primary' type='submit'>
              Next
            </Button>
          </Box>
        </FormGroup>
      </FormControl>
    </form>
  );
};

export default PersonalDetails;
