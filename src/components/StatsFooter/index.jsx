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
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          bgcolor: 'black',
          color: 'white',
          py: 1,
          px: 3,
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          zIndex: 1000,
          boxShadow: '0px -2px 10px rgba(0,0,0,0.2)'
        }}
      >
        <DonutLargeIcon fontSize="small" />
        <Typography variant="subtitle2" fontWeight="600">Performance</Typography>
        <KeyboardDoubleArrowUpIcon fontSize="small" />
      </Box>
    );
  }

  return (
    <Box
        sx={{
            position: 'fixed',
            bottom: 0,
            left: '430px',
            right: 20,
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
                zIndex: 1,
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
            height: '80px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            px: 3,
            position: 'relative',
            zIndex: 2
        }}
        >
        <StatItem value={stats.total} label="Overall routes" color="#1C6E63" />
        <Divider orientation="vertical" flexItem sx={{ height: '40px', alignSelf: 'center' }} />
        
        <StatItem value="98%" label="OTDP" color="#1C6E63" />
        <Divider orientation="vertical" flexItem sx={{ height: '40px', alignSelf: 'center' }} />
        
        <StatItem 
            value={stats.completed} 
            subLabel={stats.total} 
            label="Routes - Completed" 
            icon={<CheckCircleIcon />} 
            color="#2E7D32" 
        />
        <Divider orientation="vertical" flexItem sx={{ height: '40px', alignSelf: 'center' }} />
        
        <StatItem 
            value={stats.trackingOnTime} 
            subLabel={stats.total} 
            label="Routes - Tracking on time" 
            icon={<AccessTimeIcon />} 
            color="#2E7D32" 
        />
        <Divider orientation="vertical" flexItem sx={{ height: '40px', alignSelf: 'center' }} />
        
        <StatItem 
            value={stats.riskOfDelay} 
            subLabel={stats.total} 
            label="Routes - Risk of delay" 
            icon={<WarningIcon />} 
            color="#D32F2F" 
        />
        <Divider orientation="vertical" flexItem sx={{ height: '40px', alignSelf: 'center' }} />
        
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
