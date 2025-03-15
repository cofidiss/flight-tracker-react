import React from 'react';
import Map from './components/Map/Map';
import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';

import SignUp from './components/SignUp/SignUp';

import Login from './components/Login/Login';
const App: React.FC = () => {
  console.log('App renderer');
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Map />} />
      </Routes>
    </div>
  );
};
export default App;
