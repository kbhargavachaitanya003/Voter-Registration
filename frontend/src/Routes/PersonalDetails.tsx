import React from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const PersonalDetails = () => {
  const navigate = useNavigate();

  const handleBackPersonalDetails = () => {
    navigate('/');
  }

  const handleNextPersonalDetails = () => {
    navigate('/consent');
  }

  return (
    <div>
      <h1>Person Details</h1>
      <Box mt={2}>
        <Button onClick={handleBackPersonalDetails}>Back</Button>
        <Button variant="contained" color="primary" onClick={handleNextPersonalDetails}>
          Next
        </Button>
      </Box>
    </div>
  )
}

export default PersonalDetails
