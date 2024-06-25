import React from 'react';
import {
  Box, Button, FormControl, FormGroup, Typography, RadioGroup, Radio,
  FormControlLabel, TextField, FormHelperText, Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../Styles/OtherDetails.css';
import useStore from '../Store/Store';

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

  const handlePartyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartyRadioValue(event.target.value);
    if (isNextClicked) setIsNextClicked(false);
  };

  const handlePhoneKeyPress = (e: any) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
      setPhoneError('Only numbers are allowed');
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
    handleNextOtherDetails(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='other-form'>
      <FormControl className='other-formcontrol'>
        <FormGroup>
          <Typography variant="h5" className='other-party-header'>Party Enrollment</Typography>
          <Typography variant="body1" className='other-party-text'>Do you want to join any political party? If yes, please fill the party name below.</Typography>
          <RadioGroup
            className='other-radio-group'
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            row
            value={partyRadioValue}
            onChange={handlePartyChange}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes, I do." />
            <TextField
              disabled={partyRadioValue !== 'yes'}
              className='other-party-name'
              variant='outlined'
              label={errors.partyName ? 'Party Name is required' : 'Party Name*'}
              {...register('partyName', { required: partyRadioValue === 'yes' })}
              error={!!errors.partyName}
            />
            <FormControlLabel className='other-party-no' value="no" control={<Radio />} label="No, I don't want to join any political party." />
          </RadioGroup>
          {isNextClicked && partyRadioValue === '' && (
            <FormHelperText className='other-helper'>You Must Select an Option</FormHelperText>
          )}
          <Typography variant="h5" className='other-addi-header'>Additional Information</Typography>
          <Grid container spacing={2} className='other-grid'>
            <Grid item xs={12} sm={6}>
              <TextField
                className='other-details'
                variant='outlined'
                defaultValue={otherDetails?.email || ''}
                label={typeof errors.email?.message === 'string' ? errors.email.message : 'Email'}
                {...register('email', { pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                error={!!errors.email}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className='other-details'
                variant='outlined'
                defaultValue={otherDetails?.mobile || ''}
                label={typeof errors.mobile?.message === 'string' ? errors.mobile.message : 'Mobile Number'}
                {...register('mobile', { pattern: { value: /^[0-9]{10}$/, message: 'Invalid mobile number' } })}
                error={!!errors.mobile || !!phoneError}
                helperText={errors.mobile ? 'Mobile number must be 10 digit Number' : phoneError}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  onKeyPress: handlePhoneKeyPress,
                }}
              />
            </Grid>
            <Grid item xs={12} className='other-gender'>
              <Typography variant="body1">Gender:*</Typography>
              <RadioGroup
                row
                defaultValue={otherDetails?.gender || ''}
                className='other-gender-group'
                aria-labelledby="gender-radio-buttons-group"
                name="gender-radio-buttons-group"
                value={watch('gender') || ''}
              >
                <FormControlLabel value="male" control={<Radio {...register('gender', { required: 'Gender is required' })} />} label="Male" />
                <FormControlLabel value="female" control={<Radio {...register('gender', { required: 'Gender is required' })} />} label="Female" />
                <FormControlLabel value="other" control={<Radio {...register('gender', { required: 'Gender is required' })} />} label="Other" />
              </RadioGroup>
              {errors.gender && (
                <FormHelperText error>
                  {typeof errors.gender.message === 'string' ? errors.gender.message : ' '}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button onClick={handleBackOtherDetails}>Back</Button>
            <Button variant="contained" color="primary" type='submit'>
              Next
            </Button>
          </Box>
        </FormGroup>
      </FormControl>
    </form>
  );
};

export default OtherDetails;
