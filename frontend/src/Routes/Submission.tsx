import React from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Submission = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  }
  
  return (
    <div>
      <h1>Submission</h1>
      <Box mt={2}>
        <Button >Print Conformation</Button>
        <Button variant="contained" color="primary" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </div>
  )
}

export default Submission
