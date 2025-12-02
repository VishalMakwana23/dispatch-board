import React from 'react';
import { Paper, Box, Typography, Button, IconButton, Fade } from '@mui/material';
import { Warning, Close } from '@mui/icons-material';

const ChainOfDelayAlert = ({
  bigAlertVisible,
  miniAlertVisible,
  onCloseBigAlert,
  onOpenModal,
  onCloseMiniAlert,
  onReview,
  route
}) => {
  if (!bigAlertVisible && !miniAlertVisible) return null;

  return (
    <>
      {/* Large Alert */}
      <Fade in={bigAlertVisible} mountOnEnter unmountOnExit>
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            top: 90, // Below Topbar (64px) + spacing
            left: 'calc(50% + 205px)', // Center on map (Sidebar + RoutesPanel = 410px)
            transform: 'translateX(-50%)',
            zIndex: 1300,
            width: 'auto',
            minWidth: '600px',
            maxWidth: '90%',
            borderRadius: '12px',
            p: '16px 24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 2,
            backgroundColor: '#FFF5F5', // Light red background
            border: '1px solid #FECACA',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Close Button - Absolute Top Right */}
          <IconButton 
            onClick={onCloseBigAlert} 
            size="small" 
            sx={{ 
              position: 'absolute', 
              top: 8, 
              right: 8, 
              color: '#991B1B' 
            }}
          >
            <Close fontSize="small" />
          </IconButton>

          {/* Icon */}
          <Box
            sx={{
              flexShrink: 0,
              mt: 0.5
            }}
          >
             <Warning sx={{ color: '#B91C1C', fontSize: '2rem' }} />
          </Box>

          {/* Content */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#991B1B', fontSize: '1rem', mb: 0.5 }}>
              Chain of Delay
            </Typography>
            <Typography variant="body2" sx={{ color: '#450a0a', fontSize: '0.9rem', lineHeight: 1.5, mb: 2 }}>
              Mid-Mile Route <strong>{route?.id || 'MMKLIW2930439484'}</strong> is running <span style={{ color: '#B91C1C', fontWeight: 700 }}>{route?.delayMinutes || 30} minutes late</span>. <strong>10 final-mile routes</strong> are affected. Please review and act.
            </Typography>

            {/* Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1.5 }}>
              <Button
                onClick={onReview}
                sx={{
                  backgroundColor: '#FEE2E2',
                  color: '#991B1B',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  '&:hover': {
                    backgroundColor: '#FECACA',
                  },
                }}
              >
                Review
              </Button>
              <Button
                variant="contained"
                onClick={onOpenModal}
                sx={{
                  backgroundColor: '#B91C1C',
                  color: '#fff',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#991B1B',
                    boxShadow: 'none',
                  },
                }}
              >
                Action
              </Button>
            </Box>
          </Box>
        </Paper>
      </Fade>

      {/* Mini Alert */}
      <Fade in={miniAlertVisible && !bigAlertVisible} mountOnEnter unmountOnExit>
        <Paper
          elevation={3}
          onClick={onOpenModal}
          sx={{
            position: 'absolute',
            top: 90,
            left: 'calc(50% + 205px)',
            transform: 'translateX(-50%)',
            zIndex: 1200,
            borderRadius: '12px',
            px: 2,
            py: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            backgroundColor: '#FFF5F5',
            border: '1px solid #FECACA',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'translateX(-50%) scale(1.02)',
            },
          }}
        >
          <Warning sx={{ color: '#B91C1C', fontSize: '1.2rem' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#991B1B' }}>
            Chain of Delay
          </Typography>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onCloseMiniAlert();
            }}
            sx={{ ml: 1, p: 0.5, color: '#991B1B' }}
          >
            <Close fontSize="small" sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Paper>
      </Fade>
    </>
  );
};

export default ChainOfDelayAlert;
