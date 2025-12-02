import { Box, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Menu, MenuItem, Radio } from '@mui/material';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HistoryIcon from '@mui/icons-material/History';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FilterDrawer from '../FilterDrawer';
import RouteCard from '../RouteCard';
import { routes } from '../../mock/routes';

const RoutesPanel = ({ onRouteSelect, openRouteIds = [], isAdmin = false, activeView = 'routes', setActiveView }) => {
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [viewAnchorEl, setViewAnchorEl] = useState(null);
  const filterOpen = Boolean(filterAnchorEl);
  const viewOpen = Boolean(viewAnchorEl);

  const handleViewClick = (event) => {
    setViewAnchorEl(event.currentTarget);
  };

  const handleViewClose = () => {
    setViewAnchorEl(null);
  };

  const handleViewSelect = (view) => {
    if (setActiveView) {
        setActiveView(view);
    }
    handleViewClose();
  };

  const handleApplyFilters = (filters) => {
    console.log("APPLY:", filters);
    // Add logic to filter routes here if needed
  };

  const handleSaveFilters = (filters) => {
    console.log("SAVE:", filters);
    // Add logic to save filters here
  };

  return (
    <Box
      sx={{
        width: '350px',
        height: '100vh',
        backgroundColor: '#F6F7F8',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #e0e0e0',
        position: 'fixed',
        left: '60px', // Width of Sidebar
        top: 0,
        zIndex: 1100,
        pt: 2, // Topbar height compensation if needed, but Topbar is likely above or overlay. 
               // Assuming Topbar is at the top, we might need marginTop. 
               // Let's assume Topbar is ~64px.
        mt: '64px',
        height: 'calc(100vh - 64px)',
      }}
    >
      <Box sx={{ p: 2, pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
             {isAdmin ? (
                <>
                    <Box 
                        onClick={handleViewClick}
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1, 
                            cursor: 'pointer',
                            '&:hover': { opacity: 0.8 }
                        }}
                    >
                        <AltRouteIcon fontSize="small" />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>Routes</Typography>
                        {viewOpen ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
                    </Box>
                    <Menu
                        anchorEl={viewAnchorEl}
                        open={viewOpen}
                        onClose={handleViewClose}
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
                        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <AltRouteIcon fontSize="small" sx={{ color: '#333' }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#333', fontSize: '15px' }}>Routes</Typography>
                            </Box>
                            <KeyboardArrowUpIcon fontSize="small" sx={{ color: '#333' }} />
                        </Box>

                        <MenuItem onClick={() => handleViewSelect('routes')}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <AltRouteIcon fontSize="small" sx={{ color: '#333' }} />
                                <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>Routes</Typography>
                            </Box>
                            <Radio checked={activeView === 'routes'} size="small" sx={{ padding: 0, color: '#ccc', '&.Mui-checked': { color: '#000' } }} />
                        </MenuItem>
                        <MenuItem onClick={() => handleViewSelect('drivers')}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <PersonOutlineIcon fontSize="small" sx={{ color: '#333' }} />
                                <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Drivers</Typography>
                            </Box>
                            <Radio checked={activeView === 'drivers'} size="small" sx={{ padding: 0, color: '#ccc', '&.Mui-checked': { color: '#000' } }} />
                        </MenuItem>
                        <MenuItem onClick={() => handleViewSelect('orders')}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <HistoryIcon fontSize="small" sx={{ color: '#333' }} />
                                <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Unassigned orders</Typography>
                            </Box>
                            <Radio checked={activeView === 'orders'} size="small" sx={{ padding: 0, color: '#ccc', '&.Mui-checked': { color: '#000' } }} />
                        </MenuItem>
                    </Menu>
                </>
             ) : (
                <>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Routes</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', bgcolor: '#e0e0e0', px: 0.8, py: 0.2, borderRadius: 1 }}>123</Typography>
                </>
             )}
          </Box>
          <IconButton size="small" onClick={(e) => setFilterAnchorEl(e.currentTarget)}>
            <FilterListIcon />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          placeholder="Search..."
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2, bgcolor: 'white' }}
        />
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 2, pb: 10 }}> {/* pb for footer space */}
        {routes.map((route) => (
          <RouteCard 
            key={route.id} 
            route={route} 
            selected={openRouteIds.includes(route.id)}
            onClick={() => onRouteSelect && onRouteSelect(route)}
            isAdmin={isAdmin}
          />
        ))}
        <FilterDrawer
        open={filterOpen}
        anchorEl={filterAnchorEl}
        onClose={() => setFilterAnchorEl(null)}
        onApplyFilters={handleApplyFilters}
        onSaveFilters={handleSaveFilters}
      />
    </Box>
    </Box>
  );
};

export default RoutesPanel;
