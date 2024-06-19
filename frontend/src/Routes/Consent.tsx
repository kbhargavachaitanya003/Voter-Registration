import React from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface ConsentProps {
  handleNext: () => void
}

const Consent: React.FC<ConsentProps> = ({ handleNext }) => {
  const navigate = useNavigate()

  const handleBackConsent = () => {
    navigate('/step/0');
  }

  const handleNextConsent = () => {
    navigate('/step/1');
    handleNext();
  }

  return (
    <div>
      <h1>Consent</h1>
      <Box mt={2}>
        <Button onClick={handleBackConsent}>Back</Button>
        <Button variant="contained" color="primary" onClick={handleNextConsent}>
          Next
        </Button>
      </Box>
    </div>
  )
}

export default Consent
