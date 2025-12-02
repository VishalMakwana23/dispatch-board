import React, { useState } from 'react';
import { Box, Typography, Menu, MenuItem, Radio } from '@mui/material';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HistoryIcon from '@mui/icons-material/History';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ViewSwitcher = ({ activeView, setActiveView, customTrigger }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (view) => {
    if (setActiveView) {
      setActiveView(view);
    }
    handleClose();
  };

  const getLabel = (view) => {
    switch (view) {
      case 'routes': return 'Routes';
      case 'drivers': return 'Drivers';
      case 'orders': return 'Unassigned orders';
      default: return 'Routes';
    }
  };

  const getIcon = (view) => {
    switch (view) {
      case 'routes': return <AltRouteIcon fontSize="small" />;
      case 'drivers': return <PersonOutlineIcon fontSize="small" />;
      case 'orders': return <HistoryIcon fontSize="small" />;
      default: return <AltRouteIcon fontSize="small" />;
    }
  };

  return (
    <>
      <Box 
        onClick={handleClick}
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          cursor: 'pointer',
          '&:hover': { opacity: 0.8 }
        }}
      >
        {customTrigger ? customTrigger : (
            <>
                {getIcon(activeView)}
                <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Montserrat' }}>
                    {getLabel(activeView)}
                </Typography>
                {open ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
            </>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            mt: 1,
            backgroundColor: 'white',
            color: '#333',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
            borderRadius: '12px',
            minWidth: '240px',
            padding: '8px',
            '& .MuiMenuItem-root': {
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '14px',
              padding: '10px 16px',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              mb: 0.5,
              '&:hover': { backgroundColor: '#f5f5f5' },
            },
          },
        }}
      >
        {/* Header Item (Non-clickable label) */}
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {getIcon(activeView)}
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#333', fontSize: '15px' }}>
                    {getLabel(activeView)}
                </Typography>
            </Box>
            <KeyboardArrowUpIcon fontSize="small" sx={{ color: '#333' }} />
        </Box>

        {/* Menu Items */}
        {['routes', 'drivers', 'orders'].map((view) => (
            <MenuItem key={view} onClick={() => handleSelect(view)}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {getIcon(view)}
                    <Typography sx={{ fontWeight: activeView === view ? 700 : 500, fontSize: '14px' }}>
                        {getLabel(view)}
                    </Typography>
                </Box>
                <Radio 
                    checked={activeView === view} 
                    size="small" 
                    sx={{ 
                        padding: 0, 
                        color: '#ccc', 
                        '&.Mui-checked': { color: '#000' } 
                    }} 
                />
            </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ViewSwitcher;
