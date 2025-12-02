import React, { useState } from 'react';
import { Box, IconButton, Tooltip, Menu, MenuItem, Typography, Radio } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@mui/material/styles';

const AdminSidebar = ({ activeView, setActiveView }) => {
  const theme = useTheme();

  // Determine if the "Routes" parent item is active (if any of the sub-views are active)
  const isRoutesActive = ['routes', 'drivers', 'orders'].includes(activeView);

  return (
    <Box
      sx={{
        width: '60px',
        height: '100vh',
        backgroundColor: '#1B3E38', // Darker green from screenshot
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 2,
        paddingBottom: 2,
        color: 'white',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1200,
      }}
    >
      <IconButton sx={{ color: 'white', mb: 4 }}>
        <MenuIcon />
      </IconButton>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
        <Tooltip title="Home" placement="right">
          <IconButton
            sx={{
              color: 'white',
              width: '40px',
              height: '40px',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            <HomeIcon />
          </IconButton>
        </Tooltip>

        {/* Routes/Dispatcher Module */}
        <Tooltip title="Routes Management" placement="right">
          <IconButton
            onClick={() => setActiveView('routes')}
            sx={{
              color: 'white',
              backgroundColor: isRoutesActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              width: '40px',
              height: '40px',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              border: isRoutesActive ? '2px solid white' : 'none',
            }}
          >
            <AltRouteIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="History" placement="right">
          <IconButton
            sx={{
              color: 'white',
              width: '40px',
              height: '40px',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            <HistoryIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Completed" placement="right">
          <IconButton
            sx={{
              color: 'white',
              width: '40px',
              height: '40px',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            <CheckCircleOutlineIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Search" placement="right">
          <IconButton
            sx={{
              color: 'white',
              width: '40px',
              height: '40px',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <IconButton sx={{ color: 'white' }}>
          <SettingsIcon />
        </IconButton>
        <IconButton sx={{ color: 'white' }}>
          <PersonOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AdminSidebar;
