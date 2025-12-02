import React, { useState, useMemo } from 'react';
import { Box, Typography, TextField, InputAdornment, IconButton, Menu, MenuItem, Radio, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import HistoryIcon from '@mui/icons-material/History';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DriverCard from './DriverCard';
import { mockDrivers } from '../../data/mockDrivers';
import FilterPopup from '../RoutesPanel/FilterPopup'; // Assuming relative path is correct based on file structure

const DriversPanel = ({ onDriverSelect, selectedDriverId, activeView, setActiveView }) => {
  const [viewAnchorEl, setViewAnchorEl] = useState(null);
  const viewOpen = Boolean(viewAnchorEl);

  // Filter State
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const filterOpen = Boolean(filterAnchorEl);
  const [activeFilters, setActiveFilters] = useState({
    markets: [],
    providers: [],
    status: []
  });
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter Handlers
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
  };

  // Filtering Logic
  const filteredDrivers = useMemo(() => {
    return mockDrivers.filter(driver => {
        // Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            if (!driver.name.toLowerCase().includes(query) && 
                !driver.id.toLowerCase().includes(query)) {
                return false;
            }
        }

        // Market Filter (Mock data has "City" in company string like "Leo Green Logistic · Edmonton")
        if (activeFilters.markets.length > 0) {
            const driverMarket = driver.company.split('·')[1]?.trim();
            if (!driverMarket || !activeFilters.markets.includes(driverMarket)) {
                return false;
            }
        }

        // Provider Filter (Mock data has "Provider" in company string like "Leo Green Logistic · Edmonton")
        if (activeFilters.providers.length > 0) {
            const driverProvider = driver.company.split('·')[0]?.trim();
            if (!driverProvider || !activeFilters.providers.includes(driverProvider)) {
                return false;
            }
        }

        // Status Filter
        if (activeFilters.status.length > 0) {
            if (!activeFilters.status.includes(driver.status)) {
                return false;
            }
        }

        return true;
    });
  }, [searchQuery, activeFilters]);

  const activeFilterCount = activeFilters.markets.length + activeFilters.providers.length + activeFilters.status.length;

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
        left: '60px',
        top: '64px', // Assuming Topbar is 64px
        zIndex: 1100,
      }}
    >
      <Box sx={{ p: 2, pb: 1 }}>
        {/* Header with View Switcher */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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
            <PersonOutlineIcon fontSize="small" />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Drivers</Typography>
            {viewOpen ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
          </Box>
          
          <IconButton size="small" onClick={handleFilterClick}>
            <Badge badgeContent={activeFilterCount} color="error" variant="dot" invisible={activeFilterCount === 0}>
                <FilterListIcon />
            </Badge>
          </IconButton>
        </Box>

        {/* View Switcher Menu */}
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
                    <PersonOutlineIcon fontSize="small" sx={{ color: '#333' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#333', fontSize: '15px' }}>Drivers</Typography>
                </Box>
                <KeyboardArrowUpIcon fontSize="small" sx={{ color: '#333' }} />
            </Box>

            <MenuItem onClick={() => handleViewSelect('routes')}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <AltRouteIcon fontSize="small" sx={{ color: '#333' }} />
                    <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Routes</Typography>
                </Box>
                <Radio checked={activeView === 'routes'} size="small" sx={{ padding: 0, color: '#ccc', '&.Mui-checked': { color: '#000' } }} />
            </MenuItem>
            <MenuItem onClick={() => handleViewSelect('drivers')}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <PersonOutlineIcon fontSize="small" sx={{ color: '#333' }} />
                    <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>Drivers</Typography>
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

        <TextField
          fullWidth
          placeholder="Search..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2, bgcolor: 'white' }}
        />
        
        <Typography variant="caption" sx={{ color: '#888', mb: 1, display: 'block' }}>
            {filteredDrivers.length} Total Drivers
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 2, pb: 2 }}>
        {filteredDrivers.map((driver) => (
          <DriverCard 
            key={driver.id} 
            driver={driver} 
            isSelected={selectedDriverId === driver.id}
            onClick={() => onDriverSelect(driver)}
          />
        ))}
        {filteredDrivers.length === 0 && (
            <Typography variant="body2" sx={{ textAlign: 'center', mt: 4, color: '#888' }}>
                No drivers found matching filters.
            </Typography>
        )}
      </Box>

      {/* Filter Popup */}
      <FilterPopup 
        open={filterOpen}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
        onApply={handleApplyFilters}
        initialFilters={activeFilters}
      />
    </Box>
  );
};

export default DriversPanel;
