import React from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface AddressProps {
  handleNext: () => void
  handleBack: () => void
}

const Address: React.FC<AddressProps> = ({ handleNext, handleBack }) => {
  const navigate = useNavigate()

  const handleBackAddress = () => {
    navigate('/consent');
    handleBack();
  }

  const handleNextAddress = () => {
    navigate('/step/2');
    handleNext();
  }

  return (
    <div>
      <h1>Address</h1>
      <Box mt={2}>
        <Button onClick={handleBackAddress}>Back</Button>
        <Button variant="contained" color="primary" onClick={handleNextAddress}>
          Next
        </Button>
      </Box>
    </div>
  )
}

export default Address
