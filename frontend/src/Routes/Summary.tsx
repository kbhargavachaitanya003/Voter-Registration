import React from 'react'
import { Box, Button, Grid, List, ListItem, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import useStore from '../Store/Store'
import dayjs from 'dayjs'
import '../Styles/Summary.css'
import { savePersonalDetails, saveAddress, saveSignatureDetails } from '../Components/api'

interface SummaryProps {
  handleNext: () => void
  handleBack: () => void
}

const Summary: React.FC<SummaryProps> = ({ handleBack, handleNext }) => {
  const personalDetails = useStore(state => state.personalDetails)
  const address = useStore(state => state.address)
  const otherDetails = useStore(state => state.otherDetails)
  const referenceNumber = useStore(state => state.referenceNumber)
  const dlimage = useStore(state => state.dlimage)
  const eligibilityAndType = useStore(state => state.eligibilityAndType)
  const setSubmittedDate = useStore(state => state.setSubmittedDate)
  const setSubmittedTime = useStore(state => state.setSubmittedTime)
  const navigate = useNavigate();

  const mutationPersonalDetails = useMutation({mutationFn: savePersonalDetails});
  const mutationAddress = useMutation({mutationFn: saveAddress});
  const mutationSignatureDetails = useMutation({mutationFn: saveSignatureDetails});

  const handleNextSummary = async () => {
    const today = dayjs().format('MM/DD/YYYY');
    const time = dayjs().format('hh:mm:ss A');
    setSubmittedDate(today);
    setSubmittedTime(time);

    const postingPersonalDetails = {
      referenceNumber: referenceNumber,
      submittedOn: today +", " + time,
      typeOfRegistration: personalDetails?.voterType,
      drivingLicense: personalDetails?.dl,
      ssn: personalDetails?.ssn,
      prefix: personalDetails?.prefix,
      lastName: personalDetails?.lastName,
      firstName: personalDetails?.firstName,
      middleName: personalDetails?.middleName,
      suffix: personalDetails?.suffix,
      dateOfBirth: personalDetails?.dob,
      gender: otherDetails?.gender,
      email: otherDetails?.email,
      mobileNumber: otherDetails?.mobile,
      party: otherDetails?.partyName,
      isCitizen: eligibilityAndType?.isCitizen,
      isAge: eligibilityAndType?.isAge,
      isResident: eligibilityAndType?.isResident,
      isFelony: eligibilityAndType?.isFelony,
      isStored: false
    };

    const postingAddress = {
      referenceNumber: referenceNumber,
      streetNumber: address?.streetNumber,
      streetName: address?.streetName,
      apartmentOrUnit: address?.apartUnit,
      cityOrTown: address?.city,
      state: address?.state,
      zip: address?.zip,
      country: 'US',
      mailingStreetNumber: address?.mStreetNumber,
      mailingStreetName: address?.mStreetName,
      mailingApartmentOrUnit: address?.mApartUnit,
      mailingCityOrTown: address?.mTown,
      mailingState: address?.mState,
      mailingZip: address?.mZip,
      mailingCountry: address?.mCountry,
      inMilitary: address?.military
    };

    const postingSignatureDetails = {
      referenceNumber: referenceNumber,
      drivingLicense: personalDetails?.dl,
      signature: dlimage
    };

    await mutationPersonalDetails.mutateAsync(postingPersonalDetails);
    await mutationAddress.mutateAsync(postingAddress);
    await mutationSignatureDetails.mutateAsync(postingSignatureDetails);

    navigate('/submitted');
    handleNext();
  };

  const handleBackSummary = () => {
    navigate('/step/2');
    handleBack();
  };

  return (
    <div>
      <Typography variant="h4" className='pre-header'>Pre-View</Typography>
      <Typography variant="h5" className='pre-sub-header'>Information</Typography>
      <Grid container spacing={2} className='pre-details'>
        <Grid item xs={12} sm={6} className='pre-detail'>
          <Typography variant='body1' className='detail-header'>Name</Typography>
          <Typography variant='body1' className='detail-colon'> :</Typography> 
          <Typography variant='body1' className='pre-detail-text'> {personalDetails?.prefix} {personalDetails?.firstName} {personalDetails?.middleName} {personalDetails?.lastName} {personalDetails?.suffix}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className='pre-detail'>
          <Typography variant='body1' className='detail-header'>Residence Address</Typography>
          <Typography variant='body1' className='detail-colon'>: </Typography> 
          <Typography variant='body1' className='pre-detail-text'>{address?.streetNumber} {address?.streetName}, {address?.city} {address?.state}-{address?.zip}, US</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className='pre-detail'>
          <Typography variant='body1' className='detail-header'>Date of Birth</Typography>
          <Typography variant='body1' className='detail-colon'>: </Typography> 
          <Typography variant='body1' className='pre-detail-text'>{personalDetails?.dob}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className='pre-detail'>
          <Typography variant='body1' className='detail-header'>Mailing Address</Typography>
          <Typography variant='body1' className='detail-colon'>: </Typography> 
          <Typography variant='body1' className='pre-detail-text'>{address?.mStreetNumber} {address?.mStreetName}, {address?.mTown} {address?.mState}-{address?.mZip}, {address?.mCountry}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className='pre-detail'>
          <Typography variant='body1' className='detail-header'>Party</Typography>
          <Typography variant='body1' className='detail-colon'>: </Typography> 
          <Typography variant='body1' className='pre-detail-text'>{otherDetails?.partyName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className='pre-detail'>
          <Typography variant='body1' className='detail-header'>Phone Number</Typography>
          <Typography variant='body1' className='detail-colon'>: </Typography> 
          <Typography variant='body1' className='pre-detail-text'>{otherDetails?.mobile}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className='pre-detail'>
          <Typography variant='body1' className='detail-header'>Gender</Typography>
          <Typography variant='body1' className='detail-colon'>: </Typography> 
          <Typography variant='body1' className='pre-detail-text'>{otherDetails?.gender}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className='pre-detail'>
          <Typography variant='body1' className='detail-header'>Email</Typography>
          <Typography variant='body1' className='detail-colon'>: </Typography> 
          <Typography variant='body1' className='pre-detail-text'>{otherDetails?.email}</Typography>
        </Grid>
      </Grid>
      <Typography variant="h5" className='pre-sub-header-condition'>Conditions</Typography>
      <List sx={{ listStyleType: 'disc'}}>
        <ListItem className='pre-condition'>-I am a US Citizen.</ListItem>
        <ListItem className='pre-condition'>-I am a resident of the Address listed above.</ListItem>
        <ListItem className='pre-condition'>-I am at least 18 years old.</ListItem>
        <ListItem className='pre-condition'>-I am not a convicted felon.</ListItem>
        <ListItem className='pre-condition'>-The Information listed above is Correct.</ListItem>
      </List>
      <Box mt={2}>
        <Button onClick={handleBackSummary}>Back</Button>
        <Button variant="contained" color="primary" onClick={handleNextSummary}>
          Submit
        </Button>
      </Box>
    </div>
  )
}

export default Summary
