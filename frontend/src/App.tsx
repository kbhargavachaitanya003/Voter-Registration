import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import VoterRegistration from './Routes/VoterRegistration';
import { Typography } from '@mui/material';
import Instructions from './Routes/Instructions';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="header-container">
          <Typography  className='header'>Voter Registration</Typography>
        </div>
        <Routes>
          <Route path="/" element={<Instructions />} />
          <Route path="/*" element={<VoterRegistration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
