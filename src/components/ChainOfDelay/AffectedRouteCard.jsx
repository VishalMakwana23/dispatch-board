import React from 'react';
import { Paper, Box, Typography, Checkbox } from '@mui/material';
import { AccessTime, Person } from '@mui/icons-material';
import { format } from 'date-fns';

const AffectedRouteCard = ({ route, selected, onToggle }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: '10px',
        border: selected ? '1px solid #F26A2E' : '1px solid #E0E0E0',
        backgroundColor: selected ? '#FFF5F2' : '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.2s',
      }}
    >
      <Checkbox
        checked={selected}
        onChange={() => onToggle(route.id)}
        sx={{
          color: '#C4C4C4',
          '&.Mui-checked': {
            color: '#F26A2E',
          },
        }}
      />
      <Box sx={{ ml: 1, flex: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#333' }}>
          {route.id}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#888' }}>Pin Time</Typography>
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#555' }}>
              {format(new Date(route.pinTime), 'yyyy-MM-dd HH:mm a')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#888' }}>Assigned Driver</Typography>
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#555' }}>
              {route.driver}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default AffectedRouteCard;
