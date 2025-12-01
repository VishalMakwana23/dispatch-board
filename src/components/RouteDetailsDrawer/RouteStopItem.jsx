import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckIcon from '@mui/icons-material/Check';
import PersonIcon from '@mui/icons-material/Person';

const STATUS_COLORS = {
  green: '#107C41',
  yellow: '#E8A72B',
  orange: '#E67200',
  red: '#D24238',
  grey: '#AAAAAA',
};

const RouteStopItem = ({ stop, isLast, isFirst }) => {
  const color = STATUS_COLORS[stop.color] || STATUS_COLORS.grey;
  
  // Determine Icon and Fill
  let IconComponent = null;
  let isFilled = true;
  let iconSize = '14px';

  if (stop.isWarehouse) {
    // Warehouse: Green filled, "Load" text
    IconComponent = null; // Text instead
  } else if (stop.status === 'completed') {
    // Completed: Green filled, Check icon
    IconComponent = CheckIcon;
  } else if (stop.status === 'upcoming') {
    // Upcoming: Outline, Truck icon
    isFilled = false;
    IconComponent = LocalShippingIcon;
  } else if (stop.status === 'last_location') {
     // Last Location: Orange filled, Person icon
     IconComponent = PersonIcon;
  } else {
    // Others (Risk, Missing POD, etc): Filled (Red/Yellow), Truck icon
    IconComponent = LocalShippingIcon;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '80px' }}>
      {/* Timeline Column */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2, minWidth: '24px' }}>
        
        {/* The Dot/Icon */}
        <Box
          sx={{
            width: '24px',
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
            {stop.isWarehouse ? (
                <Typography variant="caption" sx={{ fontSize: '8px', fontWeight: 'bold' }}>Load</Typography>
            ) : (
                IconComponent && <IconComponent sx={{ fontSize: iconSize }} />
            )}
        </Box>

        {/* Vertical Line */}
        {!isLast && (
          <Box
            sx={{
              width: '2px',
              flexGrow: 1,
              bgcolor: '#E0E0E0',
              my: 0.5,
            }}
          />
        )}
      </Box>

      {/* Content Column */}
      <Box sx={{ pb: 3, flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '14px' }}>
            {stop.name}
            </Typography>
            {stop.badges && stop.badges.map((badge, index) => (
                <Chip 
                    key={index} 
                    label={badge} 
                    size="small" 
                    sx={{ 
                        height: '20px', 
                        fontSize: '10px', 
                        bgcolor: '#FFEBEE', 
                        color: '#D32F2F',
                        ml: 1
                    }} 
                />
            ))}
        </Box>
        
        <Typography variant="body2" sx={{ fontSize: '12px', color: 'text.secondary', mt: 0.5 }}>
          {stop.address}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Typography variant="caption" sx={{ fontSize: '11px', color: 'text.secondary' }}>
                {stop.time}
            </Typography>
             <Typography variant="caption" sx={{ fontSize: '11px', color: 'text.secondary' }}>
                {stop.timeWindow}
            </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
            <Typography variant="caption" sx={{ fontSize: '11px', color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
               📄 {stop.orders}
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '11px', color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
               📦 {stop.parcels}
            </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RouteStopItem;
