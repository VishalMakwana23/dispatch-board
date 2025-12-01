import React from 'react';
import { Box, Typography, IconButton, Button, Avatar } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Topbar = () => {
  return (
    <Box
      sx={{
        height: '64px',
        position: 'fixed',
        top: 0,
        left: '60px', // Sidebar width
        right: 0,
        backgroundColor: 'white',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1C6E63' }}>
          ziing.ai
        </Typography>
      </Box>

      {/* Right Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<LanguageIcon />}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{ color: 'text.primary' }}
        >
          EN
        </Button>
        
        <Button
          startIcon={<SettingsIcon />}
          sx={{ color: 'text.primary' }}
        >
          Settings
        </Button>

        <Button
          startIcon={<HelpOutlineIcon />}
          sx={{ color: 'text.primary' }}
        >
          Support
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
          <Avatar sx={{ bgcolor: '#FF7043', width: 32, height: 32 }}>J</Avatar>
          <Box>
             <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }}>Hi John!</Typography>
             <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>jasonsmith@mck.com</Typography>
          </Box>
        </Box>
      </Box>
      
      {/* Date Picker & Toggles (Floating on Map usually, but let's put them in Topbar or a sub-bar if they are global) 
          In the screenshot they look like they are floating on the map top right.
          I will put them in the MapView component as absolute positioned elements.
      */}
    </Box>
  );
};

export default Topbar;
