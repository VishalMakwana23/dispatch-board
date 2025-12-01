import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useTheme } from '@mui/material/styles';

const Sidebar = () => {
  const theme = useTheme();

  const menuItems = [
    { icon: <HomeIcon />, label: 'Home' },
    { icon: <AltRouteIcon />, label: 'Routes', active: true },
    { icon: <HistoryIcon />, label: 'History' },
    { icon: <CheckCircleOutlineIcon />, label: 'Completed' },
    { icon: <SearchIcon />, label: 'Search' },
  ];

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
        {menuItems.map((item, index) => (
          <Tooltip key={index} title={item.label} placement="right">
            <IconButton
              sx={{
                color: 'white',
                backgroundColor: item.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                width: '40px',
                height: '40px',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                border: item.active ? '2px solid white' : 'none',
              }}
            >
              {item.icon}
            </IconButton>
          </Tooltip>
        ))}
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

export default Sidebar;
