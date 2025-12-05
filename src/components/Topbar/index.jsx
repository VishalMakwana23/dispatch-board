import React from 'react';
import { Box, Typography, IconButton, Button, Avatar } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsIcon from '@mui/icons-material/Settings'; // Default MUI fallback if Iconify failed, but we use text/icon button
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { openSettings, openProfile } from '../../redux/slices/uiSlice';

import ziingLogo from '../../assets/ziingLogo.png';

const Topbar = ({ isCollapsed }) => {
  const dispatch = useDispatch();

  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
    name: 'John Doe',
    email: 'johndoe@ziing.ai'
  };

  return (
    <Box
      sx={{
        height: '64px',
        position: 'fixed',
        top: 0,
        left: isCollapsed ? '65px' : '240px', // Dynamic left based on sidebar state
        right: 0,
        backgroundColor: 'white',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        borderBottom: '1px solid #e0e0e0',
        transition: 'left 0.3s ease', // Smooth transition
      }}
    >
      {/* Logo - Only show if sidebar is collapsed */}
      <Box sx={{ display: 'flex', alignItems: 'center', opacity: isCollapsed ? 1 : 0, transition: 'opacity 0.2s', pointerEvents: isCollapsed ? 'auto' : 'none' }}>
        <img src={ziingLogo} alt="ziing.ai" style={{ height: '32px' }} />
      </Box>

      {/* Right Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<LanguageIcon />}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{ color: 'text.primary', textTransform: 'none', fontFamily: 'Montserrat' }}
        >
          EN
        </Button>
        
        <Button
          startIcon={<Icon icon="mdi:cog-outline" width="20" height="20" />}
          sx={{ color: 'text.primary', textTransform: 'none', fontFamily: 'Montserrat' }}
          onClick={() => dispatch(openSettings())}
        >
          Settings
        </Button>

        <Button
          startIcon={<HelpOutlineIcon />}
          sx={{ color: 'text.primary', textTransform: 'none', fontFamily: 'Montserrat' }}
        >
          Support
        </Button>

        <Box 
          sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2, cursor: 'pointer' }}
          onClick={() => dispatch(openProfile())}
        >
          <Avatar sx={{ bgcolor: '#FF7043', width: 32, height: 32 }}>{currentUser.name.charAt(0)}</Avatar>
          <Box>
             <Typography variant="subtitle2" sx={{ lineHeight: 1.2, fontFamily: 'Montserrat' }}>{currentUser.name}</Typography>
             <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1, fontFamily: 'Montserrat' }}>{currentUser.email}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
