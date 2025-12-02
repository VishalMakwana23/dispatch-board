import React from 'react';
import { Box } from '@mui/material';
import AdminSidebar from '../components/AdminSidebar';
import Topbar from '../components/Topbar';

const AdminLayout = ({ children, activeView, setActiveView }) => {
  // Determine margin based on active view
  // If 'routes', we expect the RoutesPanel to be present (width 350px) + Sidebar (60px) = 410px
  // If other views, we only have Sidebar (60px)
  const marginLeft = activeView === 'routes' ? '410px' : '60px';

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <AdminSidebar activeView={activeView} setActiveView={setActiveView} />
      <Topbar />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'hidden',
          marginLeft: marginLeft,
          paddingTop: '64px', // Topbar height
          position: 'relative',
          transition: 'margin-left 0.3s ease', // Smooth transition when switching views
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
