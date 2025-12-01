import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import RoutesPanel from '../components/RoutesPanel';
import Topbar from '../components/Topbar';
import StatsFooter from '../components/StatsFooter';
import { routes } from '../mock/routes';

import RouteDetailsDrawer from '../components/RouteDetailsDrawer';

const DashboardLayout = ({ children, selectedRoute, onRouteSelect }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Topbar />
      <RoutesPanel onRouteSelect={onRouteSelect} selectedRouteId={selectedRoute?.id} />
      <RouteDetailsDrawer 
        route={selectedRoute} 
        open={Boolean(selectedRoute)} 
        onClose={() => onRouteSelect(null)} 
      />
      
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
        <StatsFooter routes={routes} />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
