import React from 'react';
import { Box, Typography, IconButton, Paper, Divider, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RouteTimeline from '../RouteTimeline';
import { useDispatch } from 'react-redux';
import { clearSelectedStop } from '../../redux/slices/uiSlice';

const RoutePanel = ({ route, expanded, onToggle, onClose }) => {
  const dispatch = useDispatch();
  // Use route data directly
  const stops = route?.stops ? route.stops.map(stop => ({
    ...stop,
    isWarehouse: stop.type === 'warehouse',
    timeWindow: stop.window 
  })) : [];

  const details = route ? { ...route, stops } : null;

  if (!details) return null;

  const handleClose = (e) => {
    e.stopPropagation();
    dispatch(clearSelectedStop());
    onClose();
  };

  // Determine status color
  const statusColor = details.stops.find(s => s.isWarehouse)?.color || 'green';
  const colorMap = {
    green: '#107C41',
    yellow: '#E8A72B',
    orange: '#E67200',
    red: '#D24238',
    grey: '#AAAAAA',
  };
  const headerColor = colorMap[statusColor] || colorMap.green;
  // Prefer route.color if available (passed from routes.js), otherwise fallback to derived logic
  const borderColor = route.color || headerColor;

  return (
    <Paper
      elevation={3}
      sx={{
        width: '300px', // Further reduced width
        height: expanded ? 'calc(100vh - 100px)' : '60px', // Reduced collapsed height
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: expanded ? 'none' : `2px solid ${borderColor}`, // Colored border only when collapsed
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'height 0.3s ease-in-out', // Animate height
        flexShrink: 0, 
        position: 'relative',
        ml: 0, 
      }}
    >
      {/* Header */}
      <Box 
        sx={{ 
            p: 2, 
            pb: 1, 
            cursor: 'pointer',
            borderBottom: expanded ? '1px solid #e0e0e0' : 'none',
            height: expanded ? 'auto' : '100%',
            display: 'flex',
            alignItems: 'center', // Center vertically when collapsed
        }}
        onClick={onToggle}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
          
          {/* Title / ID Area */}
          <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-start',
              width: 'auto',
              gap: 0,
              mt: 0
          }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: expanded ? 0.5 : 0, flexDirection: 'row' }}>
                  <CircleIcon sx={{ color: headerColor, fontSize: 12 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '18px' }}>
                      {details.id}
                  </Typography>
              </Box>
              
              {/* Show "Current Routes Page" link ONLY when expanded */}
              {expanded && (
                  <Typography 
                      variant="caption" 
                      sx={{ 
                          color: 'text.secondary', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 0.5, 
                          cursor: 'pointer',
                          '&:hover': { textDecoration: 'underline' }
                      }}
                      onClick={(e) => e.stopPropagation()} 
                  >
                      Current Routes Page <OpenInNewIcon sx={{ fontSize: 12 }} />
                  </Typography>
              )}
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', flexDirection: expanded ? 'row' : 'column', gap: 1, alignItems: 'center' }}>
             <IconButton 
                onClick={(e) => { e.stopPropagation(); onToggle(); }} 
                size="small"
                sx={{ transform: expanded ? 'rotate(0deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
             >
               {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} 
             </IconButton>
             
             {/* Show Close Icon ONLY when expanded */}
             {expanded && (
                 <IconButton onClick={handleClose} size="small">
                   <CloseIcon />
                 </IconButton>
             )}
          </Box>
        </Box>
      </Box>

      {/* Content - Only visible when expanded */}
      <Box 
        sx={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            opacity: expanded ? 1 : 0,
            transition: 'opacity 0.2s ease-in-out',
            pointerEvents: expanded ? 'auto' : 'none',
            display: expanded ? 'block' : 'none' 
        }}
      >
         <RouteTimeline stops={details.stops} />
      </Box>
    </Paper>
  );
};

export default RoutePanel;
