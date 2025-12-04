import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import PersonIcon from '@mui/icons-material/Person';
import truckIcon from '../../assets/truck.svg';
import nameIcon from '../../assets/name.svg';
import userIcon from '../../assets/Subtract.svg';

const STATUS_COLORS = {
  green: '#107C41',
  yellow: '#E8A72B',
  orange: '#E67200',
  red: '#D24238',
  grey: '#AAAAAA',
};

const RouteStopItem = ({ stop, isLast, isFirst, routeColor }) => {
  const color = STATUS_COLORS[stop.color] || STATUS_COLORS.grey;
  
  // Determine Icon and Fill
  let IconElement = null;
  let isFilled = true;

  if (stop.isWarehouse) {
    // Warehouse: Green filled, "Load" text
    IconElement = <Typography variant="caption" sx={{ fontSize: '7px', fontWeight: 'bold' }}>Load</Typography>;
  } else if (stop.status === 'last_location' || isLast) {
     // Last Location / Last Stop: Orange filled, User icon (Subtract.svg)
     // Use white icon on colored background
     IconElement = <img src={userIcon} alt="User" style={{ width: '12px', height: '12px', filter: 'brightness(0) invert(1)' }} />;
  } else if (stop.status === 'completed') {
    // Completed: Green filled, name icon
    IconElement = <img src={nameIcon} alt="Completed" style={{ width: '12px', height: '12px', filter: 'brightness(0) invert(1)' }} />;
  } else if (stop.status === 'upcoming' || stop.status === 'pending') {
    // Upcoming/Pending: Outline, Truck icon
    isFilled = false;
    // Force icon to be black (or colored if we could) so it shows on white background
    IconElement = <img src={truckIcon} alt="Truck" style={{ width: '12px', height: '12px', filter: 'brightness(0)' }} />; 
  } else {
    // Others: Truck icon default (filled)
    IconElement = <img src={truckIcon} alt="Truck" style={{ width: '12px', height: '12px', filter: 'brightness(0) invert(1)' }} />;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '60px' }}> {/* Reduced minHeight */}
      {/* Timeline Column */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 1.5, minWidth: '24px' }}> {/* Reduced margin */}
        
        {/* The Dot/Icon */}
        <Box
          sx={{
            width: '24px', // Slightly larger to fit icon better
            height: '24px',
            borderRadius: '50%',
            backgroundColor: isFilled ? color : 'white',
            border: `2px solid ${color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            color: isFilled ? 'white' : color,
          }}
        >
            {IconElement}
        </Box>

        {/* Vertical Line */}
        {!isLast && (
          <Box
            sx={{
              width: '2px',
              flexGrow: 1,
              // Use routeColor for consistent line color for all completed/passed stops
              bgcolor: ['completed', 'missing_pod', 'customer_unavailable', 'loaded'].includes(stop.status) ? (routeColor || STATUS_COLORS.green) : '#E0E0E0',
              my: 0.25, // Reduced margin
            }}
          />
        )}
      </Box>

      {/* Content Column */}
      <Box sx={{ pb: 2, flexGrow: 1 }}> {/* Reduced padding */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}> {/* Changed to flex-start and added gap */}
            <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '13px', lineHeight: 1.2 }}>
            {stop.name}
            </Typography>
            {stop.badges && stop.badges.map((badge, index) => (
                <Chip 
                    key={index} 
                    label={badge} 
                    size="small" 
                    sx={{ 
                        height: '16px', // Smaller chip
                        fontSize: '9px', 
                        bgcolor: '#FFEBEE', 
                        color: '#D32F2F',
                        // ml: 0.5 // Removed ml, using gap
                    }} 
                />
            ))}
        </Box>
        
        <Typography variant="body2" sx={{ fontSize: '11px', color: 'text.secondary', mt: 0.25, lineHeight: 1.2 }}>
          {stop.address}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, mt: 0.5 }}>
            <Typography variant="caption" sx={{ fontSize: '10px', color: 'text.secondary' }}>
                {stop.time}
            </Typography>
             <Typography variant="caption" sx={{ fontSize: '10px', color: 'text.secondary' }}>
                {stop.timeWindow}
            </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, mt: 0.25 }}>
            <Typography variant="caption" sx={{ fontSize: '10px', color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.25 }}>
               📄 {stop.orders}
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '10px', color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.25 }}>
               📦 {stop.parcels}
            </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RouteStopItem;
