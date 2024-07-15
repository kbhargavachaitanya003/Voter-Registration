import React from 'react';
import { Box, Button, FormControl, FormGroup, Typography, RadioGroup, Radio, FormControlLabel, TextField, FormHelperText, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../Styles/OtherDetails.css';
import useStore from '../Store/Store';
import { useTranslation } from 'react-i18next';

interface OtherDetailsProps {
  handleNext: () => void;
  handleBack: () => void;
}

const OtherDetails: React.FC<OtherDetailsProps> = ({ handleBack, handleNext }) => {
  const { register, handleSubmit, watch, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const [partyRadioValue, setPartyRadioValue] = React.useState('');
  const [isNextClicked, setIsNextClicked] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState('');
  const setOtherDetails = useStore(state => state.setOtherDetails);
  const otherDetails = useStore(state => state.otherDetails);
  const { t } = useTranslation();

  const handlePartyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartyRadioValue(event.target.value);
    if (isNextClicked) setIsNextClicked(false);
  };

  const handlePhoneKeyPress = (e: any) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
      setPhoneError(t('onlyNumbers'));
    } else {
      setPhoneError('');
    }
  };

  const handleBackOtherDetails = () => {
    navigate('/step/1');
    handleBack();
  };

  const handleNextOtherDetails = (data: any) => {
    if (partyRadioValue === '') {
      setIsNextClicked(true);
      return;
    }
    data.partyEnroll = partyRadioValue;
    setOtherDetails(data);
    console.log(data);
    navigate('/step/3');
    handleNext();
  };

  const onSubmit = (data: any) => {
    if(data.partyEnroll === 'no') {
      data.partyName = '';
    }
    handleNextOtherDetails(data);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='other-form'>
      <FormControl className='other-formcontrol'>
        <FormGroup>
          <Typography variant="h5" className='other-party-header'>{t('otherDetailsHeader1')}</Typography>
          <Typography variant="body1" className='other-party-text'>{t('partyText1')}<span style={{ color: 'Red' }}>*</span> {t('partyText2')}</Typography>
          <RadioGroup
            className='other-radio-group'
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            row
            value={partyRadioValue}
            onChange={handlePartyChange}
          >
            <FormControlLabel value="yes" control={<Radio />} label={t('partyYesLabel')} />
            <TextField
              disabled={partyRadioValue !== 'yes'}
              className='other-party-name'
              variant='outlined'
              label={errors.partyName ? t('partyNameRequired') : (
                <span>
                  {t('partyName')}
                  {partyRadioValue === 'yes' && <span style={{ color: 'Red' }}>*</span>}
                </span>
              )}              
              {...register('partyName', { required: partyRadioValue === 'yes' })}
              error={!!errors.partyName}
            />
            <FormControlLabel className='other-party-no' value="no" control={<Radio />} label={t('partyNoLabel')} />
          </RadioGroup>
          {isNextClicked && partyRadioValue === '' && (
            <FormHelperText className='other-helper'>{t('partyHelpertext')}</FormHelperText>
          )}
          <Typography variant="h5" className='other-addi-header'>{t('otherDetailsHeader2')}</Typography>
          <Grid container spacing={2} className='other-grid'>
            <Grid item xs={12} sm={6}>
              <TextField
                className='other-details'
                variant='outlined'
                defaultValue={otherDetails?.email || ''}
                label={typeof errors.email?.message === 'string' ? errors.email.message : t('email')}
                {...register('email', { pattern: { value: /^\S+@\S+$/i, message: t('invalidEmail') } })}
                error={!!errors.email}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className='other-details'
                variant='outlined'
                defaultValue={otherDetails?.mobile || ''}
                label={typeof errors.mobile?.message === 'string' ? errors.mobile.message : t('mobileNumber')}
                {...register('mobile', { pattern: { value: /^[0-9]{10}$/, message: t('invalidMobileNumber') } })}
                error={!!errors.mobile || !!phoneError}
                helperText={errors.mobile ? t('mobileNumberHelpertext') : phoneError}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  onKeyPress: handlePhoneKeyPress,
                }}
              />
            </Grid>
            <Grid item xs={12} className='other-gender'>
              <Typography variant="body1">{t('gender')}<span style={{ color: 'Red' }}>*</span>:</Typography>
              <RadioGroup
                row
                defaultValue={otherDetails?.gender || ''}
                className='other-gender-group'
                aria-labelledby="gender-radio-buttons-group"
                name="gender-radio-buttons-group"
                value={watch('gender') || ''}
              >
                <FormControlLabel value="male" control={<Radio {...register('gender', { required: 'Gender is required' })} />} label={t('male')} />
                <FormControlLabel value="female" control={<Radio {...register('gender', { required: 'Gender is required' })} />} label={t('female')} />
                <FormControlLabel value="other" control={<Radio {...register('gender', { required: 'Gender is required' })} />} label={t('other')} />
              </RadioGroup>
              {errors.gender && (
                <FormHelperText error>
                  {typeof errors.gender.message === 'string' ? errors.gender.message : ' '}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button onClick={handleBackOtherDetails}>{t('backButton')}</Button>
            <Button variant="contained" color="primary" type='submit'>
              {t('nextButton')}
            </Button>
          </Box>
        </FormGroup>
      </FormControl>
    </form>
  );
};

export default OtherDetails;
