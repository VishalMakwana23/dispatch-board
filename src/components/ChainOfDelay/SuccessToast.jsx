import React, { useEffect } from 'react';
import { Paper, Box, Typography, IconButton, Slide, Fade } from '@mui/material';
import { CheckCircle, Close } from '@mui/icons-material';

const SuccessToast = ({ open, onClose, message, subMessage }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Paper
        elevation={6}
        sx={{
          position: 'fixed',
          bottom: 24,
          left: 24, // "Slide in from bottom-left"
          zIndex: 2000,
          backgroundColor: '#0B3B32', // Dark green
          color: '#FFFFFF',
          borderRadius: '12px',
          p: 2,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
          minWidth: '300px',
          maxWidth: '400px',
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
        }}
      >
        <CheckCircle sx={{ color: '#4CAF50', mt: 0.5 }} /> {/* Lighter green for icon */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
            {message || "Success!"}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', display: 'block', mt: 0.5 }}>
            {subMessage || "Today 10:30PM"}
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={onClose}
          sx={{ color: 'rgba(255, 255, 255, 0.6)', p: 0.5, '&:hover': { color: '#FFF' } }}
        >
          <Close fontSize="small" />
        </IconButton>
      </Paper>
    </Slide>
  );
};

export default SuccessToast;
