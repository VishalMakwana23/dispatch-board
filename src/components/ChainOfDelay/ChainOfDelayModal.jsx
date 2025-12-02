import React, { useState, useEffect } from 'react';
import {
  Dialog,
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  IconButton,
  Paper,
  Radio
} from '@mui/material';
import { Close, ChevronRight, Warning } from '@mui/icons-material';
import { format } from 'date-fns';
import AffectedRouteCard from './AffectedRouteCard';
import ChainDelayNotificationPanel from './ChainDelayNotificationPanel';

const ChainOfDelayModal = ({
  open,
  onClose,
  mainRoute,
  affectedRoutes,
  statusCodes,
  selectedAffectedRoutes,
  setSelectedAffectedRoutes,
  selectedStatusCode,
  setSelectedStatusCode,
  comment,
  setComment,
  onConfirm,
  // New props
  onSendNotifications, 
  onConfirmSendNotifications, 
  onConfirmCustomerMessage, 
}) => {
  // Steps: 'main' (Status Code), 'notifications'
  const [step, setStep] = useState('main');
  
  // Notification State
  const [selectedRecipients, setSelectedRecipients] = useState({});
  const [selectedChannel, setSelectedChannel] = useState('email');
  const [customerMessage, setCustomerMessage] = useState(
    "Hi John,\nwe are experiencing delays due to severe weather conditions in SouthWest Calgary.\nAll the deliveries are moved forward to Nov 25, 2025."
  );

  useEffect(() => {
    if (open) {
      setStep('main');
      setSelectedRecipients({});
    }
  }, [open]);

  const handleToggleRoute = (id) => {
    if (selectedAffectedRoutes.includes(id)) {
      setSelectedAffectedRoutes(selectedAffectedRoutes.filter((r) => r !== id));
    } else {
      setSelectedAffectedRoutes([...selectedAffectedRoutes, id]);
    }
  };

  const handleApplyStatusCodeClick = () => {
    setStep('main');
  };

  const handleSendNotificationsClick = () => {
    setStep('notifications');
  };

  const handleToggleRecipient = (id) => {
    setSelectedRecipients(prev => {
      const newState = { ...prev };
      if (newState[id]) delete newState[id];
      else newState[id] = true;
      return newState;
    });
  };

  // Unified Confirm Handler
  const handleConfirmAction = () => {
    if (step === 'main') {
      onConfirm();
    } else if (step === 'notifications') {
      if (selectedRecipients['customers']) {
        onConfirmCustomerMessage(customerMessage, selectedChannel);
      } else {
        onConfirmSendNotifications(selectedRecipients);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FEFDFB 100%)',
          height: '80vh',
          maxHeight: '800px',
        },
      }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Warning sx={{ color: '#D24A43' }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#D24A43' }}>
              Chain of Delay
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Grid container spacing={4} sx={{ flex: 1, overflow: 'hidden' }}>
          {/* Left Panel: Route Info & Affected Routes */}
          <Grid item xs={12} md={5} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 3,
                border: '1px solid #E0E0E0',
                borderRadius: '10px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="h6" sx={{ color: '#D24A43', fontWeight: 700, fontSize: '1.1rem' }}>
                  {mainRoute.id}
                </Typography>
                <Typography variant="caption" sx={{ color: '#D24A43', fontWeight: 700, bgcolor: '#FFF0F0', px: 1, py: 0.5, borderRadius: '4px' }}>
                  {mainRoute.delayMinutes} mins late
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 4 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#888', display: 'block' }}>Pin Time</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {format(new Date(mainRoute.pinTime), 'yyyy-MM-dd HH:mm a')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#888', display: 'block' }}>Assigned Driver</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {mainRoute.driver}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Affected Routes
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              Select the affected route(s) below you want to take action on.
            </Typography>

            <Box sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
              {affectedRoutes.map((route) => (
                <AffectedRouteCard
                  key={route.id}
                  route={route}
                  selected={selectedAffectedRoutes.includes(route.id)}
                  onToggle={handleToggleRoute}
                />
              ))}
            </Box>
          </Grid>

          {/* Middle Panel: ZAI Suggestions */}
          <Grid item xs={12} md={3}>
            <Box sx={{ height: '100%', borderRight: '1px solid #EEE', pr: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <span style={{ color: '#F26A2E' }}>⚡</span> ZAI Suggestions
              </Typography>

              <Button
                fullWidth
                variant="outlined"
                onClick={handleApplyStatusCodeClick}
                endIcon={<ChevronRight />}
                sx={{
                  justifyContent: 'space-between',
                  py: 1.5,
                  mb: 2,
                  borderColor: step === 'main' ? '#333' : '#E0E0E0',
                  backgroundColor: step === 'main' ? '#F9F9F9' : 'transparent',
                  color: '#333',
                  fontWeight: 600,
                  borderRadius: '10px',
                  '&:hover': {
                    borderColor: '#333',
                    backgroundColor: '#F5F5F5',
                  },
                }}
              >
                Apply Route Status Code
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={handleSendNotificationsClick}
                endIcon={<ChevronRight />}
                sx={{
                  justifyContent: 'space-between',
                  py: 1.5,
                  borderColor: step === 'notifications' ? '#333' : '#E0E0E0',
                  backgroundColor: step === 'notifications' ? '#F9F9F9' : 'transparent',
                  color: '#333',
                  fontWeight: 600,
                  borderRadius: '10px',
                  '&:hover': {
                    borderColor: '#333',
                    backgroundColor: '#F5F5F5',
                  },
                }}
              >
                Send Notifications
              </Button>
            </Box>
          </Grid>

          {/* Right Panel: Dynamic Content */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            
            <Box sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
              {/* STEP: MAIN (Status Selection with Inline Comments) */}
              {step === 'main' && (
                <>
                  {statusCodes.map((code) => {
                    const isSelected = selectedStatusCode === code;
                    return (
                      <Paper
                        key={code}
                        elevation={0}
                        onClick={() => setSelectedStatusCode(code)}
                        sx={{
                          p: 1.5,
                          mb: 1.5,
                          borderRadius: '10px',
                          border: isSelected ? '1px solid #F26A2E' : '1px solid #E0E0E0',
                          backgroundColor: '#FFFFFF',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Radio
                            checked={isSelected}
                            onChange={() => setSelectedStatusCode(code)}
                            value={code}
                            sx={{
                              color: '#C4C4C4',
                              p: 0.5,
                              mr: 1,
                              '&.Mui-checked': { color: '#F26A2E' },
                            }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 500, color: isSelected ? '#F26A2E' : '#333' }}>
                            {code}
                          </Typography>
                        </Box>

                        {/* Inline Comment Box */}
                        {isSelected && (
                          <Box sx={{ mt: 2, pl: 4, pr: 1, pb: 1 }}>
                            <Typography variant="caption" sx={{ color: '#999', mb: 0.5, display: 'block' }}>
                              Comments
                            </Typography>
                            <TextField
                              multiline
                              rows={3}
                              fullWidth
                              placeholder="Typing in your comments..."
                              value={comment}
                              onChange={(e) => {
                                if (e.target.value.length <= 255) {
                                  setComment(e.target.value);
                                }
                              }}
                              onClick={(e) => e.stopPropagation()} // Prevent triggering parent click
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: '8px',
                                  backgroundColor: '#FAFAFA',
                                  fontSize: '0.875rem',
                                  p: 1.5
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#EEE'
                                }
                              }}
                            />
                            <Typography variant="caption" sx={{ color: '#CCC', display: 'block', textAlign: 'right', mt: 0.5 }}>
                              {comment.length}/255 characters
                            </Typography>
                          </Box>
                        )}
                      </Paper>
                    );
                  })}
                </>
              )}

              {/* STEP: NOTIFICATIONS */}
              {step === 'notifications' && (
                <ChainDelayNotificationPanel
                  selectedRecipients={selectedRecipients}
                  onToggleRecipient={handleToggleRecipient}
                  selectedChannel={selectedChannel}
                  onChannelChange={setSelectedChannel}
                  message={customerMessage}
                  onMessageChange={setCustomerMessage}
                />
              )}
            </Box>

            {/* Static Footer Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mt: 2, pt: 2, borderTop: '1px solid #F5F5F5', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{
                  borderColor: '#333',
                  color: '#333',
                  borderRadius: '25px',
                  px: 4,
                  py: 1,
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#000',
                    backgroundColor: 'rgba(0,0,0,0.04)'
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleConfirmAction}
                disabled={
                  (step === 'main' && !selectedStatusCode) ||
                  (step === 'notifications' && Object.keys(selectedRecipients).length === 0)
                }
                sx={{
                  backgroundColor: '#1C4E46',
                  color: '#fff',
                  borderRadius: '25px',
                  px: 4,
                  py: 1,
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': { backgroundColor: '#143D36', boxShadow: 'none' },
                  '&.Mui-disabled': { backgroundColor: '#E0E0E0', color: '#999' }
                }}
              >
                Confirm
              </Button>
            </Box>

          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default ChainOfDelayModal;
