import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Autocomplete,
  TextField,
  Paper,
  Chip,
  Badge
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';

const FilterPopup = ({ onClose }) => {
  // Dummy options for the filter fields
  const marketOptions = ['Calgary', 'Edmonton', 'Vancouver', 'Toronto'];
  const providerOptions = ['Leo Green Logistic', 'Fast Track', 'Speedy Delivery'];
  const statusOptions = ['Ongoing', 'Completed', 'Status Coded', 'Risk of Delay'];
  const alertOptions = ['Missing POD', 'Late Arrival'];
  const routeOptions = ['Route A', 'Route B', 'Route C'];

  const [markets, setMarkets] = useState(['Calgary']);
  const [providers, setProviders] = useState(['Leo Green Logistic']);
  const [status, setStatus] = useState(null);
  const [alert, setAlert] = useState(null);
  const [route, setRoute] = useState(null);

  return (
    <Paper
      elevation={4}
      sx={{
        position: 'absolute',
        top: '60px', // Adjust based on where the icon is
        left: '20px', // Adjust to align with the panel
        width: '320px',
        zIndex: 1200,
        p: 2,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Badge color="error" variant="dot" overlap="circular">
             <FilterListIcon fontSize="small" />
          </Badge>
          {/* Title is not explicitly text in the image, but the icon suggests it. 
              The image has a red badge on the filter icon. 
              There is a "Reset" button.
          */}
        </Box>
        <Button 
            size="small" 
            sx={{ 
                textTransform: 'none', 
                color: 'text.secondary', 
                fontWeight: 600,
                minWidth: 'auto',
                mr: 'auto',
                ml: 2
            }}
            onClick={() => {
                setMarkets([]);
                setProviders([]);
                setStatus(null);
                setAlert(null);
                setRoute(null);
            }}
        >
          Reset
        </Button>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Fields */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        
        {/* Market/Location */}
        <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>
                Market/Location
            </Typography>
            <Autocomplete
                multiple
                options={marketOptions}
                value={markets}
                onChange={(event, newValue) => setMarkets(newValue)}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                    <Chip 
                        variant="outlined" 
                        label={option} 
                        size="small" 
                        {...getTagProps({ index })} 
                        sx={{ bgcolor: '#eff2f5', border: 'none' }}
                    />
                    ))
                }
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        placeholder={markets.length === 0 ? "Type to select a market" : ""} 
                        size="small" 
                    />
                )}
            />
        </Box>

        {/* Service Provider */}
        <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>
                Service Provider
            </Typography>
            <Autocomplete
                multiple
                options={providerOptions}
                value={providers}
                onChange={(event, newValue) => setProviders(newValue)}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                    <Chip 
                        variant="outlined" 
                        label={option} 
                        size="small" 
                        {...getTagProps({ index })} 
                        sx={{ bgcolor: '#eff2f5', border: 'none' }}
                    />
                    ))
                }
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        placeholder={providers.length === 0 ? "Type to select a Client" : ""} 
                        size="small" 
                    />
                )}
            />
        </Box>

        {/* Route Status */}
        <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>
                Route Status
            </Typography>
            <Autocomplete
                options={statusOptions}
                value={status}
                onChange={(event, newValue) => setStatus(newValue)}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        placeholder="Type to select a Status" 
                        size="small" 
                    />
                )}
            />
        </Box>

        {/* Route Alerts */}
        <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>
                Route Alerts
            </Typography>
            <Autocomplete
                options={alertOptions}
                value={alert}
                onChange={(event, newValue) => setAlert(newValue)}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        placeholder="Type to select a route alert" 
                        size="small" 
                    />
                )}
            />
        </Box>

        {/* Route */}
        <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>
                Route
            </Typography>
            <Autocomplete
                options={routeOptions}
                value={route}
                onChange={(event, newValue) => setRoute(newValue)}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        placeholder="Type to select a Route" 
                        size="small" 
                    />
                )}
            />
        </Box>

      </Box>

      {/* Footer */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
        <Button 
            sx={{ 
                textTransform: 'none', 
                color: 'text.primary', 
                textDecoration: 'underline' 
            }}
        >
            Save
        </Button>
        <Button 
            variant="contained" 
            sx={{ 
                textTransform: 'none', 
                bgcolor: '#c2410c', // Orange/Brown color from image
                '&:hover': { bgcolor: '#9a3412' },
                borderRadius: 5,
                px: 4
            }}
            onClick={onClose}
        >
            Apply
        </Button>
      </Box>
    </Paper>
  );
};

export default FilterPopup;
