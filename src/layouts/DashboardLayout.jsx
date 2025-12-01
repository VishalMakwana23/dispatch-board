import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import RoutesPanel from '../components/RoutesPanel';
import Topbar from '../components/Topbar';
import StatsFooter from '../components/StatsFooter';

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Topbar />
      <RoutesPanel />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'hidden',
          marginLeft: '410px', // Sidebar (60) + RoutesPanel (350)
          paddingTop: '64px', // Topbar height
          position: 'relative',
        }}
      >
        {children}
        <StatsFooter />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
