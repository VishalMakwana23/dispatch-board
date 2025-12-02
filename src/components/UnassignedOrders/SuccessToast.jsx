import React, { useEffect } from 'react';
import { Paper, Box, Typography, IconButton } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

const SuccessToast = ({ message, routeId, onClose }) => {
  // Auto-hide after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getCurrentTime = () => {
    const now = new Date();
    // Format: Today 10:30PM
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    return `Today ${hours}:${minutes}${ampm}`;
  };

  return (
    <Paper
      elevation={6}
      sx={{
        position: 'absolute',
        bottom: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        bgcolor: '#1B3E38', // Dark Green
        color: '#fff',
        borderRadius: '12px',
        p: 2,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        minWidth: '450px',
        zIndex: 2000, // High z-index to sit on top of map
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        fontFamily: 'Montserrat',
      }}
    >
      <CheckCircleOutlineIcon sx={{ color: '#4CAF50', mt: 0.5 }} /> {/* Green check */}
      
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '14px', lineHeight: 1.4 }}>
          {message}
          <br />
          <span style={{ textDecoration: 'underline', fontWeight: 600 }}>{routeId}</span>
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.7, fontSize: '11px' }}>
          {getCurrentTime()}
        </Typography>
      </Box>

      <IconButton size="small" onClick={onClose} sx={{ color: 'rgba(255,255,255,0.7)', p: 0 }}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
};

export default SuccessToast;
