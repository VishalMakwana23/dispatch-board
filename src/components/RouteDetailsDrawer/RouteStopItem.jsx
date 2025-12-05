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

const RouteStopItem = ({ stop, isLast, isFirst, routeColor, isSelected, onSelect }) => {
  const color = STATUS_COLORS[stop.color] || STATUS_COLORS.grey;
  
  // Determine Icon and Fill
  let IconElement = null;
  let isFilled = true;
  let iconBgColor = isFilled ? color : 'white';
  let iconBorderColor = color;

  if (stop.isWarehouse) {
    IconElement = <img src={warehouseIcon} alt="Warehouse" style={{ width: '14px', height: '14px', filter: 'brightness(0) invert(1)' }} />;
  } else if (stop.status === 'last_location' || isLast) {
     IconElement = <img src={userIcon} alt="User" style={{ width: '14px', height: '14px', filter: 'brightness(0) invert(1)' }} />;
  } else if (stop.status === 'completed') {
    IconElement = <img src={nameIcon} alt="Completed" style={{ width: '14px', height: '14px', filter: 'brightness(0) invert(1)' }} />;
  } else if (stop.status === 'ongoing') {
      // Show Truck Icon? Or just standard icon? 
      // Requirement says "Place driver marker... on the ongoing stop".
      // Sidebar should also show it.
      IconElement = <img src={truckIcon} alt="Truck" style={{ width: '14px', height: '14px', filter: 'brightness(0) invert(1)' }} />;
  } else if (stop.status === 'upcoming' || stop.status === 'pending') {
    isFilled = false;
    iconBgColor = 'white';
    IconElement = <img src={truckIcon} alt="Truck" style={{ width: '14px', height: '14px', filter: 'brightness(0)' }} />; 
  } else {
    IconElement = <img src={truckIcon} alt="Truck" style={{ width: '14px', height: '14px', filter: 'brightness(0) invert(1)' }} />;
  }

  // Vertical Line Color Logic
  let lineColor = STATUS_COLORS.grey; // Default
  if (stop.status === 'completed') {
      lineColor = STATUS_COLORS.green;
  } else if (stop.status === 'ongoing') {
      lineColor = STATUS_COLORS.yellow;
  } else {
      lineColor = STATUS_COLORS.grey;
  }

  return (
    <Box 
        onClick={onSelect}
        sx={{ 
            display: 'flex', 
            minHeight: '80px',
            cursor: 'pointer',
            p: 1,
            borderRadius: '8px',
            bgcolor: isSelected ? '#F5F9FF' : 'transparent', // More distinct blue tint
            border: isSelected ? '1px solid #1976D2' : '1px solid transparent', // Add border
            transition: 'all 0.2s',
            '&:hover': {
                bgcolor: isSelected ? '#F5F9FF' : 'rgba(0,0,0,0.02)'
            }
        }}
    > 
      {/* Timeline Column */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2, minWidth: '32px' }}> 
        
        {/* The Dot/Icon */}
        <Box
          sx={{
            width: isSelected ? '36px' : '32px', 
            height: isSelected ? '36px' : '32px',
            borderRadius: '50%',
            backgroundColor: iconBgColor,
            border: `2px solid ${iconBorderColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            color: isFilled ? 'white' : color,
            boxShadow: isSelected ? '0 0 0 4px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
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
              bgcolor: lineColor,
              opacity: stop.status === 'pending' ? 0.3 : 1, // Optional: make grey line lighter
              borderRadius: '2px', // Rounded line ends
              my: 0.5, // Tiny gap from dot
            }}
          />
        )}
      </Box>

      {/* Content Column */}
      <Box sx={{ pb: 3, flexGrow: 1 }}> 
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
             <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '15px', lineHeight: 1.2, mb: 0.5 }}>
                {stop.name}
            </Typography>
            {stop.status === 'ongoing' && (
                <Chip icon={<img src={truckIcon} style={{width: 12, height: 12, filter: 'brightness(0) invert(1)'}} />} label="Driver Here" size="small" sx={{ height: 20, fontSize: '10px', bgcolor: '#E8A72B', color: 'white' }} />
            )}
        </Box>
       
        
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
