import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import RoutesPanel from '../components/RoutesPanel';
import Topbar from '../components/Topbar';
import StatsFooter from '../components/StatsFooter';
import { killeenData } from '../mock/killeenData';

import RightPanelContainer from '../components/RightPanelContainer';
import ChainOfDelayContainer from '../components/ChainOfDelay';

const DashboardLayout = ({ children, panels, onRouteSelect, onTogglePanel, onClosePanel }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Topbar />
      <RoutesPanel 
        onRouteSelect={onRouteSelect} 
        openRouteIds={panels?.map(p => p.routeId) || []} 
      />
      <RightPanelContainer 
        panels={panels} 
        onToggle={onTogglePanel} 
        onClose={onClosePanel} 
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
        <StatsFooter routes={killeenData.routes} />
      </Box>
      <ChainOfDelayContainer />
    </Box>
  );
};

export default DashboardLayout;
