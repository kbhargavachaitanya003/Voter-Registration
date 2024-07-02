import React, { useRef, useState } from 'react';
import { Box, Button, Container, Typography, Grid, CircularProgress, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useStore from '../Store/Store';
import ReactToPrint from 'react-to-print';
import '../Styles/Submission.css';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const sendEmail = async (emailData: any) => {
  const response = await axios.post('http://localhost:8080/api/sendMail', emailData);
  return response.data;
};

const Submission: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const personalDetails = useStore(state => state.personalDetails);
  const address = useStore(state => state.address);
  const otherDetails = useStore(state => state.otherDetails);
  const submittedDate = useStore(state => state.submittedDate);
  const submittedTime = useStore(state => state.submittedTime);
  const referenceNumber = useStore(state => state.referenceNumber);
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const mutation = useMutation({
    mutationFn: sendEmail,
    onSuccess: () => {
      setIsLoading(false);
      setSnackbarMessage('Email sent successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    },
    onError: () => {
      setIsLoading(false);
      setSnackbarMessage('Error sending email');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  });

  const handleEmail = () => {
    if (!otherDetails?.email) {
      setOpenDialog(true);
      return;
    }

    const EmailContent = `
      <h2>Confirmation</h2>
      <h4>Information</h4>
      <p>Reference Number: ${referenceNumber}</p>
      <p>Application Submitted on: ${submittedDate}, ${submittedTime}</p>
      <p>Name: ${personalDetails?.prefix} ${personalDetails?.firstName} ${personalDetails?.middleName} ${personalDetails?.lastName} ${personalDetails?.suffix}</p>
      <p>Date of Birth: ${personalDetails?.dob}</p>
      <p>Phone Number: ${otherDetails?.mobile}</p>
      <p>Gender: ${otherDetails?.gender}</p>
      <p>Email: ${otherDetails?.email}</p>
      <p>Party: ${otherDetails?.partyName}</p>
      <p>Residence Address: ${address?.streetNumber} ${address?.streetName}, ${address?.city} ${address?.state}-${address?.zip}, US</p>
      <p>Mailing Address: ${address?.mStreetNumber} ${address?.mStreetName}, ${address?.mTown} ${address?.mState}-${address?.mZip}, ${address?.mCountry}</p>
      <h4>Note</h4>
      <p>Thank you for choosing our platform for voter registration. Your application has been recorded. You should receive a confirmation within a month. If you do not receive the confirmation, please contact your nearest registration office.</p>
    `;

    setIsLoading(true);
    mutation.mutate({
      to: otherDetails?.email,
      subject: 'Online Voter Registration',
      htmlContent: EmailContent
    });
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Container className='conf-container'>
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
          <Button variant='contained' color='primary' onClick={handleEmail} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Email'}
          </Button>
          <ReactToPrint
            trigger={() => <Button variant="contained" color="primary">Print Confirmation</Button>}
            content={() => componentRef.current}
            documentTitle='Voter Registration Confirmation'
            pageStyle="print"
          />
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Email Not Provided"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You haven't provided your email details. So, we cannot send the email.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Submission;
