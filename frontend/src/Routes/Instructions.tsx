import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../Styles/Instructions.css';

const Instructions = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/step/0');
  }
  return (
    <Container className='inst-container'>
      <Box my={4} className='inst-box'>
        <Typography variant="h4" gutterBottom className='inst-header'>
          Instructions and Conditions
        </Typography>
        <Typography variant="body1" gutterBottom className='inst-subheader'>
          Please read the following instructions and conditions carefully before proceeding with your voter registration:
        </Typography>
        <List className='inst-list'>
          <ListItem className='inst-listitem'>
            <ListItemText primary="1. To Register online you must have the valid driving license."/>
            <ListItemText primary="2. You must be a citizen of United States of America to register to vote." />
            <ListItemText primary="3. You must be a resident of the state you are registering in." />
            <ListItemText primary="4. You must be at least 18 years old on or before election date to register to vote." />
            <ListItemText primary="5. You must not be a convicted felon or declared mentally incompetent by a court of law." />
            <ListItemText primary="6. You must not claim the right to vote in any other state." />
            <ListItemText primary="7. Fill all the required fields in the registration process." />
            <ListItemText primary="8. You are not voter untill your registration application is approved by the registration office." />
          </ListItem>
        </List>
        <Typography variant="body1" gutterBottom className='inst-subheader'>
          By proceeding, you agree to the conditions and confirm that all the information you provide is accurate to the best of your knowledge.
        </Typography>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleNext}>
            I Agree and Continue
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Instructions;
