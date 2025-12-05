import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import truckIcon from '../../assets/truck.svg';
import warehouseIcon from '../../assets/werehouse.svg';
import destinationIcon from '../../assets/Subtract.svg';
import doneIcon from '../../assets/done_all.svg'; // Using done_all for completed check
import nameIcon from '../../assets/name.svg'; // Using name icon for generic stop if needed, or we can use custom circles

const LegendItem = ({ color, label, icon, isOutline }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1.5 }}>
    <Box sx={{ 
        width: 24, 
        height: 24, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: isOutline ? 'white' : color,
        border: isOutline ? `2px solid ${color}` : 'none'
    }}>
        {icon && <img src={icon} alt="" style={{ width: 14, height: 14, filter: isOutline ? 'brightness(0)' : 'brightness(0) invert(1)' }} />}
    </Box>
    <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 500 }}>{label}</Typography>
  </Box>
);

const MapLegend = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        bottom: 24,
        right: 90, // Moved to the left of zoom controls (approx 60-70px width + margin)
        zIndex: 1000,
        p: 2,
        borderRadius: '12px',
        minWidth: '200px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <Box mb={1}>
        <LegendItem icon={warehouseIcon} color="#1A3C34" label="Warehouse" />
        <LegendItem icon={nameIcon} color="#107C41" label="Completed Stop" />
        <LegendItem icon={truckIcon} color="#E8A72B" label="Current Stop (Driver Here)" />
        <LegendItem icon={truckIcon} color="#AAAAAA" label="Upcoming Stop" isOutline /> 
      </Box>
    </Paper>
  );
};

export default MapLegend;
