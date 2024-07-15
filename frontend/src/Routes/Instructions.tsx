import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../Styles/Instructions.css';

const Instructions = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNext = () => {
    navigate('/type');
  }
  
  return (
    <Container className='inst-container'>
      <Box my={4} className='inst-box'>
        <Typography variant="h4" gutterBottom className='inst-header'>{t('instructionsHeadering')}</Typography>
        <Typography variant="body1" gutterBottom className='inst-subheader'>{t('instructionsSubheading1')}</Typography>
        <List className='inst-list'>
          <ListItem className='inst-listitem'>
            <ListItemText primary={t('instructionsPoint1')}/>
            <ListItemText primary={t('instructionsPoint2')} />
            <ListItemText primary={t('instructionsPoint3')} />
            <ListItemText primary={t('instructionsPoint4')} />
            <ListItemText primary={t('instructionsPoint5')} />
            <ListItemText primary={t('instructionsPoint6')} />
            <ListItemText primary={t('instructionsPoint7')} />
            <ListItemText primary={t('instructionsPoint8')} />
          </ListItem>
        </List>
        <Typography variant="body1" gutterBottom className='inst-subheader'>{t('instructionsSubheading2')}</Typography>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleNext}>{t('instructionsButton')}</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Instructions;
