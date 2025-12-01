import React, { useState } from 'react';
import {
  Popover,
  Box,
  Typography,
  IconButton,
  Button,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Stack,
  OutlinedInput,
  Link,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';

// Mock Data
const markets = ["Calgary", "Edmonton", "Toronto", "Winnipeg"];
const serviceProviders = ["Leo Green Logistic", "BlueDriver Corp", "Rapid Move"];
const routeStatuses = ["Ongoing", "Completed", "Risk of Delay", "Missing POD"];
const routeAlerts = ["No Issues", "Delayed", "Cancelled"];
const routes = ["Route 1", "Route 2", "Route 3"];

const FilterDrawer = ({ open, anchorEl, onClose, onApplyFilters, onSaveFilters }) => {
  // Local State
  const [selectedMarket, setSelectedMarket] = useState(["Calgary"]); // Default based on screenshot
  const [selectedServiceProvider, setSelectedServiceProvider] = useState(["Leo Green Logistic"]); // Default based on screenshot
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedAlert, setSelectedAlert] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");

  // Handlers
  const handleReset = () => {
    setSelectedMarket([]);
    setSelectedServiceProvider([]);
    setSelectedStatus("");
    setSelectedAlert("");
    setSelectedRoute("");
  };

  const handleApply = () => {
    const filters = {
      market: selectedMarket,
      serviceProvider: selectedServiceProvider,
      status: selectedStatus,
      alert: selectedAlert,
      route: selectedRoute,
    };
    onApplyFilters(filters);
    onClose();
  };

  const handleSave = () => {
    const filters = {
      market: selectedMarket,
      serviceProvider: selectedServiceProvider,
      status: selectedStatus,
      alert: selectedAlert,
      route: selectedRoute,
    };
    onSaveFilters(filters);
  };

  // Custom Styles
  const drawerPaperStyle = {
    width: '390px',
    padding: '32px',
    borderTopLeftRadius: '12px',
    borderBottomLeftRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    backgroundColor: '#FFFFFF',
    fontFamily: "'Montserrat', sans-serif",
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '8px',
    color: '#333',
    display: 'block',
  };

  const selectStyle = {
    borderRadius: '10px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1C6E63', // Green border as requested
      borderWidth: '1px',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#165950',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1C6E63',
      borderWidth: '2px',
    },
  };

  const chipStyle = {
    height: '28px',
    fontSize: '13px',
    backgroundColor: '#E8F5E9', // Light green background for chips? Or just grey as per screenshot? Screenshot looks like light grey/greenish. Let's use a subtle green tint or keep grey. User said "exact design", screenshot shows light greyish-green.
    // Actually screenshot shows light grey/blueish background for chips. Let's stick to the previous grey or a very light primary tint.
    // User said "border is green". Chips look like #E0F2F1 (very light teal) or just #F5F5F5.
    // Let's use a light grey-green.
    backgroundColor: '#EFF7F6',
    color: '#333',
    borderRadius: '6px',
    margin: '2px',
    fontWeight: 500,
  };

  // Helper for Multi-Select Rendering (Chips below)
  const renderChipsBelow = (selected, setSelected) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
      {selected.map((value) => (
        <Chip
          key={value}
          label={value}
          onDelete={() => {
            setSelected(selected.filter((item) => item !== value));
          }}
          deleteIcon={<CloseIcon style={{ fontSize: 14, color: '#666' }} />}
          sx={chipStyle}
        />
      ))}
    </Box>
  );

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
      PaperProps={{ sx: { ...drawerPaperStyle, ml: 1 } }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon sx={{ color: '#D32F2F' }} />
          <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>Filters</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link
            component="button"
            variant="body2"
            onClick={handleReset}
            sx={{ color: '#666', textDecoration: 'none', fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}
          >
            Reset
          </Link>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <Stack spacing={'22px'}>
        {/* Market/Location */}
        <Box>
          <Typography sx={labelStyle}>Market/Location</Typography>
          <FormControl fullWidth size="small">
            <Select
              multiple
              displayEmpty
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
              input={<OutlinedInput sx={selectStyle} />}
              renderValue={() => <Typography color="text.secondary" fontSize="14px">Type to select a market</Typography>}
            >
              <MenuItem disabled value="">
                <em>Type to select a market</em>
              </MenuItem>
              {markets.map((market) => (
                <MenuItem key={market} value={market}>
                  {market}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedMarket.length > 0 && renderChipsBelow(selectedMarket, setSelectedMarket)}
        </Box>

        {/* Service Provider */}
        <Box>
          <Typography sx={labelStyle}>Service Provider</Typography>
          <FormControl fullWidth size="small">
            <Select
              multiple
              displayEmpty
              value={selectedServiceProvider}
              onChange={(e) => setSelectedServiceProvider(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
              input={<OutlinedInput sx={selectStyle} />}
              renderValue={() => <Typography color="text.secondary" fontSize="14px">Type to select a Client</Typography>}
            >
              <MenuItem disabled value="">
                <em>Type to select a Client</em>
              </MenuItem>
              {serviceProviders.map((provider) => (
                <MenuItem key={provider} value={provider}>
                  {provider}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedServiceProvider.length > 0 && renderChipsBelow(selectedServiceProvider, setSelectedServiceProvider)}
        </Box>

        {/* Route Status */}
        <Box>
          <Typography sx={labelStyle}>Route Status</Typography>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              input={<OutlinedInput sx={selectStyle} />}
              renderValue={(selected) => {
                if (!selected) {
                  return <Typography color="text.secondary" fontSize="14px">Type to select a Status</Typography>;
                }
                return selected;
              }}
            >
              <MenuItem disabled value="">
                <em>Type to select a Status</em>
              </MenuItem>
              {routeStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Route Alerts */}
        <Box>
          <Typography sx={labelStyle}>Route Alerts</Typography>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={selectedAlert}
              onChange={(e) => setSelectedAlert(e.target.value)}
              input={<OutlinedInput sx={selectStyle} />}
              renderValue={(selected) => {
                if (!selected) {
                  return <Typography color="text.secondary" fontSize="14px">Type to select a route alert</Typography>;
                }
                return selected;
              }}
            >
              <MenuItem disabled value="">
                <em>Type to select a route alert</em>
              </MenuItem>
              {routeAlerts.map((alert) => (
                <MenuItem key={alert} value={alert}>
                  {alert}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Route */}
        <Box>
          <Typography sx={labelStyle}>Route</Typography>
          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              input={<OutlinedInput sx={selectStyle} />}
              renderValue={(selected) => {
                if (!selected) {
                  return <Typography color="text.secondary" fontSize="14px">Type to select a Route</Typography>;
                }
                return selected;
              }}
            >
              <MenuItem disabled value="">
                <em>Type to select a Route</em>
              </MenuItem>
              {routes.map((route) => (
                <MenuItem key={route} value={route}>
                  {route}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>

      {/* Footer Buttons */}
      <Box sx={{ mt: 'auto', pt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          onClick={handleSave}
          sx={{
            color: '#333',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
          }}
          disableRipple
        >
          Save
        </Button>
        <Button
          onClick={handleApply}
          variant="contained"
          sx={{
            backgroundColor: '#C76A2F',
            color: 'white',
            borderRadius: '8px',
            width: '100px',
            height: '38px',
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#A05525',
              boxShadow: 'none',
            }
          }}
        >
          Apply
        </Button>
      </Box>
    </Popover>
  );
};

export default FilterDrawer;
