import React, { useState } from 'react';
import { Box, Button, TextField, FormControl, FormGroup, Grid, Typography, Select, MenuItem, InputLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { PersonalDetailsData } from '../Components/types';
import useStore from '../Store/Store';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { checkDrivingLicense } from '../Components/api';
import { useTranslation } from 'react-i18next';
import '../Styles/PersonalDetails.css';

interface PersonalDetailsProps {
  handleNext: () => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ handleNext }) => {
  const { register, handleSubmit, formState, control, setError, clearErrors } = useForm<PersonalDetailsData>();
  const { errors } = formState;
  const navigate = useNavigate();
  const setPersonalDetails = useStore(state => state.setPersonalDetails);
  const personalDetails = useStore(state => state.personalDetails);
  const address = useStore(state => state.address);
  const setAddress = useStore(state => state.setAddress);
  const setReferenceNumber = useStore(state => state.setReferenceNumber);
  const setEligibilityAndType = useStore(state => state.setEligibilityAndType);
  const eligibilityAndType = useStore(state => state.eligibilityAndType);
  const [licenseError, setLicenseError] = useState('');
  const [ssnError, setSsnError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const mutationCheckDrivingLicense = useMutation({
    mutationFn: checkDrivingLicense,
    onError: (error) => {
      console.error(error);
    }
  });

  const handleBackPersonalDetails = () => {
    navigate('/type');
  };

  const handleNextPersonalDetails = () => {
    navigate('../consent');
  };

  const handleNextPersonalDetailsSsn = () => {
    navigate('/step/1');
    handleNext();
  }

  const generateTenDigitNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000);
  }

  const onSubmit = async (personalData: PersonalDetailsData) => {
    setIsSubmitting(true);
    const today = dayjs();
    const birthDate = dayjs(personalData.dob);
    console.log(eligibilityAndType);

    if (birthDate.isAfter(today)) {
      setError('dob', {
        type: 'manual',
        message: t('invalidDate')
      });
      setIsSubmitting(false);
      return;
    }

    const age = today.diff(birthDate, 'year');

    if (age < 17) {
      setError('dob', {
        type: 'manual',
        message: t('invalidAge')
      });
      setIsSubmitting(false);
    } else {
      clearErrors('dob');
      const formattedDate = birthDate.format('MM/DD/YYYY');
      personalData.dob = formattedDate;
      if (eligibilityAndType?.typeOfRegistration === 'ssn') {
        personalData.dl = 0;
      }
      setPersonalDetails(personalData);
      const rNumber = generateTenDigitNumber();
      console.log(rNumber);
      console.log(personalData);
      setReferenceNumber(rNumber);
      if (personalData.dl !== undefined && eligibilityAndType?.typeOfRegistration === 'driving license') {
        const data = await mutationCheckDrivingLicense.mutateAsync(personalData.dl);
        if (data === 'Yes') {
          const updatedAddress = {
            ...address,
            city: personalData.town
          }
          setAddress(updatedAddress);
          setIsSubmitting(false);
          handleNextPersonalDetails();
          console.log('api call success')
        } else if (data === 'No') {
          setIsSubmitting(false);
          setOpenDialog(true);
        } else {
          setIsSubmitting(false);
          console.log('Error');
        }
      } else if (eligibilityAndType?.typeOfRegistration === 'ssn') {
        setIsSubmitting(false);
        const updatedAddress = {
          ...address,
          city: personalData.town
        }
        setAddress(updatedAddress);
        handleNextPersonalDetailsSsn();
        console.log('no api call');
      }
    }
  };

  const handleLicenseKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
      setLicenseError(t('onlyNumbers'));
    } else {
      setLicenseError('');
    }
  };

  const handlessnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
      setSsnError(t('onlyNumbers'));
    } else {
      setSsnError('');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleRegisterUsingSsn = () => {
    const updatedTypeOfRegistration = {
      ...eligibilityAndType,
      typeOfRegistration: 'ssn',
      isCitizen: true,
      isAge: true,
      isResident: true,
      isFelony: true
    }
    setEligibilityAndType(updatedTypeOfRegistration);
    handleCloseDialog();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className='per-form'>
        <FormControl fullWidth>
          <FormGroup>
            <Typography variant='h5' className='per-header'>{t('personalDetailsHeader1')}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} className='changeType-grid'>
                <FormControl variant='outlined' fullWidth error={!!errors.voterType} className='per-detail-changeType'>
                  <InputLabel id="voterType-label">{errors.voterType?.message || <span>{t('typeOfVoter')}<span style={{ color: 'Red' }}>*</span></span>}</InputLabel>
                  <Controller
                    name='voterType'
                    control={control}
                    rules={{ required: t('typeOfVoterRequired') }}
                    defaultValue={personalDetails?.voterType || ''}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label={errors.voterType?.message || t('typeOfVoter')}
                      >
                        <MenuItem value='N'>New Voter Registration</MenuItem>
                        <MenuItem value='C'>Change Voter Registration</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  label={errors.town?.message || <span>{t('currentTownOfResidence')}<span style={{ color: 'Red' }}>*</span></span>}
                  className='per-detail'
                  defaultValue={personalDetails?.town || ''}
                  {...register('town', {
                    required: {
                      value: true,
                      message: t('currentTownOfResidenceRequired')
                    }
                  })}
                  error={!!errors.town}
                />
              </Grid>
            </Grid>
            <Typography variant='h5' className='per-header'>{t('personalDetailsHeader2')}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} className='changeType-grid'>
                <FormControl variant='outlined' fullWidth className='per-detail-changeType'>
                  <InputLabel id="prefix-label">{t('prefix')}</InputLabel>
                  <Controller
                    name='prefix'
                    control={control}
                    defaultValue={personalDetails?.prefix || ''}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label='prefix'
                      >
                        <MenuItem value='Mr'>Mr</MenuItem>
                        <MenuItem value='Mrs'>Mrs</MenuItem>
                        <MenuItem value='Miss'>Miss</MenuItem>
                        <MenuItem value='Ms'>Ms</MenuItem>
                        <MenuItem value='Dr'>Dr</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  className='per-detail'
                  defaultValue={personalDetails?.firstName || ''}
                  label={errors.firstName?.message || <span>{t('firstName')}<span style={{ color: 'Red' }}>*</span></span>}
                  {...register('firstName', {
                    required: {
                      value: true,
                      message: t('firstNameRequired')
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
                  label={errors.lastName?.message || <span>{t('lastName')}<span style={{ color: 'Red' }}>*</span></span>}
                  {...register('lastName', {
                    required: {
                      value: true,
                      message: t('lastNameRequired')
                    }
                  })}
                  error={!!errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  className='per-detail'
                  label={t('middleName')}
                  defaultValue={personalDetails?.middleName || ''}
                  {...register('middleName')}
                />
              </Grid>
              <Grid item xs={12} sm={6} className='changeType-grid'>
                <FormControl variant='outlined' fullWidth className='per-detail-changeType'>
                  <InputLabel id="prefix-label">{t('suffix')}</InputLabel>
                  <Controller
                    name='suffix'
                    control={control}
                    defaultValue={personalDetails?.suffix || ''}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label={t('suffix')}
                      >
                        <MenuItem value='Sr'>Sr</MenuItem>
                        <MenuItem value='Jr'>Jr</MenuItem>
                        <MenuItem value='I'>I</MenuItem>
                        <MenuItem value='II'>II</MenuItem>
                        <MenuItem value='III'>III</MenuItem>
                        <MenuItem value='IV'>IV</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name='dob'
                    control={control}
                    defaultValue={personalDetails?.dob ? dayjs(personalDetails.dob) : null}
                    rules={{ required: t('dateOfBirthRequired') }}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label={typeof errors.dob?.message === 'string' ? errors.dob.message : <span>{t('dateOfBirth')}<span style={{ color: 'Red' }}>*</span></span>}
                        value={field.value || null}
                        onChange={(date) => field.onChange(date)}
                        slotProps={{
                          textField: {
                            className: 'per-detail',
                            error: !!errors.dob,
                            helperText: errors.dob?.message === t('invalidAge') ? t('invalidAgeHelpertext') : (errors.dob?.message === t('invalidDate') ? t('invalidDateHelpertext') : '')
                          }
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              {eligibilityAndType?.typeOfRegistration === 'driving license' && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={errors.dl?.message || <span>{t('drivingLicense')}<span style={{ color: 'Red' }}>*</span></span>}
                    variant='outlined'
                    className='per-detail'
                    defaultValue={personalDetails?.dl || ''}
                    {...register('dl', {
                      required: {
                        value: true,
                        message: t('drivingLicenseRequired')
                      },
                      pattern: {
                        value: /^[0-9]{9}$/,
                        message: t('invalidDrivingLicense')
                      }
                    })}
                    error={!!errors.dl || !!licenseError}
                    helperText={licenseError || (errors.dl?.message === t('invalidDrivingLicense') ? t('invalidDrivingLicenseHelpertext') : '')}
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      onKeyPress: handleLicenseKeyPress
                    }}
                  />
                </Grid>
              )}
              {eligibilityAndType?.typeOfRegistration === 'ssn' && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={errors.ssn?.message || <span>{t('ssn')}<span style={{ color: 'Red' }}>*</span></span>}
                    variant='outlined'
                    className='per-detail'
                    defaultValue={personalDetails?.ssn || ''}
                    {...register('ssn', {
                      required: {
                        value: true,
                        message: t('ssnRequired')
                      },
                      pattern: {
                        value: /^[0-9]{4}$/,
                        message: t('invalidSSN')
                      }
                    })}
                    error={!!errors.ssn || !!ssnError}
                    helperText={ssnError || (errors.ssn?.message === t('invalidSSN') ? t('invalidSSNHelpertext') : t('ssnHelpertext'))}
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      onKeyPress: handlessnKeyPress
                    }}
                  />
                </Grid>
              )}
            </Grid>
            <Box mt={2} className='person-button-box'>
              <Button onClick={handleBackPersonalDetails}>{t('backButton')}</Button>
              <Button variant='contained' color='primary' type='submit'>
                {isSubmitting ? <CircularProgress size={24} /> : t('nextButton')}
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
        <DialogTitle id="alert-dialog-title">{t('personalDetailsDialogHeading')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{t('personalDetailsDialogText')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRegisterUsingSsn} color='primary'>{t('personalDetailsDialogButton')}</Button>
          <Button onClick={handleCloseDialog} color="primary">{t('okButton')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default PersonalDetails;
