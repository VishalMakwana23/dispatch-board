import React, { useState } from 'react';
import { Box, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import RouteCard from '../RouteCard';
import { killeenData } from '../../mock/killeenData';
import FilterPopup from './FilterPopup';
import ViewSwitcher from '../ViewSwitcher';

const RoutesPanel = ({ onRouteSelect, openRouteIds = [], isAdmin = false, activeView = 'routes', setActiveView, isCollapsed = true }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const filterOpen = Boolean(filterAnchorEl);

  const filteredRoutes = killeenData.routes.filter(route =>
    route.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.driver.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApplyFilters = (filters) => {
    console.log("APPLY:", filters);
    // Add logic to filter routes here if needed
  };

  return (
    <Box
      sx={{
        width: '350px',
        height: 'calc(100vh - 64px)',
        backgroundColor: '#F6F7F8',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #e0e0e0',
        position: 'fixed',
        left: isCollapsed ? '65px' : '240px', // Dynamic left based on sidebar state
        top: '64px',
        zIndex: 1100,
        transition: 'left 0.3s ease', // Smooth transition
      }}
    >
      <Box sx={{ p: 2, pb: 1, bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isAdmin ? (
              <ViewSwitcher activeView={activeView} setActiveView={setActiveView} />
            ) : (
              <>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Routes</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', bgcolor: '#e0e0e0', px: 0.8, py: 0.2, borderRadius: 1 }}>{filteredRoutes.length}</Typography>
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 0 }}
        />
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, pb: 10, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filteredRoutes.map((route) => (
          <RouteCard
            key={route.id}
            route={route}
            selected={openRouteIds.includes(route.id)}
            onClick={() => onRouteSelect && onRouteSelect(route)}
            isAdmin={isAdmin}
          />
        ))}
      </Box>

      <FilterPopup
        open={filterOpen}
        anchorEl={filterAnchorEl}
        onClose={() => setFilterAnchorEl(null)}
        onApply={handleApplyFilters}
        type="routes"
      />
    </Box>
  );
};

export default RoutesPanel;
