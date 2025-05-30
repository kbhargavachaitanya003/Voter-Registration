import React, { useState } from 'react'
import { Box, Button, Grid, List, ListItem, Typography, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import useStore from '../Store/Store'
import dayjs from 'dayjs'
import '../Styles/Summary.css'
import { useTranslation } from 'react-i18next'
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const mutationPersonalDetails = useMutation({mutationFn: savePersonalDetails});
  const mutationAddress = useMutation({mutationFn: saveAddress});
  const mutationSignatureDetails = useMutation({mutationFn: saveSignatureDetails});

  const handleNextSummary = async () => {
    setIsSubmitting(true);
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
    setIsSubmitting(false);
    navigate('/submitted');
    handleNext();
  };

  const handleBackSummary = () => {
    navigate('/step/2');
    handleBack();
  };

  return (
    <div>
      <Typography variant="h4" className='pre-header'>{t('summaryHeader')}</Typography>
      <Typography variant="h5" className='pre-sub-header'>{t('summarySubHeader1')}</Typography>
      <Grid container spacing={2} className='pre-details'>
        <Grid item xs={12} sm={6} className='pre-detail'>
          <Typography variant='body1' className='detail-header'>{t('summaryName')}</Typography>
          <Typography variant='body1' className='detail-colon'> :</Typography> 
          <Typography variant='body1' className='pre-detail-text'> {personalDetails?.prefix} {personalDetails?.firstName} {personalDetails?.middleName} {personalDetails?.lastName} {personalDetails?.suffix}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className='pre-detail'>
          <Typography variant='body1' className='detail-header'>{t('summaryResidenceAddress')}</Typography>
          <Typography variant='body1' className='detail-colon'>: </Typography> 
          <Typography variant='body1' className='pre-detail-text'>{address?.streetNumber} {address?.streetName}, {address?.city} {address?.state}-{address?.zip}, US</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className='pre-detail'>
          <Typography variant='body1' className='detail-header'>{t('summaryDateOfBirth')}</Typography>
          <Typography variant='body1' className='detail-colon'>: </Typography> 
          <Typography variant='body1' className='pre-detail-text'>{personalDetails?.dob}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className='pre-detail'>
          <Typography variant='body1' className='detail-header'>{t('summaryMailingAddress')}</Typography>
          <Typography variant='body1' className='detail-colon'>: </Typography> 
          <Typography variant='body1' className='pre-detail-text'>{address?.mStreetNumber} {address?.mStreetName}, {address?.mTown} {address?.mState}-{address?.mZip}, {address?.mCountry}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className='pre-detail'>
          <Typography variant='body1' className='detail-header'>{t('summaryParty')}</Typography>
          <Typography variant='body1' className='detail-colon'>: </Typography> 
          <Typography variant='body1' className='pre-detail-text'>{otherDetails?.partyName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className='pre-detail'>
          <Typography variant='body1' className='detail-header'>{t('summaryPhoneNumber')}</Typography>
          <Typography variant='body1' className='detail-colon'>: </Typography> 
          <Typography variant='body1' className='pre-detail-text'>{otherDetails?.mobile}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className='pre-detail'>
          <Typography variant='body1' className='detail-header'>{t('summaryGender')}</Typography>
          <Typography variant='body1' className='detail-colon'>: </Typography> 
          <Typography variant='body1' className='pre-detail-text'>{otherDetails?.gender}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className='pre-detail'>
          <Typography variant='body1' className='detail-header'>{t('summaryEmail')}</Typography>
          <Typography variant='body1' className='detail-colon'>: </Typography> 
          <Typography variant='body1' className='pre-detail-text'>{otherDetails?.email}</Typography>
        </Grid>
      </Grid>
      <Typography variant="h5" className='pre-sub-header-condition'>{t('summarySubHeader2')}</Typography>
      <List sx={{ listStyleType: 'disc'}}>
        <ListItem className='pre-condition'>{t('summaryCondition1')}</ListItem>
        <ListItem className='pre-condition'>{t('summaryCondition2')}</ListItem>
        <ListItem className='pre-condition'>{t('summaryCondition3')}</ListItem>
        <ListItem className='pre-condition'>{t('summaryCondition4')}</ListItem>
        <ListItem className='pre-condition'>{t('summaryCondition5')}</ListItem>
      </List>
      <Box mt={2}>
        <Button onClick={handleBackSummary}>{t('backButton')}</Button>
        <Button variant="contained" color="primary" onClick={handleNextSummary}>
          {isSubmitting ? <CircularProgress size={24} /> : t('summaryButton')}
        </Button>
      </Box>
    </div>
  )
}

export default Summary
