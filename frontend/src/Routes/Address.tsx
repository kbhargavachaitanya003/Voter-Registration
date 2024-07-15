import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormGroup, TextField, Grid, Typography, Checkbox, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import useStore from '../Store/Store';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
      navigate('/step/consent');
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
      setStreetNumberError(t('onlyNumbers'));
    } else {
      setStreetNumberError('');
    }
  };

  const handleMStreetNumberKeyPress = (e: any) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
      setMStreetNumberError(t('onlyNumbers'));
    } else {
      setMStreetNumberError('');
    }
  };

  const handleZipKeyPress = (e: any) => {
    if (!/[0-9-]/.test(e.key)) {
      e.preventDefault();
      setZipError(t('zipCodeCharacters'));
    } else {
      setZipError('');
    }
  };

  const handleMZipKeyPress = (e: any) => {
    if (!/[0-9-]/.test(e.key)) {
      e.preventDefault();
      setMZipError(t('zipCodeCharacters'));
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
          <Typography variant="h5" className='addr-res-heading'>{t('addressDetailsHeader1')}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                className="add-detail"
                variant="outlined"
                label={typeof errors.streetNumber?.message === 'string' ? errors.streetNumber.message : <span>{t('streetNumber')}<span style={{ color: 'Red' }}>*</span></span>}
                defaultValue={address?.streetNumber}
                {...register('streetNumber', {
                  required: {
                    value: true,
                    message: t('streetNumberRequired'),
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
                label={typeof errors.streetName?.message === 'string' ? errors.streetName.message : <span>{t('streetName')}<span style={{ color: 'Red' }}>*</span></span>}
                defaultValue={address?.streetName}
                {...register('streetName', {
                  required: {
                    value: true,
                    message: t('streetNameRequired'),
                  },
                })}
                error={!!errors.streetName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="add-detail"
                variant="outlined"
                label={t('apartmentUnit')}
                defaultValue={address?.apartUnit}
                {...register('apartUnit')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="add-detail"
                variant="outlined"
                label={typeof errors.city?.message === 'string' ? errors.city.message : <span>{t('city')}<span style={{ color: 'Red' }}>*</span></span>}
                defaultValue={address?.city}
                {...register('city', {
                  required: {
                    value: true,
                    message: t('cityRequired'),
                  },
                })}
                error={!!errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="add-detail"
                variant="outlined"
                label={typeof errors.state?.message === 'string' ? errors.state.message : <span>{t('state')}<span style={{ color: 'Red' }}>*</span></span>}
                defaultValue={address?.state}
                {...register('state', {
                  required: {
                    value: true,
                    message: t('stateRequired'),
                  },
                })}
                error={!!errors.state}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="add-detail"
                variant="outlined"
                label={typeof errors.zip?.message === 'string' ? errors.zip.message : <span>{t('zipCode')}<span style={{ color: 'Red' }}>*</span></span>}
                defaultValue={address?.zip}
                {...register('zip', {
                  required: {
                    value: true,
                    message: t('zipCodeRequired'),
                  },
                  pattern: {
                    value: /^[0-9]{5}(-[0-9]{4})?$/,
                    message: t('invalidZipCode'),
                  },
                })}
                error={!!errors.zip || !!zipError}
                helperText={zipError || (errors.zip?.message === t('invalidZipCode') ? t('invalidZipCodeHelpertext') : '')}
                inputProps={{
                  inputMode: 'numeric',
                  onKeyPress: handleZipKeyPress,
                }}
              />
            </Grid>
          </Grid>
          <Box mt={1} className='addr-note'>
            <Checkbox {...register('military')} />
            <Typography variant="body1" className='addr-note-text'>{t('isMilitary')}</Typography>
          </Box>
          <Box mt={1} className='addr-same-note'>
            <Box className='addr-same-note-in'>
              <Typography variant="body1" className='addr-note-text'>{t('isSameAsResidential')}<span style={{ color: 'Red' }}>*</span></Typography>
              <Checkbox
                checked={sameAddress === true}
                onChange={() => setSameAddress(true)}
              />
              <Typography variant="body1" className='addr-note-text'>{t('yesLabel')}</Typography>
              <Checkbox
                checked={sameAddress === false}
                onChange={() => setSameAddress(false)}
              />
              <Typography variant="body1" className='addr-note-text'>{t('noLabel')}</Typography>
            </Box>
            {(display === true && (sameAddress === null || sameAddress === undefined)) && (
              <FormHelperText className='addr-error' error>{t('isSameAsResidentialHelpertext')}</FormHelperText>
            )}
          </Box>
          {sameAddress === false && (
            <React.Fragment>
              <Box className='addr-mail-heading'>
                <Typography variant="h5" className='addr-mail-heading-text'>{t('addressDetailsHeader2')}</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="add-detail"
                    variant="outlined"
                    label={typeof errors.mStreetNumber?.message === 'string' ? errors.mStreetNumber.message : <span>{t('streetNumber')}<span style={{ color: 'Red' }}>*</span></span>}
                    defaultValue={address?.mStreetNumber}
                    {...register('mStreetNumber', {
                      required: {
                        value: true,
                        message: t('streetNumberRequired'),
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
                    label={typeof errors.mStreetName?.message === 'string' ? errors.mStreetName.message : <span>{t('streetName')}<span style={{ color: 'Red' }}>*</span></span>}
                    defaultValue={address?.mStreetName}
                    {...register('mStreetName', {
                      required: {
                        value: true,
                        message: t('streetNameRequired'),
                      },
                    })}
                    error={!!errors.mStreetName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="add-detail"
                    variant="outlined"
                    label={t('apartmentUnit')}
                    defaultValue={address?.mApartUnit}
                    {...register('mApartUnit')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="add-detail"
                    variant="outlined"
                    label={typeof errors.mTown?.message === 'string' ? errors.mTown.message : <span>{t('city')}<span style={{ color: 'Red' }}>*</span></span>}
                    defaultValue={address?.mTown}
                    {...register('mTown', {
                      required: {
                        value: true,
                        message: t('cityRequired'),
                      },
                    })}
                    error={!!errors.mTown}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="add-detail"
                    variant="outlined"
                    label={typeof errors.mState?.message === 'string' ? errors.mState.message : <span>{t('state')}<span style={{ color: 'Red' }}>*</span></span>}
                    defaultValue={address?.mState}
                    {...register('mState', {
                      required: {
                        value: true,
                        message: t('stateRequired'),
                      },
                    })}
                    error={!!errors.mState}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="add-detail"
                    variant="outlined"
                    label={typeof errors.mZip?.message === 'string' ? errors.mZip.message : <span>{t('zipCode')}<span style={{ color: 'Red' }}>*</span></span>}
                    defaultValue={address?.mZip}
                    {...register('mZip', {
                      required: {
                        value: true,
                        message: t('zipCodeRequired'),
                      },
                      pattern: {
                        value: /^[0-9]{5}(-[0-9]{4})?$/,
                        message: t('invalidZipCode'),
                      },
                    })}
                    error={!!errors.mZip || !!mZipError}
                    helperText={mZipError || (errors.mZip?.message === t('invalidZipCode') ? t('invalidZipCodeHelpertext') : '')}
                    inputProps={{
                      inputMode: 'numeric',
                      onKeyPress: handleMZipKeyPress,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl variant='outlined' fullWidth error={!!errors.mCountry} className='add-detail'>
                    <InputLabel id="mCountry-label">{errors.mCountry ? t('countryRequired') : <span>{t('country')}<span style={{ color: 'Red' }}>*</span></span>}</InputLabel>
                    <Controller
                      name='mCountry'
                      control={control}
                      rules={{ required: t('countryRequired') }}
                      defaultValue={address?.mCountry}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label={typeof errors.mCountry?.message === 'string' ? errors.mCountry.message : <span>{t('country')}<span style={{ color: 'Red' }}>*</span></span>}
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
                    {errors.mCountry && <FormHelperText error>{t('countryRequired')}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </FormGroup>
        <Box mt={2}>
          <Button variant="contained" onClick={handleBackAddress} className="back-button">{t('backButton')}</Button>
          <Button variant="contained" color="primary" type="submit" >{t('nextButton')}</Button>
        </Box>
      </FormControl>
    </form>
  );
};

export default Address;
