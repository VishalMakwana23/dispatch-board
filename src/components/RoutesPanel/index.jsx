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
import FilterPopup from './FilterPopup';
import RouteCard from '../RouteCard';
import { routes } from '../../mock/routes';

import ViewSwitcher from '../ViewSwitcher';

const RoutesPanel = ({ onRouteSelect, openRouteIds = [], isAdmin = false, activeView = 'routes', setActiveView }) => {
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const filterOpen = Boolean(filterAnchorEl);

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
                    <ViewSwitcher activeView={activeView} setActiveView={setActiveView} />
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
        <FilterPopup
        open={filterOpen}
        anchorEl={filterAnchorEl}
        onClose={() => setFilterAnchorEl(null)}
        onApply={handleApplyFilters}
        type="routes"
      />
    </Box>
    </Box>
  );
};

export default RoutesPanel;
