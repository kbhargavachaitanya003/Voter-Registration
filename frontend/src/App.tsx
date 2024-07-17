import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import VoterRegistration from './Routes/VoterRegistration';
import Instructions from './Routes/Instructions';
import RegistrationType from './Routes/EligibilityAndType';
import Submission from './Routes/Submission';
import { useTranslation } from 'react-i18next';
import { Select, MenuItem, Typography } from '@mui/material';

function App() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <div className="App">
      <Router>
        <div className="header-container">
          <Typography className='header'>{t('projectHeading')}</Typography>
            <Select
              value={language}
              size='small'
              className='language-select'
              onChange={(e) => changeLanguage(e.target.value as string)}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Español</MenuItem>
            </Select>
        </div>
        <Routes>
          <Route path="/" element={<Instructions />} />
          <Route path="/submitted" element={<Submission />} />
          <Route path="/type" element={<RegistrationType />} />
          <Route path="/step/*" element={<VoterRegistration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
