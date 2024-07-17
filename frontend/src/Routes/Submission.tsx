import React, { useRef, useState } from 'react';
import { Box, Button, Container, Typography, Grid, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useStore from '../Store/Store';
import ReactToPrint from 'react-to-print';
import '../Styles/Submission.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { sendEmail, getFile } from '../Components/api';
import { useTranslation } from 'react-i18next';

const Submission: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const personalDetails = useStore(state => state.personalDetails);
  const address = useStore(state => state.address);
  const otherDetails = useStore(state => state.otherDetails);
  const submittedDate = useStore(state => state.submittedDate);
  const submittedTime = useStore(state => state.submittedTime);
  const referenceNumber = useStore(state => state.referenceNumber);
  const eligibilityAndType = useStore(state => state.eligibilityAndType);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const { data: pdfBlob, isLoading: isFetchingFile, isError, error } = useQuery({
    queryKey: ['getFile', referenceNumber],
    queryFn: () => getFile(referenceNumber as number)
  });

  const mutation = useMutation({
    mutationFn: sendEmail,
    onSuccess: () => {
      setIsLoading(false);
      setSnackbarMessage(t('emailSuccess'));
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    },
    onError: () => {
      setIsLoading(false);
      setSnackbarMessage(t('emailError'));
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  });

  const handleEmail = () => {
    if (!otherDetails?.email) {
      return;
    }

    const EmailContent = `
      ${eligibilityAndType?.typeOfRegistration === "ssn" ? `<p>Please find the attached Voter Registration Application below.</p>` : ``}
      <h2>Confirmation</h2>
      <h4>Information</h4> 
      <p>Reference Number: ${referenceNumber}</p>
      <p>Application Submitted on: ${submittedDate}, ${submittedTime}</p>
      <p>Name: ${personalDetails?.prefix} ${personalDetails?.firstName} ${personalDetails?.middleName} ${personalDetails?.lastName} ${personalDetails?.suffix}</p>
      <p>Phone Number: ${otherDetails?.mobile}</p>
      <p>Gender: ${otherDetails?.gender}</p>
      <p>Email: ${otherDetails?.email}</p>
      <h4>Note</h4>
      ${eligibilityAndType?.typeOfRegistration === "ssn" ? `<p>Thank you for choosing our platform for voter registration. Your application has been recorded. Please take the print out of the application and reach out to the nearest registration office for the further process of voter registration.</p>` : `Thank you for choosing our platform for voter registration. Your application has been recorded. You should receive a confirmation within a month. If you do not receive the confirmation, please contact your nearest registration office.`}
    `;

    setIsLoading(true);
    mutation.mutate({
      to: otherDetails?.email,
      subject: 'Online Voter Registration',
      htmlContent: EmailContent,
      type: eligibilityAndType?.typeOfRegistration,
      referenceNumber: referenceNumber
    });
  };

  const handlePrint = async () => { 
    try {
      const url = window.URL.createObjectURL(new Blob([pdfBlob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Online Voter Registration.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error('Error fetching or saving PDF:', error);
    }
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

  if (isError) {
    console.error('Error fetching PDF:', error);
    return <div>Error fetching PDF: {error.message}</div>;
  }

  return (
    <div>
      <Container className='conf-container'>
        <div ref={componentRef}>
          <Typography variant="h4" gutterBottom className='conf-header'>{t('submissionHeader')}</Typography>
          <Typography variant="h5" className='conf-sub-header'>{t('submissionSubHeader')}</Typography>
          <Grid container spacing={2} className='conf-details'>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>{t('submissionReferenceNumber')}</Typography>
              <Typography variant='body1' className='conf-detail-colon'> :</Typography>
              <Typography variant='body1' className='conf-detail-text'>{referenceNumber}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>{t('submissionSubmittedOn')}</Typography>
              <Typography variant='body1' className='conf-detail-colon'> :</Typography>
              <Typography variant='body1' className='conf-detail-text'>{submittedDate}, {submittedTime}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>{t('submissionName')}</Typography>
              <Typography variant='body1' className='conf-detail-colon'> :</Typography>
              <Typography variant='body1' className='conf-detail-text'>{personalDetails?.prefix} {personalDetails?.firstName} {personalDetails?.middleName} {personalDetails?.lastName} {personalDetails?.suffix}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>{t('submissionResidenceAddress')}</Typography>
              <Typography variant='body1' className='conf-detail-colon'>: </Typography>
              <Typography variant='body1' className='conf-detail-text'>{address?.streetNumber} {address?.streetName}, {address?.city} {address?.state}-{address?.zip}, US</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>{t('submissionDateOfBirth')}</Typography>
              <Typography variant='body1' className='conf-detail-colon'>: </Typography>
              <Typography variant='body1' className='conf-detail-text'>{personalDetails?.dob}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>{t('submissionMailingAddress')}</Typography>
              <Typography variant='body1' className='conf-detail-colon'>: </Typography>
              <Typography variant='body1' className='conf-detail-text'>{address?.mStreetNumber} {address?.mStreetName}, {address?.mTown} {address?.mState}-{address?.mZip}, {address?.mCountry}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>{t('submissionParty')}</Typography>
              <Typography variant='body1' className='conf-detail-colon'>: </Typography>
              <Typography variant='body1' className='conf-detail-text'>{otherDetails?.partyName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>{t('submissionPhoneNumber')}</Typography>
              <Typography variant='body1' className='conf-detail-colon'>: </Typography>
              <Typography variant='body1' className='conf-detail-text'>{otherDetails?.mobile}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>{t('submissionGender')}</Typography>
              <Typography variant='body1' className='conf-detail-colon'>: </Typography>
              <Typography variant='body1' className='conf-detail-text'>{otherDetails?.gender}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='conf-detail'>
              <Typography variant='body1' className='conf-detail-header'>{t('submissionEmail')}</Typography>
              <Typography variant='body1' className='conf-detail-colon'>: </Typography>
              <Typography variant='body1' className='conf-detail-text'>{otherDetails?.email}</Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" className='conf-sub-header'>{t('noteHeading')}</Typography>
          <Typography variant="body1" className='conf-note'>
            {eligibilityAndType?.typeOfRegistration === "ssn" ? t('noteTextDl') : t('noteTextSsn')}
          </Typography>
        </div>
        <Box mt={2} className='conf-buttons'>
          <Button variant="contained" color="primary" onClick={handleEmail} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : t('emailButton')}
          </Button>
          {eligibilityAndType?.typeOfRegistration !== "ssn" && <ReactToPrint
            trigger={() => <Button variant="contained" color="primary" className='conf-button'>{t('printConfirmationButton')}</Button>}
            content={() => componentRef.current}
          />}
          {eligibilityAndType?.typeOfRegistration === "ssn" && <Button variant="contained" color="primary" onClick={handlePrint}>
            {isFetchingFile ? <CircularProgress size={24} /> : t('downloadApplicationButton')}
          </Button>}
          <Button variant="contained" color="primary" onClick={handleClose}>{t('closeButton')}</Button>
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
    </div>
  );
};

export default Submission;
