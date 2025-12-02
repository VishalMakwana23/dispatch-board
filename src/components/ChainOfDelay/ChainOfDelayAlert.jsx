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
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1300,
            width: '90%',
            maxWidth: '1000px',
            borderRadius: '12px',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFF0F0', // Light red background for alert
            border: '1px solid #F8D7DA',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: '#FFE5E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Warning sx={{ color: '#D24A43' }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#D24A43', fontSize: '1rem' }}>
                Chain of Delay
              </Typography>
              <Typography variant="body2" sx={{ color: '#333', fontSize: '0.9rem' }}>
                Mid-Mile Route <strong>{route?.id || 'MMKLIW2930439484'}</strong> is running <span style={{ color: '#D24A43', fontWeight: 600 }}>{route?.delayMinutes || 30} minutes late</span>. <strong>10 final-mile routes</strong> are affected. Please review and act.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={onReview}
              sx={{
                borderColor: '#D24A43',
                color: '#D24A43',
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#B03E38',
                  backgroundColor: '#FFF5F5',
                },
              }}
            >
              Review
            </Button>
            <Button
              variant="contained"
              onClick={onOpenModal}
              sx={{
                backgroundColor: '#D24A43',
                color: '#fff',
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#B03E38',
                  boxShadow: 'none',
                },
              }}
            >
              Action
            </Button>
            <IconButton onClick={onCloseBigAlert} size="small" sx={{ ml: 1 }}>
              <Close fontSize="small" />
            </IconButton>
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
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1200,
            borderRadius: '12px',
            px: 2,
            py: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            backgroundColor: '#FFF0F0',
            border: '1px solid #F8D7DA',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'translateX(-50%) scale(1.02)',
            },
          }}
        >
          <Warning sx={{ color: '#D24A43', fontSize: '1.2rem' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#D24A43' }}>
            Chain of Delay
          </Typography>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onCloseMiniAlert();
            }}
            sx={{ ml: 1, p: 0.5 }}
          >
            <Close fontSize="small" sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Paper>
      </Fade>
    </>
  );
};

export default ChainOfDelayAlert;
