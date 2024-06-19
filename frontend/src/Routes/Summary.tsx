import React from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface SummaryProps {
  handleNext: () => void
  handleBack: () => void
}

const Summary: React.FC<SummaryProps> = ({ handleBack, handleNext }) => {
  const navigate = useNavigate()

  const handleNextSummary = () => {
    navigate('/submitted');
    handleNext();
  }

  const handleBackSummary = () => {
    navigate('/step/2');
    handleBack();
  }
  return (
    <div>
      <h1>Pre-View</h1>
      <Box mt={2}>
        <Button onClick={handleBackSummary}>Back</Button>
        <Button variant="contained" color="primary" onClick={handleNextSummary}>
          Next
        </Button>
      </Box>
    </div>
  )
}

export default Summary
