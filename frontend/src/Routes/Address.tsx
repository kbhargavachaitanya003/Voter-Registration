import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormGroup, TextField, Grid, Typography, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useStore from '../Store/Store';
import Select, { SingleValue } from 'react-select';
import '../Styles/Address.css';

interface AddressProps {
  handleNext: () => void;
  handleBack: () => void;
}

interface CountryOption {
  label: string;
  value: string;
}

const Address: React.FC<AddressProps> = ({ handleNext, handleBack }) => {
  const { register, handleSubmit, formState } = useForm();
  const setAddress = useStore((state) => state.setAddress);
  const address = useStore((state) => state.address);
  const [streetNumberError, setStreetNumberError] = useState('');
  const [mStreetNumberError, setMStreetNumberError] = useState('');
  const [zipError, setZipError] = useState('');
  const [mZipError, setMZipError] = useState('');
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<SingleValue<CountryOption>>(null);
  const navigate = useNavigate();
  const { errors } = formState;

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        // setSelectedCountry(data.userSelectValue);
      });
  }, []);

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

  const handleMStreetNumberKeyPress = (e: any) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
      setMStreetNumberError('Only numbers are allowed');
    } else {
      setMStreetNumberError('');
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

  const handleMZipKeyPress = (e: any) => {
    if (!/[0-9-]/.test(e.key)) {
      e.preventDefault();
      setMZipError('Only numbers and "-" character are allowed');
    } else {
      setMZipError('');
    }
  };

  const onSubmit = (data: any) => {
    console.log(selectedCountry);
    data.mCountry = selectedCountry?.value || '';
    if (data.mStreetNumber === '' && data.mStreetName === '' && data.mApartUnit === '' && data.mTown === '' && data.mState === '' && data.mZip === '' && data.mCountry === '') {
      data.mStreetNumber = data.streetNumber;
      data.mStreetName = data.streetName;
      data.mApartUnit = data.apartUnit;
      data.mTown = data.city;
      data.mState = data.state;
      data.mZip = data.zip;
      data.mCountry = 'US';
    }

    console.log(data);
    setAddress(data);
    handleNextAddress();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-form">
      <FormControl>
        <FormGroup>
          <Typography variant="h5" className='addr-res-heading'>Residential Address</Typography>
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
          <Box mt={1} className='addr-note'>
            <Checkbox {...register('military')} />
            <Typography variant="body1" className='addr-note-text'>I am a member of the military</Typography>
          </Box>
          <Box className='addr-mail-heading'>
            <Typography variant="h5" >Mailing Address</Typography>
            <Typography variant="body1" className='addr-note-text-heading'>(Please provide your mailing address if different from residential address)</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                className="add-detail"
                variant="outlined"
                label='Street Number'
                defaultValue={address?.mStreetNumber}
                {...register('mStreetNumber')}
                error={!!mStreetNumberError}
                helperText={mStreetNumberError}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  onKeyPress: handleMStreetNumberKeyPress,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="add-detail"
                variant="outlined"
                label='Street Name'
                defaultValue={address?.mStreetName}
                {...register('mStreetName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="add-detail"
                variant="outlined"
                label='Apartment/Unit'
                defaultValue={address?.mApartUnit}
                {...register('mApartUnit')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="add-detail"
                variant="outlined"
                label='City'
                defaultValue={address?.mTown}
                {...register('mTown')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="add-detail"
                variant="outlined"
                label='State'
                defaultValue={address?.mState}
                {...register('mState')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="add-detail"
                variant="outlined"
                label='Zip Code'
                defaultValue={address?.mZip}
                {...register('mZip')}
                error={!!mZipError}
                helperText={mZipError}
                inputProps={{
                  inputMode: 'numeric',
                  onKeyPress: handleMZipKeyPress,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                placeholder="Country"
                options={countries}
                defaultValue={selectedCountry}
                onChange={setSelectedCountry}
                className="add-detail-country"
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button variant="contained" onClick={handleBackAddress} className="back-button">Back</Button>
            <Button variant="contained" color="primary" type="submit">Next</Button>
          </Box>
        </FormGroup>
      </FormControl>
    </form>
  );
};

export default Address;
