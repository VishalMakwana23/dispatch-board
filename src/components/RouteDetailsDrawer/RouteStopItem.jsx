import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import PersonIcon from '@mui/icons-material/Person';
import truckIcon from '../../assets/truck.svg';
import nameIcon from '../../assets/name.svg';
import userIcon from '../../assets/Subtract.svg';
import warehouseIcon from '../../assets/werehouse.svg'; // Assuming this exists or similar

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
  let iconBgColor = isFilled ? color : 'white';
  let iconBorderColor = color;

  if (stop.isWarehouse) {
    // Warehouse: Green filled, Warehouse icon
    IconElement = <img src={warehouseIcon} alt="Warehouse" style={{ width: '14px', height: '14px', filter: 'brightness(0) invert(1)' }} />;
  } else if (stop.status === 'last_location' || isLast) {
     // Last Location / Last Stop: Orange filled, User icon
     IconElement = <img src={userIcon} alt="User" style={{ width: '14px', height: '14px', filter: 'brightness(0) invert(1)' }} />;
  } else if (stop.status === 'completed') {
    // Completed: Green filled, name icon (or checkmark?) Design shows checkmark or similar? 
    // Image shows "Name" with green circle and white icon inside.
    IconElement = <img src={nameIcon} alt="Completed" style={{ width: '14px', height: '14px', filter: 'brightness(0) invert(1)' }} />;
  } else if (stop.status === 'upcoming' || stop.status === 'pending') {
    // Upcoming: Outline, Truck icon
    isFilled = false;
    iconBgColor = 'white';
    // Icon needs to be colored (e.g. green or grey)
    IconElement = <img src={truckIcon} alt="Truck" style={{ width: '14px', height: '14px', filter: 'brightness(0)' }} />; 
  } else {
    // Others: Truck icon default (filled)
    IconElement = <img src={truckIcon} alt="Truck" style={{ width: '14px', height: '14px', filter: 'brightness(0) invert(1)' }} />;
  }

  // Override for specific design in image:
  // Warehouse: Green Circle with Warehouse Icon
  // Stops: Green Circle with Initials/Icon? Or just generic icon.
  // The image shows:
  // - Start: Green Circle with "Load" or Warehouse Icon
  // - Middle: Green Circle with "Name" icon (person?)
  // - End: Orange Circle with House/User icon
  // - Connecting line: Green (if completed) or Grey/Dotted? Image shows solid green line.

  return (
    <Box sx={{ display: 'flex', minHeight: '80px' }}> 
      {/* Timeline Column */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2, minWidth: '32px' }}> 
        
        {/* The Dot/Icon */}
        <Box
          sx={{
            width: '32px', 
            height: '32px',
            borderRadius: '50%',
            backgroundColor: iconBgColor,
            border: `2px solid ${iconBorderColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            color: isFilled ? 'white' : color,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
            {IconElement}
        </Box>

        {/* Vertical Line */}
        {!isLast && (
          <Box
            sx={{
              width: '3px',
              flexGrow: 1,
              bgcolor: routeColor || STATUS_COLORS.green, // Consistent line color
              my: 0,
            }}
          />
        )}
      </Box>

      {/* Content Column */}
      <Box sx={{ pb: 3, flexGrow: 1 }}> 
        <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '15px', lineHeight: 1.2, mb: 0.5 }}>
          {stop.name}
        </Typography>
        
        <Typography variant="body2" sx={{ fontSize: '13px', color: '#555', mb: 1, lineHeight: 1.4 }}>
          {stop.address}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="caption" sx={{ fontSize: '12px', color: '#888' }}>
                {stop.time}
            </Typography>
             <Typography variant="caption" sx={{ fontSize: '12px', color: '#888' }}>
                {stop.timeWindow}
            </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Typography variant="caption" sx={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 500 }}>
               📄 {stop.orders} Orders
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 500 }}>
               📦 {stop.parcels} Items
            </Typography>
        </Box>
        
        {/* Badges */}
        {stop.badges && stop.badges.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                {stop.badges.map((badge, index) => (
                    <Chip 
                        key={index} 
                        label={badge} 
                        size="small" 
                        sx={{ 
                            height: '20px', 
                            fontSize: '10px', 
                            fontWeight: 600,
                            bgcolor: '#FFEBEE', 
                            color: '#D32F2F',
                            borderRadius: '4px'
                        }} 
                    />
                ))}
            </Box>
        )}
      </Box>
    </Box>
  );
};

export default RouteStopItem;
