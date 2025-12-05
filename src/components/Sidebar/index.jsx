import React, { useState } from 'react';
import { Box, IconButton, Tooltip, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Still import, but might change icon
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ isCollapsed, setIsCollapsed, menuItems = [] }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const openProfileMenu = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Determine active item
  const isItemActive = (item) => {
    if (item.disabled) return false; // Disabled items cannot be active
    if (item.active) return true; // Allow manual override
    if (item.path) return location.pathname === item.path;
    if (item.id) return false; 
    return false;
  };

  return (
    <Box
      sx={{
        width: isCollapsed ? '65px' : '240px',
        height: 'calc(100vh - 64px)', // Subtract header height
        backgroundColor: '#1B3E38',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
        whiteSpace: 'nowrap',
        position: 'fixed',
        left: 0,
        top: '64px', // Start below the header
        zIndex: 1200,
        boxShadow: '4px 0 10px rgba(0,0,0,0.1)',
      }}
    >
      {/* Toggle Button Area */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: isCollapsed ? 'center' : 'flex-end', 
        p: 1, 
        minHeight: '48px' 
      }}>
        <IconButton onClick={toggleSidebar} sx={{ color: 'white' }}>
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      {/* Menu Items */}
      <List sx={{ flexGrow: 1, px: 1 }}>
        {menuItems.map((item, index) => {
          const active = isItemActive(item);
          // Tooltip logic: Show if collapsed OR if disabled
          const showTooltip = isCollapsed || item.disabled;
          const tooltipTitle = item.disabled ? (item.tooltip || "Not able to access") : item.label;

          return (
            <ListItem key={index} disablePadding sx={{ display: 'block', mb: 1 }}>
              <Tooltip title={showTooltip ? tooltipTitle : ''} placement="right" arrow>
                <Box> 
                  <ListItemButton
                    onClick={item.action}
                    disabled={item.disabled}
                    sx={{
                      minHeight: 48,
                      justifyContent: isCollapsed ? 'center' : 'initial',
                      px: 2.5,
                      borderRadius: '10px', // Keep item rounded
                      '&:hover': {
                        backgroundColor: item.disabled ? 'transparent' : 'rgba(255, 255, 255, 0.1)',
                      },
                      opacity: item.disabled ? 0.5 : 1,
                      cursor: item.disabled ? 'not-allowed' : 'pointer',
                      pointerEvents: item.disabled ? 'auto' : 'auto', 
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: isCollapsed ? 0 : 3,
                        justifyContent: 'center',
                        color: active ? '#1B3E38' : 'white', // Icon color change
                        backgroundColor: active ? 'white' : 'transparent', // Circle bg
                        borderRadius: '50%', // Make it round
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'all 0.2s',
                        boxShadow: active ? '0px 2px 4px rgba(0,0,0,0.2)' : 'none',
                      }}
                    >
                      {/* Handle both Component icons and Image icons */}
                      {typeof item.icon === 'string' ? (
                         <img 
                           src={item.icon} 
                           alt={item.label} 
                           style={{ 
                             width: '20px', 
                             height: '20px',
                             filter: active ? 'none' : 'brightness(0) invert(1)' // White when inactive, original/black when active
                           }} 
                         />
                      ) : (
                         // Clone element to force color if it's a MUI icon, though CSS color property on parent handles it mostly
                         React.cloneElement(item.icon, { sx: { fontSize: '20px' } })
                      )}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.label} 
                      sx={{ 
                        opacity: isCollapsed ? 0 : 1, 
                        color: 'white',
                        '& .MuiTypography-root': { fontWeight: active ? 600 : 400 }
                      }} 
                    />
                  </ListItemButton>
                </Box>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      {/* Bottom Section */}
      <Box sx={{ p: 1, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <List>
          {/* Settings */}
          <ListItem disablePadding sx={{ display: 'block', mb: 1 }}>
            <Tooltip title={isCollapsed ? "Settings" : ""} placement="right">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: isCollapsed ? 'center' : 'initial',
                  px: 2.5,
                  borderRadius: '10px',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: isCollapsed ? 0 : 3, justifyContent: 'center', color: 'white' }}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" sx={{ opacity: isCollapsed ? 0 : 1, color: 'white' }} />
              </ListItemButton>
            </Tooltip>
          </ListItem>

          {/* Profile */}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title={isCollapsed ? "Profile" : ""} placement="right">
              <ListItemButton
                onClick={handleProfileClick}
                sx={{
                  minHeight: 48,
                  justifyContent: isCollapsed ? 'center' : 'initial',
                  px: 2.5,
                  borderRadius: '10px',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: isCollapsed ? 0 : 3, justifyContent: 'center', color: 'white' }}>
                  <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" sx={{ opacity: isCollapsed ? 0 : 1, color: 'white' }} />
              </ListItemButton>
            </Tooltip>
            
            {/* Profile Menu */}
            <Menu
              anchorEl={anchorEl}
              open={openProfileMenu}
              onClose={handleProfileClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              PaperProps={{
                sx: {
                  mt: -5,
                  ml: 2,
                  backgroundColor: '#FFFFFF',
                  color: '#333',
                  borderRadius: '10px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }
              }}
            >
              <MenuItem onClick={handleProfileClose}>
                <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon>
                My Account
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleProfileClose}>
                <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
