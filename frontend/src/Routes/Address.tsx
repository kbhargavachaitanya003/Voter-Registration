import React, { useState } from 'react';
import { Box, Button, FormControl, FormGroup, TextField, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useStore from '../Store/Store';
import '../Styles/Address.css';

interface AddressProps {
  handleNext: () => void;
  handleBack: () => void;
}

const Address: React.FC<AddressProps> = ({ handleNext, handleBack }) => {
  const { register, handleSubmit, formState } = useForm();
  const setAddress = useStore((state) => state.setAddress);
  const address = useStore((state) => state.address);
  const [streetNumberError, setStreetNumberError] = useState('');
  const [zipError, setZipError] = useState('');
  const navigate = useNavigate();
  const { errors } = formState;

  const handleBackAddress = () => {
    navigate('/consent');
    handleBack();
  };

  const handleNextAddress = () => {
    navigate('/step/2');
    handleNext();
  };

  const handleStreetNumberKeyPress = (e: any) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
      setStreetNumberError('Only numbers are allowed');
    } else {
      setStreetNumberError('');
    }
  };

  const handleZipKeyPress = (e: any) => {
    if (!/[0-9-]/.test(e.key)) {
      e.preventDefault();
      setZipError('Only numbers and "-" character are allowed');
    } else {
      setZipError('');
    }
  };

  const onSubmit = (data: any) => {
    setAddress(data);
    handleNextAddress();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-form">
      <FormControl>
        <FormGroup>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                className="add-detail"
                variant="outlined"
                label={typeof errors.streetNumber?.message === 'string' ? errors.streetNumber.message : 'Street Number*'}
                defaultValue={address?.streetNumber}
                {...register('streetNumber', {
                  required: {
                    value: true,
                    message: 'Street Number is required',
                  },
                })}
                error={!!errors.streetNumber || !!streetNumberError}
                helperText={streetNumberError}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  onKeyPress: handleStreetNumberKeyPress,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="add-detail"
                variant="outlined"
                label={typeof errors.streetName?.message === 'string' ? errors.streetName.message : 'Street Name*'}
                defaultValue={address?.streetName}
                {...register('streetName', {
                  required: {
                    value: true,
                    message: 'Street Name is required',
                  },
                })}
                error={!!errors.streetName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="add-detail"
                variant="outlined"
                label={typeof errors.apartUnit?.message === 'string' ? errors.apartUnit.message : 'Apartment/Unit*'}
                defaultValue={address?.apartUnit}
                {...register('apartUnit', {
                  required: {
                    value: true,
                    message: 'Apartment/Unit is required',
                  },
                })}
                error={!!errors.apartUnit}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="add-detail"
                variant="outlined"
                label={typeof errors.city?.message === 'string' ? errors.city.message : 'City*'}
                defaultValue={address?.city}
                {...register('city', {
                  required: {
                    value: true,
                    message: 'City is required',
                  },
                })}
                error={!!errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="add-detail"
                variant="outlined"
                label={typeof errors.state?.message === 'string' ? errors.state.message : 'State*'}
                defaultValue={address?.state}
                {...register('state', {
                  required: {
                    value: true,
                    message: 'State is required',
                  },
                })}
                error={!!errors.state}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="add-detail"
                variant="outlined"
                label={typeof errors.zip?.message === 'string' ? errors.zip.message : 'Zip Code*'}
                defaultValue={address?.zip}
                {...register('zip', {
                  required: {
                    value: true,
                    message: 'Zip Code is required',
                  },
                  pattern: {
                    value: /^[0-9]{5}(-[0-9]{4})?$/,
                    message: 'Invalid Zip Code',
                  },
                })}
                error={!!errors.zip || !!zipError}
                helperText={zipError || (errors.zip && 'Zip code should be in ##### or #####-#### format')}
                inputProps={{
                  inputMode: 'numeric',
                  onKeyPress: handleZipKeyPress,
                }}
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button onClick={handleBackAddress}>Back</Button>
            <Button variant="contained" color="primary" type="submit">
              Next
            </Button>
          </Box>
        </FormGroup>
      </FormControl>
    </form>
  );
};

export default Address;
