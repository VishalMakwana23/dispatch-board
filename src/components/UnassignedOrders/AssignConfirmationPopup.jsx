import React from 'react';
import { Paper, Box, Typography, Button, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Or the custom orange one if needed

const AssignConfirmationPopup = ({ route, order, onConfirm, onCancel }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // Centered on map/screen as per screenshot it looks centered or slightly offset. 
        // Actually in the screenshot it's floating on the map. Let's center it for now or use fixed position.
        // The screenshot shows it roughly in the center of the map view.
        width: '400px',
        borderRadius: '16px',
        p: 3,
        zIndex: 1100,
        bgcolor: '#fff',
        fontFamily: 'Montserrat',
        boxShadow: '0px 4px 20px rgba(0,0,0,0.15)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="#FF6300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="9" r="3" fill="#FF6300"/>
          </svg>
        </Box>
        <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600, fontFamily: 'Montserrat' }}>
          Add unassigned order to route
        </Typography>
      </Box>

      {/* Route Details Card */}
      <Paper
        elevation={0}
        sx={{
          border: '1px solid #E0E0E0',
          borderRadius: '12px',
          p: 2,
          mb: 3
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '14px' }}>
            {route.routeId}
          </Typography>
          <Typography variant="caption" sx={{ color: '#FF6300', fontWeight: 600, fontSize: '12px' }}>
            20 mins away
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', fontSize: '10px' }}>Pin Time</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '12px' }}>2025-12-25 - 11:00:00AM</Typography>
            </Box>
            <Box>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', fontSize: '10px' }}>Assigned Driver</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '12px' }}>{route.driver}</Typography>
            </Box>
            <Box>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', fontSize: '10px' }}>Stop Sequence</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '12px' }}>4</Typography>
            </Box>
        </Box>
      </Paper>

      {/* Buttons */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={onCancel}
          sx={{
            borderRadius: '24px',
            borderColor: '#333',
            color: '#333',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { borderColor: '#000', bgcolor: '#f5f5f5' }
          }}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={onConfirm}
          sx={{
            borderRadius: '24px',
            bgcolor: '#1B3E38',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { bgcolor: '#142e29' }
          }}
        >
          Confirm
        </Button>
      </Box>
    </Paper>
  );
};

export default AssignConfirmationPopup;
