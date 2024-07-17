import React, { useState } from 'react';
import { Box, Button, FormControl, FormGroup, Typography, RadioGroup, Radio, FormControlLabel, TextField, FormHelperText, Grid, Checkbox } from '@mui/material';
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
  const [partyRadioValue, setPartyRadioValue] = useState('');
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [selectedParty, setSelectedParty] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const setOtherDetails = useStore(state => state.setOtherDetails);
  const otherDetails = useStore(state => state.otherDetails);
  const { t } = useTranslation();

  const handlePartyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartyRadioValue(event.target.value);
    if (event.target.value !== 'yes') {
      setSelectedParty('');
    }
    if (isNextClicked) setIsNextClicked(false);
  };

  const handleCheckboxChange = (party: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedParty(party);
    } else {
      setSelectedParty('');
    }
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
    data.partyName = selectedParty || data.partyName;
    setOtherDetails(data);
    console.log(data);
    navigate('/step/3');
    handleNext();
  };

  const onSubmit = (data: any) => {
    if (data.partyEnroll === 'no') {
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
            <FormControlLabel
            className='other-party-republican'
            control={
              <Checkbox
                checked={selectedParty === 'Republican'}
                onChange={handleCheckboxChange('Republican')}
                disabled={partyRadioValue !== 'yes'}
              />
            }
            label= {t('republican')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedParty === 'Democratic'}
                onChange={handleCheckboxChange('Democratic')}
                disabled={partyRadioValue !== 'yes'}
              />
            }
            label= {t('democratic')}
          />
          <TextField
            disabled={partyRadioValue !== 'yes' || selectedParty === 'Republican' || selectedParty === 'Democratic'}
            className='other-party-name'
            variant='outlined'
            label={errors.partyName ? t('partyNameRequired') : (
              <span>
                {t('partyNameOther')}
                {(partyRadioValue === 'yes'&& selectedParty === '') && <span style={{ color: 'Red' }}>*</span>}
              </span>
            )}
            {...register('partyName', { required: partyRadioValue === 'yes' && selectedParty === '' })}
            error={!!errors.partyName}
            onChange={() => setSelectedParty('')}
          />
          <FormControlLabel value="no" control={<Radio />} label={t('partyNoLabel')} />
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
