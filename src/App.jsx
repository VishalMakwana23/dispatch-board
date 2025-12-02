import React from 'react';
import Dashboard from './pages/Dashboard';
import { CssBaseline } from '@mui/material';
import ChainOfDelayContainer from './components/ChainOfDelay';

function App() {
  return (
    <>
      <CssBaseline />
      <Dashboard />
      <ChainOfDelayContainer />
    </>
  );
}

export default App;
