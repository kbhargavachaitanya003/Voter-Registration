import React, { useRef } from 'react'
import { Box, Button, Container, Typography, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useStore from '../Store/Store'
import ReactToPrint from 'react-to-print'
import '../Styles/Submission.css'

const Submission: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const personalDetails = useStore(state => state.personalDetails)
  const address = useStore(state => state.address)
  const otherDetails = useStore(state => state.otherDetails)
  const submittedDate = useStore(state => state.submittedDate)
  const submittedTime = useStore(state => state.submittedTime)
  const referenceNumber = useStore(state => state.referenceNumber)
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  }

  return (
    <div>
      <Container className='conf-container' >
        <div ref={componentRef}>
          <Typography variant="h4" gutterBottom className='conf-header'>
            Confirmation
          </Typography>
          <Typography variant="h5" className='conf-sub-header'>Information</Typography>
          <Grid container spacing={2} className='conf-details'>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>Reference Number</Typography>
              <Typography variant='body1' className='conf-detail-colon'> :</Typography>
              <Typography variant='body1' className='conf-detail-text'>{referenceNumber}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>Application Submitted on</Typography>
              <Typography variant='body1' className='conf-detail-colon'> :</Typography>
              <Typography variant='body1' className='conf-detail-text'>{submittedDate}, {submittedTime}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>Name</Typography>
              <Typography variant='body1' className='conf-detail-colon'> :</Typography>
              <Typography variant='body1' className='conf-detail-text'>{personalDetails?.prefix} {personalDetails?.firstName} {personalDetails?.middleName} {personalDetails?.lastName} {personalDetails?.suffix}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>Residence Address</Typography>
              <Typography variant='body1' className='conf-detail-colon'>: </Typography>
              <Typography variant='body1' className='conf-detail-text'>{address?.streetNumber} {address?.streetName}, {address?.city} {address?.state}-{address?.zip}, US</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>Date of Birth</Typography>
              <Typography variant='body1' className='conf-detail-colon'>: </Typography>
              <Typography variant='body1' className='conf-detail-text'>{personalDetails?.dob}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>Mailing Address</Typography>
              <Typography variant='body1' className='conf-detail-colon'>: </Typography>
              <Typography variant='body1' className='conf-detail-text'>{address?.mStreetNumber} {address?.mStreetName}, {address?.mTown} {address?.mState}-{address?.mZip}, {address?.mCountry}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>Party</Typography>
              <Typography variant='body1' className='conf-detail-colon'>: </Typography>
              <Typography variant='body1' className='conf-detail-text'>{otherDetails?.partyName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>Phone Number</Typography>
              <Typography variant='body1' className='conf-detail-colon'>: </Typography>
              <Typography variant='body1' className='conf-detail-text'>{otherDetails?.mobile}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>Gender</Typography>
              <Typography variant='body1' className='conf-detail-colon'>: </Typography>
              <Typography variant='body1' className='conf-detail-text'>{otherDetails?.gender}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>Email</Typography>
              <Typography variant='body1' className='conf-detail-colon'>: </Typography>
              <Typography variant='body1' className='conf-detail-text'>{otherDetails?.email}</Typography>
            </Grid>
          </Grid>
          <Typography variant="h5" className='conf-sub-header'>Note</Typography>
          <Typography variant="body1" className='conf-note'>Thank you for choosing our platform for voter registration. Your application has been recorded. You should receive a confirmation within a month. If you do not receive the confirmation, please contact your nearest registration office.</Typography>
        </div>
        <Box mt={2} className='conf-buttons'>
          <Button variant='contained' color='primary'>Email</Button>
          <ReactToPrint 
            trigger={() => <Button variant="contained" color="primary">Print Confirmation</Button> }
            content={() => componentRef.current }
            documentTitle='Voter Registration Confirmation' 
            pageStyle="print" 
          /> 
          {/* <Button onClick={() => componentRef.current && window.print()}>Print Confirmation</Button>*/}
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Container>
    </div>
  )
}

export default Submission
