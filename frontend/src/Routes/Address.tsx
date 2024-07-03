import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormGroup, TextField, Grid, Typography, Checkbox, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { PersonalDetailsData } from '../Components/types';
import useStore from '../Store/Store';
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
  const { register, handleSubmit, formState, control } = useForm();
  const setAddress = useStore((state) => state.setAddress);
  const address = useStore((state) => state.address);
  const personalDetails = useStore((state) => state.personalDetails);
  const eligibilityAndType = useStore((state) => state.eligibilityAndType);
  const setPersonalDetails = useStore((state) => state.setPersonalDetails);
  const [streetNumberError, setStreetNumberError] = useState('');
  const [mStreetNumberError, setMStreetNumberError] = useState('');
  const [zipError, setZipError] = useState('');
  const [mZipError, setMZipError] = useState('');
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [sameAddress, setSameAddress] = useState<boolean | null>(null);
  const [display, setDisplay] = useState<boolean>(false);
  const navigate = useNavigate();
  const { errors } = formState;

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
      });
  }, []);

  const handleBackAddress = () => {
    if (eligibilityAndType?.typeOfRegistration === 'driving license') {
      navigate('/consent');
    } else if (eligibilityAndType?.typeOfRegistration === 'ssn') {
      navigate('/step/0');
    }
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
    data.mCountry = selectedCountry || '';
    if (sameAddress === null || sameAddress === undefined || (sameAddress === false && data.mCountry === '')) {
      setDisplay(true);
      return;
    } else {
      if (sameAddress === true) {
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
      const updatedPersonalDetails = {
        ...personalDetails,
        town: data.city,
      };

      setPersonalDetails(updatedPersonalDetails);
      handleNextAddress();
    }
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
                label={typeof errors.streetNumber?.message === 'string' ? errors.streetNumber.message : <span>Street Number<span style={{ color: 'Red' }}>*</span></span>}
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
                label={typeof errors.streetName?.message === 'string' ? errors.streetName.message : <span>Street Name<span style={{ color: 'Red' }}>*</span></span>}
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
                label='Apartment/Unit'
                defaultValue={address?.apartUnit}
                {...register('apartUnit')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="add-detail"
                variant="outlined"
                label={typeof errors.city?.message === 'string' ? errors.city.message : <span>City/Town<span style={{ color: 'Red' }}>*</span></span>}
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
                label={typeof errors.state?.message === 'string' ? errors.state.message : <span>State<span style={{ color: 'Red' }}>*</span></span>}
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
                label={typeof errors.zip?.message === 'string' ? errors.zip.message : <span>Zip Code<span style={{ color: 'Red' }}>*</span></span>}
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
                helperText={zipError || (errors.zip?.message === 'Invalid Zip Code' ? 'Zip code should be in ##### or #####-#### format' : '')}
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
          <Box mt={1} className='addr-same-note'>
            <Typography variant="body1" className='addr-note-text'>Is your Mailing Address same as Residential Address?<span style={{ color: 'Red' }}>*</span></Typography>
            <Checkbox
              checked={sameAddress === true}
              onChange={() => setSameAddress(true)}
            />
            <Typography variant="body1" className='addr-note-text'>Yes</Typography>
            <Checkbox
              checked={sameAddress === false}
              onChange={() => setSameAddress(false)}
            />
            <Typography variant="body1" className='addr-note-text'>No</Typography>
            {(display === true && (sameAddress === null || sameAddress === undefined)) && (
              <FormHelperText className='addr-error' error>You Must Select an Option</FormHelperText>
            )}
          </Box>
          {sameAddress === false && (
            <React.Fragment>
              <Box className='addr-mail-heading'>
                <Typography variant="h5" className='addr-mail-heading-text'>Mailing Address</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="add-detail"
                    variant="outlined"
                    label={typeof errors.mStreetNumber?.message === 'string' ? errors.mStreetNumber.message : <span>Street Number<span style={{ color: 'Red' }}>*</span></span>}
                    defaultValue={address?.mStreetNumber}
                    {...register('mStreetNumber', {
                      required: {
                        value: true,
                        message: 'Street Number is required',
                      },
                    })}
                    error={!!errors.mStreetNumber || !!mStreetNumberError}
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
                    label={typeof errors.mStreetName?.message === 'string' ? errors.mStreetName.message : <span>Street Name<span style={{ color: 'Red' }}>*</span></span>}
                    defaultValue={address?.mStreetName}
                    {...register('mStreetName', {
                      required: {
                        value: true,
                        message: 'Street Name is required',
                      },
                    })}
                    error={!!errors.mStreetName}
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
                    label={typeof errors.mTown?.message === 'string' ? errors.mTown.message : <span>City/Town<span style={{ color: 'Red' }}>*</span></span>}
                    defaultValue={address?.mTown}
                    {...register('mTown', {
                      required: {
                        value: true,
                        message: 'City is required',
                      },
                    })}
                    error={!!errors.mTown}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="add-detail"
                    variant="outlined"
                    label={typeof errors.mState?.message === 'string' ? errors.mState.message : <span>State<span style={{ color: 'Red' }}>*</span></span>}
                    defaultValue={address?.mState}
                    {...register('mState', {
                      required: {
                        value: true,
                        message: 'State is required',
                      },
                    })}
                    error={!!errors.mState}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="add-detail"
                    variant="outlined"
                    label={typeof errors.mZip?.message === 'string' ? errors.mZip.message : <span>Zip Code<span style={{ color: 'Red' }}>*</span></span>}
                    defaultValue={address?.mZip}
                    {...register('mZip', {
                      required: {
                        value: true,
                        message: 'Zip Code is required',
                      },
                      pattern: {
                        value: /^[0-9]{5}(-[0-9]{4})?$/,
                        message: 'Invalid Zip Code',
                      },
                    })}
                    error={!!errors.mZip || !!mZipError}
                    helperText={mZipError || (errors.mZip?.message === 'Invalid Zip Code' ? 'Zip code should be in ##### or #####-#### format' : '')}
                    inputProps={{
                      inputMode: 'numeric',
                      onKeyPress: handleMZipKeyPress,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl variant='outlined' fullWidth error={!!errors.mCountry} className='add-detail'>
                    <InputLabel id="mCountry-label">{errors.mCountry ? 'Country is Required' : <span>Country<span style={{ color: 'Red' }}>*</span></span>}</InputLabel>
                    <Controller
                      name='mCountry'
                      control={control}
                      rules={{ required: 'Country is required' }}
                      defaultValue={address?.mCountry}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label={typeof errors.mCountry?.message === 'string' ? errors.mCountry.message : <span>Country<span style={{ color: 'Red' }}>*</span></span>}
                          value={selectedCountry}
                          onChange={(e) => {
                            setSelectedCountry(e.target.value);
                            field.onChange(e.target.value);
                          }}
                        >
                          {countries.map((country) => (
                            <MenuItem key={country.value} value={country.value}>
                              {country.label}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.mCountry && <FormHelperText error>Country is Required</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </FormGroup>
        <Box mt={2}>
          <Button variant="contained" onClick={handleBackAddress} className="back-button">Back</Button>
          <Button variant="contained" color="primary" type="submit" >Next</Button>
        </Box>
      </FormControl>
    </form>
  );
};

export default Address;
