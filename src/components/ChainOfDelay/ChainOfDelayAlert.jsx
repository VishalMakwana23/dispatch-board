import React from 'react';
import { Paper, Box, Typography, Button, IconButton, Fade } from '@mui/material';
import { Warning, Close, KeyboardArrowDown } from '@mui/icons-material';

const ChainOfDelayAlert = ({
  bigAlertVisible,
  buttonVisible,
  onCloseBigAlert,
  onOpenModal,
  onReview,
  route,
  isCollapsed = true // Default to collapsed if not provided
}) => {
  if (!bigAlertVisible && !buttonVisible) return null;

  // Calculate dynamic left position
  // Sidebar (65/240) + RoutesPanel (350) + Padding (e.g., 20px)
  const baseLeft = (isCollapsed ? 65 : 240) + 350;
  const alertLeft = `${baseLeft + 20}px`; // Add some padding

  return (
    <>
      {/* Large Alert */}
      <Fade in={bigAlertVisible} mountOnEnter unmountOnExit>
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            top: 90, // Below Topbar (64px) + spacing
            left: alertLeft, // Dynamic left
            // transform: 'translateX(-50%)', // Removed centering logic as we want it relative to panel
            zIndex: 1300,
            width: 'auto',
            minWidth: '600px',
            maxWidth: 'calc(100vw - ' + alertLeft + ' - 20px)', // Prevent overflow
            borderRadius: '12px',
            p: '16px 24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 2,
            backgroundColor: '#FFF5F5', // Light red background
            border: '1px solid #FECACA',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
            transition: 'left 0.3s ease', // Smooth transition
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

      {/* Button Alert (Dropdown Style) */}
      <Fade in={buttonVisible} mountOnEnter unmountOnExit>
        <Button
          variant="contained"
          onClick={onOpenModal}
          endIcon={<KeyboardArrowDown sx={{ color: '#B91C1C' }} />}
          startIcon={<Warning sx={{ color: '#B91C1C' }} />}
          sx={{
            position: 'absolute',
            top: 80,
            left: alertLeft, // Dynamic left
            zIndex: 1200,
            backgroundColor: '#FFF5F5',
            color: '#991B1B',
            border: '1px solid #FECACA',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
            px: 2,
            py: 1,
            transition: 'left 0.3s ease', // Smooth transition
            '&:hover': {
              backgroundColor: '#FEE2E2',
              boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
            },
          }}
        >
          Chain of Delay
        </Button>
      </Fade>
    </>
  );
};

export default ChainOfDelayAlert;
