import React from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface OtherDetailsProps {
  handleNext: () => void
  handleBack: () => void
}

const OtherDetails: React.FC<OtherDetailsProps> = ({ handleBack, handleNext }) => {
  const navigate = useNavigate();

  const handleBackOtherDetails = () => {
    navigate('/step/1');
    handleBack();
  }

  const handleNextOtherDetails = () => {
    navigate('/step/3');
    handleNext();
  }
  return (
    <div>
      <h1>Other Details</h1>
      <Box mt={2}>
        <Button onClick={handleBackOtherDetails}>Back</Button>
        <Button variant="contained" color="primary" onClick={handleNextOtherDetails}>
          Next
        </Button>
      </Box>
    </div>
  )
}

export default OtherDetails
