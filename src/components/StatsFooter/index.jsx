import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

const StatItem = ({ value, label, subLabel, icon, color }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: '120px' }}>
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>{value}</Typography>
      {subLabel && <Typography variant="caption" color="text.secondary">/ {subLabel}</Typography>}
    </Box>
    {icon ? (
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 0.5, 
          border: `1px solid ${color}`, 
          borderRadius: '4px', 
          px: 0.5, 
          py: 0.2,
          mt: 0.5,
          width: '100%'
        }}
      >
        {React.cloneElement(icon, { sx: { fontSize: 14, color: color } })}
        <Typography variant="caption" sx={{ fontWeight: 600, color: color, whiteSpace: 'nowrap' }}>
          {label}
        </Typography>
      </Box>
    ) : (
      <Box 
        sx={{ 
          mt: 0.5, 
          bgcolor: color ? `${color}20` : 'transparent', 
          px: 1, 
          py: 0.2, 
          borderRadius: 1 
        }}
      >
         <Typography variant="caption" sx={{ fontWeight: 600, color: color || 'text.secondary' }}>
           {label}
         </Typography>
      </Box>
    )}
  </Box>
);

const StatsFooter = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 20,
        left: '430px', // Sidebar (60) + RoutesPanel (350) + 20 gap
        right: 20,
        height: '80px',
        zIndex: 1000,
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        px: 3,
      }}
    >
      <StatItem value="180" label="Overall routes" color="#1C6E63" />
      <Divider orientation="vertical" flexItem sx={{ height: '40px', alignSelf: 'center' }} />
      
      <StatItem value="98%" label="OTDP" color="#1C6E63" />
      <Divider orientation="vertical" flexItem sx={{ height: '40px', alignSelf: 'center' }} />
      
      <StatItem 
        value="150" 
        subLabel="180" 
        label="Routes - Completed" 
        icon={<CheckCircleIcon />} 
        color="#2E7D32" 
      />
      <Divider orientation="vertical" flexItem sx={{ height: '40px', alignSelf: 'center' }} />
      
      <StatItem 
        value="25" 
        subLabel="150" 
        label="Routes - Tracking on time" 
        icon={<AccessTimeIcon />} 
        color="#2E7D32" 
      />
      <Divider orientation="vertical" flexItem sx={{ height: '40px', alignSelf: 'center' }} />
      
      <StatItem 
        value="3" 
        subLabel="150" 
        label="Routes - Risk of delay" 
        icon={<WarningIcon />} 
        color="#D32F2F" 
      />
      <Divider orientation="vertical" flexItem sx={{ height: '40px', alignSelf: 'center' }} />
      
      <StatItem 
        value="2" 
        subLabel="180" 
        label="Routes - Status coded" 
        icon={<ErrorIcon />} 
        color="#ED6C02" 
      />
    </Paper>
  );
};

export default StatsFooter;
