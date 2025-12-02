import React from 'react';
import { Box } from '@mui/material';
import RouteStopItem from '../RouteDetailsDrawer/RouteStopItem'; // Reusing existing component for now

const RouteTimeline = ({ stops }) => {
  return (
    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
      {stops.map((stop, index) => (
        <RouteStopItem
          key={stop.id}
          stop={stop}
          isFirst={index === 0}
          isLast={index === stops.length - 1}
        />
      ))}
    </Box>
  );
};

export default RouteTimeline;
