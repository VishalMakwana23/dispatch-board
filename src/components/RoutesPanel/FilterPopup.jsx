import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Autocomplete,
  TextField,
  Chip,
  Popover,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  Link
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';

const EMPTY_FILTERS = {};

const FilterPopup = ({ 
    open, 
    anchorEl, 
    onClose, 
    onApply, 
    onReset,
    initialFilters = EMPTY_FILTERS,
    type = 'drivers' // 'drivers' | 'orders' | 'routes'
}) => {
  // Options
  const marketOptions = ['Calgary', 'Edmonton', 'Toronto', 'Winnipeg'];
  const providerOptions = ['Leo Green Logistic', 'BlueDriver Corp', 'Rapid Move'];
  const statusOptions = ['active', 'inactive', 'unavailable'];
  const clientOptions = ['MCKESSON', 'PharmaChoice', 'Rexall']; // Mock clients for orders
  const routeStatusOptions = ['Ongoing', 'Completed', 'Pending'];
  const routeAlertOptions = ['Missing POD', 'Risk of Delay', 'Late'];
  const routeOptions = ['Route 1', 'Route 2', 'Route 3']; // Mock routes

  // Local state for the form
  const [markets, setMarkets] = useState([]);
  const [providers, setProviders] = useState([]);
  const [status, setStatus] = useState([]);
  const [clients, setClients] = useState([]);
  const [routeStatus, setRouteStatus] = useState([]);
  const [routeAlerts, setRouteAlerts] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState([]);

  // Sync with initialFilters when opening
  useEffect(() => {
    if (open) {
        setMarkets(initialFilters.markets || []);
        setProviders(initialFilters.providers || []);
        setStatus(initialFilters.status || []);
        setClients(initialFilters.clients || []);
        setRouteStatus(initialFilters.routeStatus || []);
        setRouteAlerts(initialFilters.routeAlerts || []);
        setSelectedRoute(initialFilters.route || []);
    }
  }, [open, initialFilters]);

  const handleApply = () => {
    onApply({
        markets,
        providers,
        status,
        clients,
        routeStatus,
        routeAlerts,
        route: selectedRoute
    });
    onClose();
  };

  const handleReset = () => {
    setMarkets([]);
    setProviders([]);
    setStatus([]);
    setClients([]);
    setRouteStatus([]);
    setRouteAlerts([]);
    setSelectedRoute([]);
    if (onReset) onReset();
  };

  // Styles
  const labelStyle = {
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '8px',
    color: '#000',
    display: 'block',
  };

  const selectStyle = {
    borderRadius: '8px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ccc',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#999',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1C6E63',
    },
  };

  const chipStyle = {
    height: '28px',
    fontSize: '13px',
    backgroundColor: '#EFF7F6',
    color: '#333',
    borderRadius: '6px',
    margin: '2px',
    fontWeight: 500,
    '& .MuiChip-deleteIcon': {
        color: '#666',
        fontSize: '16px'
    }
  };

  const renderChipsBelow = (selected, setSelected) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
      {selected.map((value) => (
        <Chip
          key={value}
          label={value}
          onDelete={() => {
            setSelected(selected.filter((item) => item !== value));
          }}
          deleteIcon={<CloseIcon />}
          sx={chipStyle}
        />
      ))}
    </Box>
  );

  const renderSelect = (label, value, setValue, options, placeholder) => (
    <Box>
        <Typography sx={labelStyle}>{label}</Typography>
        <FormControl fullWidth size="small">
            <Select
                multiple
                displayEmpty
                value={value}
                onChange={(e) => setValue(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                input={<OutlinedInput sx={selectStyle} />}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <Typography color="text.secondary" fontSize="14px">{placeholder}</Typography>;
                    }
                    return null;
                }}
                MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
            >
                <MenuItem disabled value="">
                    <em>{placeholder}</em>
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
            </Select>
        </FormControl>
        {value.length > 0 && renderChipsBelow(value, setValue)}
    </Box>
  );

  const hasActiveFilters = markets.length > 0 || providers.length > 0 || status.length > 0 || clients.length > 0 || routeStatus.length > 0 || routeAlerts.length > 0 || selectedRoute.length > 0;

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: {
            width: '320px',
            p: 3,
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            ml: 4 // Increased margin for better spacing
        }
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ position: 'relative', display: 'flex' }}>
             <FilterListIcon sx={{ color: '#000' }} />
             {/* Red badge dot if filters active */}
             {hasActiveFilters && (
                 <Box sx={{ 
                     position: 'absolute', 
                     top: -2, 
                     right: -2, 
                     width: 8, 
                     height: 8, 
                     bgcolor: '#D32F2F', 
                     borderRadius: '50%',
                     border: '1px solid white'
                 }} />
             )}
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link
                component="button"
                variant="body2"
                onClick={handleReset}
                sx={{ 
                    color: '#1C6E63', 
                    textDecoration: 'underline', 
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'none' } 
                }}
            >
                Reset
            </Link>
            <IconButton size="small" onClick={onClose} sx={{ color: '#000' }}>
                <CloseIcon />
            </IconButton>
        </Box>
      </Box>

      {/* Fields */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        {/* Market/Location - Common for all */}
        {renderSelect('Market/Location', markets, setMarkets, marketOptions, 'Type to select a market')}

        {/* Drivers View Fields */}
        {type === 'drivers' && (
            <>
                {renderSelect('Service Provider', providers, setProviders, providerOptions, 'Type to select a SP')}
                {renderSelect('Driver Status', status, setStatus, statusOptions, 'Type to select a Status')}
            </>
        )}

        {/* Orders View Fields */}
        {type === 'orders' && (
            <>
                {renderSelect('Client', clients, setClients, clientOptions, 'Type to select a client')}
            </>
        )}

        {/* Routes View Fields */}
        {type === 'routes' && (
            <>
                {renderSelect('Service Provider', providers, setProviders, providerOptions, 'Type to select a Client')}
                {renderSelect('Route Status', routeStatus, setRouteStatus, routeStatusOptions, 'Type to select a Status')}
                {renderSelect('Route Alerts', routeAlerts, setRouteAlerts, routeAlertOptions, 'Type to select a route alert')}
                {renderSelect('Route', selectedRoute, setSelectedRoute, routeOptions, 'Type to select a Route')}
            </>
        )}

      </Box>

      {/* Footer */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
        <Button 
            onClick={handleApply} 
            sx={{ 
                textTransform: 'none', 
                color: '#1C6E63', 
                textDecoration: 'underline',
                fontWeight: 600,
                '&:hover': { textDecoration: 'none', bgcolor: 'transparent' }
            }}
            disableRipple
        >
            Save
        </Button>
        <Button 
            variant="contained" 
            onClick={handleApply}
            sx={{ 
                textTransform: 'none', 
                bgcolor: '#C76A2F', // Orange/Brown
                '&:hover': { bgcolor: '#A05525' },
                borderRadius: '20px',
                px: 4,
                fontWeight: 600,
                boxShadow: 'none'
            }}
        >
            Apply
        </Button>
      </Box>
    </Popover>
  );
};

export default FilterPopup;
