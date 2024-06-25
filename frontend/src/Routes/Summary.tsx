import React from 'react'
import { Box, Button, Grid, List, ListItem, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useStore from '../Store/Store'
import dayjs from 'dayjs'
import '../Styles/Summary.css'

interface SummaryProps {
  handleNext: () => void
  handleBack: () => void
}

const Summary: React.FC<SummaryProps> = ({ handleBack, handleNext }) => {
  const personalDetails = useStore(state => state.personalDetails)
  const address = useStore(state => state.address)
  const otherDetails = useStore(state => state.otherDetails)
  const setSubmittedDate = useStore(state => state.setSubmittedDate)
  const setSubmittedTime = useStore(state => state.setSubmittedTime)
  const navigate = useNavigate();

  const handleNextSummary = () => {
    const today = dayjs().format('MM/DD/YYYY');
    const time = dayjs().format('hh:mm:ss A');
    console.log(time);
    setSubmittedDate(today);
    setSubmittedTime(time);
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
