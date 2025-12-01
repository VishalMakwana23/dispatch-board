import React from 'react';
import { Box, Typography, IconButton, Paper, Slide, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RouteStopItem from './RouteStopItem';
import { routeDetailsMock } from '../../mock/routeDetails';

const RouteDetailsDrawer = ({ route, open, onClose }) => {
  // Use mock details if available, otherwise fallback or empty
  // For the purpose of this task, we default to the first mock entry if the ID matches, 
  // or just use the first one as a generic fallback for any route to show the UI.
  const details = route ? (routeDetailsMock[route.id] || routeDetailsMock["123445677886544"]) : null;

  if (!details) return null;

  return (
    <Slide direction="right" in={open} mountOnEnter unmountOnExit>
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          left: '410px', // Sidebar (60) + RoutesPanel (350)
          top: 80, // Slightly below topbar or floating
          bottom: 20, // Margin from bottom
          width: '430px',
          zIndex: 1250, 
          backgroundColor: 'white',
          borderRadius: '12px', // All corners rounded
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2, pb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <CircleIcon sx={{ color: '#D24238', fontSize: 12 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '18px' }}>
                        {details.id}
                    </Typography>
                </Box>
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
                >
                    Current Routes Page <OpenInNewIcon sx={{ fontSize: 12 }} />
                </Typography>
            </Box>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        <Divider />

        {/* Content - Scrollable */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
          {details.stops.map((stop, index) => (
            <RouteStopItem
              key={stop.id}
              stop={stop}
              isFirst={index === 0}
              isLast={index === details.stops.length - 1}
            />
          ))}
        </Box>
      </Paper>
    </Slide>
  );
};

export default RouteDetailsDrawer;
