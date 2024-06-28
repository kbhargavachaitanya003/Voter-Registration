import React from 'react'
import { Box, Button, Grid, List, ListItem, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useStore from '../Store/Store'
import dayjs from 'dayjs'
import '../Styles/Summary.css'
import axios from 'axios'

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
  const setSubmittedDate = useStore(state => state.setSubmittedDate)
  const setSubmittedTime = useStore(state => state.setSubmittedTime)
  const navigate = useNavigate();

  const savePersonalDetails = async (postingPersonalDetails: any) => {
    try {
      const { data } = await axios.post('http://localhost:8080/api/savePersonalDetails', postingPersonalDetails);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const saveResidenceAddress = async (postingResidenceAddress: any) => {
    try {
      const { data } = await axios.post('http://localhost:8080/api/saveResidenceAddress', postingResidenceAddress);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const saveMailingAddress = async (postingMailingAddress: any) => {
    try {
      const { data } = await axios.post('http://localhost:8080/api/saveMailingAddress', postingMailingAddress);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const saveSignatureDetails = async (postingSignatureDetails: any) => {
    try {
      const { data } = await axios.post('http://localhost:8080/api/saveSignatureDetails', postingSignatureDetails);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const handleNextSummary = () => {
    const today = dayjs().format('MM/DD/YYYY');
    const time = dayjs().format('hh:mm:ss A');
    console.log(time);
    setSubmittedDate(today);
    setSubmittedTime(time);
    const postingPersonalDetails = {
      referenceNumber: referenceNumber,
      registrationDate: today,
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
      moblieNumber: otherDetails?.mobile,
      party: otherDetails?.partyName
    }
    const postingResidenceAddress = {
      referenceNumber: referenceNumber,
      streetNumber: address?.streetNumber,
      streetName: address?.streetName,
      apartmentOrUnit: address?.apartUnit,
      cityOrTown: address?.city,
      state: address?.state,
      zip: address?.zip,
      country: 'US',
      inMilitary: address?.military
    }
    const postingMailingAddress = {
      referenceNumber: referenceNumber,
      streetNumber: address?.mStreetNumber,
      streetName: address?.mStreetName,
      apartmentOrUnit: address?.mApartUnit,
      cityOrTown: address?.mTown,
      state: address?.mState,
      zip: address?.mZip,
      country: address?.mCountry,
      inMilitary: address?.military
    }
    const postingSignatureDetails = {
      referenceNumber: referenceNumber,
      drivingLicense: personalDetails?.dl,
      signature: dlimage
    }
    const response =  savePersonalDetails(postingPersonalDetails);
    const response2 = saveResidenceAddress(postingResidenceAddress);
    const response3 = saveMailingAddress(postingMailingAddress);
    const response4 = saveSignatureDetails(postingSignatureDetails);
    console.log("response")
    console.log(response);
    navigate('/submitted');
    handleNext();
  }

  const handleBackSummary = () => {
    navigate('/step/2');
    handleBack();
  }
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
