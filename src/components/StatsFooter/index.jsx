import React, { useState, useMemo } from 'react';
import { Box, Paper, Typography, Divider, IconButton, Collapse } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

const StatItem = ({ value, label, subLabel, icon, color }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: '140px' }}>
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>{value}</Typography>
      {subLabel && <Typography variant="body2" color="text.secondary">/ {subLabel}</Typography>}
    </Box>
    {icon ? (
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 0.5, 
          border: `1px solid ${color}`, 
          borderRadius: '4px', 
          px: 1, 
          py: 0.5,
          mt: 1,
          width: '100%'
        }}
      >
        {React.cloneElement(icon, { sx: { fontSize: 16, color: color } })}
        <Typography variant="caption" sx={{ fontWeight: 600, color: color, whiteSpace: 'nowrap', fontSize: '0.75rem' }}>
          {label}
        </Typography>
      </Box>
    ) : (
      <Box 
        sx={{ 
          mt: 1, 
          bgcolor: color ? `${color}20` : 'transparent', 
          px: 1.5, 
          py: 0.5, 
          borderRadius: 1 
        }}
      >
         <Typography variant="caption" sx={{ fontWeight: 600, color: color || 'text.secondary', fontSize: '0.75rem' }}>
           {label}
         </Typography>
      </Box>
    )}
  </Box>
);

const StatsFooter = ({ routes = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const stats = useMemo(() => {
    const total = routes.length;
    const completed = routes.filter(r => r.status === 'Completed').length;
    const riskOfDelay = routes.filter(r => r.riskOfDelay).length;
    const statusCoded = routes.filter(r => r.statusCoded).length;
    const trackingOnTime = total - riskOfDelay - statusCoded; // Simplified logic based on assumption

    return {
      total,
      completed,
      riskOfDelay,
      statusCoded,
      trackingOnTime
    };
  }, [routes]);

  if (!isExpanded) {
    return (
      <Box
        onClick={() => setIsExpanded(true)}
        sx={{
          position: 'fixed',
          bottom: 30,
          left: 'calc(50% + 215px)', // Center on map (assuming 430px sidebar)
          transform: 'translateX(-50%)',
          bgcolor: 'black',
          color: 'white',
          py: 1,
          px: 3,
          borderRadius: '24px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          zIndex: 1000,
          boxShadow: '0px 4px 20px rgba(0,0,0,0.2)',
        }}
      >
        <DonutLargeIcon fontSize="small" color="inherit" />
        <Typography variant="subtitle2" fontWeight="600">Performance</Typography>
        <KeyboardDoubleArrowUpIcon fontSize="small" color="inherit" />
      </Box>
    );
  }

  return (
    <Box
        sx={{
            position: 'fixed',
            bottom: 30,
            left: 'calc(50% + 215px)', // Center on map
            transform: 'translateX(-50%)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 'fit-content',
            maxWidth: '90vw',
        }}
    >
        {/* Header Tab */}
        <Box
            onClick={() => setIsExpanded(false)}
            sx={{
                bgcolor: 'white',
                py: 0.5,
                px: 3,
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                boxShadow: '0px -2px 5px rgba(0,0,0,0.05)',
                mb: -1, // Overlap slightly
                zIndex: 3,
                border: '1px solid #eee',
                borderBottom: 'none'
            }}
        >
            <DonutLargeIcon fontSize="small" color="action" />
            <Typography variant="subtitle2" fontWeight="600" color="text.primary">Performance</Typography>
            <KeyboardDoubleArrowDownIcon fontSize="small" color="action" />
        </Box>

        <Paper
        elevation={3}
        sx={{
            width: '100%',
            height: '120px', // Increased height
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            px: 5, // Increased horizontal padding
            gap: 2, // Added gap between items
            position: 'relative',
            zIndex: 2,
            boxShadow: '0px 4px 20px rgba(0,0,0,0.1)'
        }}
        >
        <StatItem value={stats.total} label="Overall routes" color="#1C6E63" />
        <Divider orientation="vertical" flexItem sx={{ height: '60px', alignSelf: 'center' }} />
        
        <StatItem value="98%" label="OTDP" color="#1C6E63" />
        <Divider orientation="vertical" flexItem sx={{ height: '60px', alignSelf: 'center' }} />
        
        <StatItem 
            value={stats.completed} 
            subLabel={stats.total} 
            label="Routes - Completed" 
            icon={<CheckCircleIcon />} 
            color="#2E7D32" 
        />
        <Divider orientation="vertical" flexItem sx={{ height: '60px', alignSelf: 'center' }} />
        
        <StatItem 
            value={stats.trackingOnTime} 
            subLabel={stats.total} 
            label="Routes - Tracking on time" 
            icon={<AccessTimeIcon />} 
            color="#2E7D32" 
        />
        <Divider orientation="vertical" flexItem sx={{ height: '60px', alignSelf: 'center' }} />
        
        <StatItem 
            value={stats.riskOfDelay} 
            subLabel={stats.total} 
            label="Routes - Risk of delay" 
            icon={<WarningIcon />} 
            color="#D32F2F" 
        />
        <Divider orientation="vertical" flexItem sx={{ height: '60px', alignSelf: 'center' }} />
        
        <StatItem 
            value={stats.statusCoded} 
            subLabel={stats.total} 
            label="Routes - Status coded" 
            icon={<ErrorIcon />} 
            color="#ED6C02" 
        />
        </Paper>
    </Box>
  );
};

export default StatsFooter;
