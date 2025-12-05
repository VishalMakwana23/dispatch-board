import React from 'react';
import { Box } from '@mui/material';
import ziingLogo from '../assets/ziingLogo.png';

const LogoHeader = () => {
  return (
    <Box
      sx={{
        width: '240px',
        height: '64px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '24px', // Align with design
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1201, // Above Sidebar (1200) and Topbar (1000)
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <img src={ziingLogo} alt="ziing.ai" style={{ height: '32px' }} />
    </Box>
  );
};

export default LogoHeader;
