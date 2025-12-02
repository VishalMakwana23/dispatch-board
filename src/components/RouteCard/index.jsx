import React from 'react';
import { Card, CardContent, Typography, Box, Chip, IconButton, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WarningIcon from '@mui/icons-material/Warning';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MapIcon from '@mui/icons-material/Map';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const RouteCard = ({ route, onClick, selected }) => {
  const isRisk = route.riskOfDelay;
  const isCoded = route.statusCoded;

  // Determine border color based on route color or status
  const borderColor = route.color || (isCoded ? '#D32F2F' : isRisk ? '#ED6C02' : '#2E7D32');

  return (
    <Card 
      sx={{ 
        mb: 2, 
        position: 'relative', 
        overflow: 'visible', 
        cursor: 'pointer',
        border: selected ? `2px solid ${borderColor}` : '1px solid transparent', // Dynamic border color
        boxShadow: selected ? `0 0 0 1px ${borderColor}` : undefined 
      }} 
      onClick={onClick}
    >
      {/* Left colored border indicator */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '4px',
          backgroundColor: isCoded ? '#D32F2F' : isRisk ? '#ED6C02' : '#2E7D32',
          borderTopLeftRadius: '10px',
          borderBottomLeftRadius: '10px',
        }}
      />
      
      <CardContent sx={{ pl: 2, pr: 2, pt: 1.5, pb: 1.5, '&:last-child': { pb: 1.5 } }}>
        {/* Header: Status Badges */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {route.missingPod && (
               <Chip 
                 label="Missing POD" 
                 size="small" 
                 sx={{ 
                   height: 20, 
                   fontSize: '0.65rem', 
                   backgroundColor: '#FFEBEE', 
                   color: '#D32F2F',
                   fontWeight: 600
                 }} 
                 icon={<WarningIcon style={{ fontSize: 12, color: '#D32F2F' }} />}
               />
            )}
            {route.riskOfDelay && (
               <Chip 
                 label="Risk of Delay" 
                 size="small" 
                 sx={{ 
                   height: 20, 
                   fontSize: '0.65rem', 
                   backgroundColor: '#FFF3E0', 
                   color: '#ED6C02',
                   fontWeight: 600
                 }} 
                 icon={<AccessTimeIcon style={{ fontSize: 12, color: '#ED6C02' }} />}
               />
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
             <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: isCoded ? '#ED6C02' : '#2E7D32' }} />
             <Typography variant="caption" sx={{ fontWeight: 600, color: isCoded ? '#ED6C02' : '#2E7D32' }}>
               {route.status}
             </Typography>
          </Box>
        </Box>

        {/* Route ID */}
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          {route.id}
        </Typography>

        {/* Stats Row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
           <Box>
             <Typography variant="caption" color="text.secondary" display="block">Type</Typography>
             <Typography variant="body2" fontWeight="600">{route.type}</Typography>
           </Box>
           <Box>
             <Typography variant="caption" color="text.secondary" display="block">Stops</Typography>
             <Typography variant="body2" fontWeight="600">{route.stops}</Typography>
           </Box>
           <Box>
             <Typography variant="caption" color="text.secondary" display="block">Orders</Typography>
             <Typography variant="body2" fontWeight="600">{route.orders}</Typography>
           </Box>
           <Box>
             <Typography variant="caption" color="text.secondary" display="block">Distance</Typography>
             <Typography variant="body2" fontWeight="600">{route.distance}</Typography>
           </Box>
        </Box>

        <Divider sx={{ mb: 1.5 }} />

        {/* Driver Info */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">Driver</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" fontWeight="600">{route.driver}</Typography>
              <ArrowDropDownIcon fontSize="small" color="action" />
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.65rem', mt: 0.5 }}>
              {route.company}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small" sx={{ bgcolor: '#E0F2F1', color: '#00695C', borderRadius: 1 }}>
              <MapIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ bgcolor: '#E0F2F1', color: '#00695C', borderRadius: 1 }}>
              <AssignmentIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RouteCard;
