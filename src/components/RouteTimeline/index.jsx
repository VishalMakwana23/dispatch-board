import React from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectStop } from '../../redux/slices/uiSlice';
import RouteStopItem from '../RouteDetailsDrawer/RouteStopItem'; // Reusing existing component for now

const RouteTimeline = ({ stops, isAdmin = false }) => {
  const dispatch = useDispatch();
  const selectedStopId = useSelector((state) => state.ui.selectedStopId);

  return (
    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
      {stops.map((stop, index) => (
        <RouteStopItem
          key={stop.id}
          stop={stop}
          isFirst={index === 0}
          isLast={index === stops.length - 1}
          isSelected={selectedStopId === stop.id}
          onSelect={() => dispatch(selectStop(stop.id))}
          isAdmin={isAdmin}
        />
      ))}
    </Box>
  );
};

export default RouteTimeline;
