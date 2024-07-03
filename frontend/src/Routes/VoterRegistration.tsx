import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Container, StepContent, useMediaQuery, useTheme } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import PersonalDetails from './PersonalDetails';
import Address from './Address';
import OtherDetails from './OtherDetails';
import Summary from './Summary';
import Consent from './Consent';
import '../Styles/VoterRegistration.css'

const steps = [
  'Personal Details',
  'Address',
  'Other Details',
  'Submission'
];


const VoterRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PersonalDetails handleNext={handleNext}/>;
      case 1:
        return <Address handleBack={handleBack} handleNext={handleNext} />;
      case 2:
        return <OtherDetails handleBack={handleBack} handleNext={handleNext} />;
      case 3:
        return <Summary handleBack={handleBack} handleNext={handleNext} />;
      default:
        return null;
    }
  };

  return (
    <Container className='registration-container'>
      <Stepper
        activeStep={activeStep}
        orientation={isSmallScreen ? 'vertical' : 'horizontal'}
        alternativeLabel={isMediumScreen}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            {isSmallScreen && (
              <StepContent>
                <Routes>
                  <Route path="/step/:stepId" element={getStepContent(activeStep)} />
                  <Route path="/consent" element={<Consent handleNext={handleNext} />} />
                </Routes>
              </StepContent>
            )}
          </Step>
        ))}
      </Stepper>
      {!isSmallScreen && (
          <div>
            <Routes>
              <Route path="/step/:stepId" element={getStepContent(activeStep)} />
              <Route path="/consent" element={<Consent handleNext={handleNext} />} />
            </Routes>
          </div>
        )}
    </Container>
  );
};

export default VoterRegistration;
