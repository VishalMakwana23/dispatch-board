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
import ziingLogo from '../../assets/ziing.svg';

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
  const [expandedRecipient, setExpandedRecipient] = useState('customers');
  
  const [recipientChannels, setRecipientChannels] = useState({
    customers: 'email',
    managers: 'email',
    drivers: 'email',
    providers: 'email'
  });

  const [recipientMessages, setRecipientMessages] = useState({
    customers: "Hi John,\nwe are experiencing delays due to severe weather conditions in SouthWest Calgary.\nAll the deliveries are moved forward to Nov 25, 2025.",
    managers: "",
    drivers: "",
    providers: ""
  });

  useEffect(() => {
    if (open) {
      setStep('main');
      setSelectedRecipients({});
      setExpandedRecipient('customers');
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
      // Gather data for all selected recipients
      const notificationData = {};
      Object.keys(selectedRecipients).forEach(recipientId => {
        notificationData[recipientId] = {
          channel: recipientChannels[recipientId],
          message: recipientMessages[recipientId]
        };
      });
      
      // If specific handlers exist for types, use them (legacy support or specific logic)
      if (selectedRecipients['customers']) {
        onConfirmCustomerMessage(recipientMessages['customers'], recipientChannels['customers']);
      } 
      
      // Always call the generic handler with all data
      onConfirmSendNotifications(notificationData);
    }
  };

  const handleStatusCodeChange = (code) => {
    if (code !== selectedStatusCode) {
      setSelectedStatusCode(code);
      setComment(""); // Clear comment on status change
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
          borderRadius: '16px',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FEFDFB 100%)',
          height: '85vh',
          maxHeight: '850px',
          boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.08)'
        },
      }}
    >
      <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Close Button (Absolute) */}
        <IconButton 
          onClick={onClose} 
          sx={{ 
            position: 'absolute', 
            right: 24, 
            top: 24,
            color: '#999'
          }}
        >
          <Close />
        </IconButton>

        <Grid container spacing={4} sx={{ flex: 1, overflow: 'hidden', mb: 2, mt: 2 }}>
          {/* Left Panel: Route Info & Affected Routes */}
          <Grid item xs={12} md={4} sx={{ height: '100%' }}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRight: '1px solid #F0F0F0', pr: 4 }}>
              {/* Chain of Delay Header */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
                <Warning sx={{ color: '#D24A43' }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#D24A43', fontSize: '1.25rem' }}>
                  Chain of Delay
                </Typography>
              </Box>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                mb: 4,
                border: '1px solid #E0E0E0',
                borderRadius: '12px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#D24A43', fontWeight: 700, fontSize: '1.1rem' }}>
                  {mainRoute.id}
                </Typography>
                <Typography variant="caption" sx={{ color: '#D24A43', fontWeight: 700, bgcolor: '#FFF0F0', px: 1.5, py: 0.5, borderRadius: '6px' }}>
                  {mainRoute.delayMinutes} mins late
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 5 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#888', display: 'block', mb: 0.5 }}>Pin Time</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                    {format(new Date(mainRoute.pinTime), 'yyyy-MM-dd HH:mm a')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#888', display: 'block', mb: 0.5 }}>Assigned Driver</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                    {mainRoute.driver}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: '#333' }}>
              Affected Routes
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2.5 }}>
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
          </Box>
          </Grid>

          {/* Middle Panel: ZAI Suggestions */}
          <Grid item xs={12} md={3}>
            <Box sx={{ height: '100%', borderRight: '1px solid #F0F0F0', pr: 4, pl: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center', gap: 1.5, fontSize: '1.1rem', color: '#333' }}>
                <img src={ziingLogo} alt="ZAI" style={{ width: '24px', height: '24px' }} /> ZAI Suggestions
              </Typography>

              <Button
                fullWidth
                variant="outlined"
                onClick={handleApplyStatusCodeClick}
                endIcon={<ChevronRight />}
                sx={{
                  justifyContent: 'space-between',
                  py: 1.2,
                  px: 2,
                  mb: 2,
                  borderColor: step === 'main' ? '#333' : '#E0E0E0',
                  backgroundColor: step === 'main' ? '#fff' : 'transparent',
                  color: '#333',
                  fontWeight: 600,
                  borderRadius: '8px',
                  borderWidth: '1px',
                  textTransform: 'none',
                  boxShadow: step === 'main' ? '0px 2px 8px rgba(0,0,0,0.05)' : 'none',
                  '&:hover': {
                    borderColor: '#333',
                    backgroundColor: '#FAFAFA',
                    borderWidth: '1px',
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
                  py: 1.2,
                  px: 2,
                  borderColor: step === 'notifications' ? '#333' : '#E0E0E0',
                  backgroundColor: step === 'notifications' ? '#fff' : 'transparent',
                  color: '#333',
                  fontWeight: 600,
                  borderRadius: '8px',
                  borderWidth: '1px',
                  textTransform: 'none',
                  boxShadow: step === 'notifications' ? '0px 2px 8px rgba(0,0,0,0.05)' : 'none',
                  '&:hover': {
                    borderColor: '#333',
                    backgroundColor: '#FAFAFA',
                    borderWidth: '1px',
                  },
                }}
              >
                Send Notifications
              </Button>
            </Box>
          </Grid>

          {/* Right Panel: Dynamic Content */}
          <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', height: '100%', pl: 2 }}>
            
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
                        onClick={() => handleStatusCodeChange(code)}
                        sx={{
                          p: isSelected ? 2 : 1.5,
                          mb: 2,
                          borderRadius: '12px',
                          border: isSelected ? '1px solid #F26A2E' : '1px solid #E0E0E0',
                          backgroundColor: '#FFFFFF',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease-in-out',
                          boxShadow: isSelected ? '0px 4px 12px rgba(242, 106, 46, 0.1)' : 'none',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Radio
                            checked={isSelected}
                            onChange={() => handleStatusCodeChange(code)}
                            value={code}
                            sx={{
                              color: '#E0E0E0',
                              p: 0.5,
                              mr: 1.5,
                              '&.Mui-checked': { color: '#F26A2E' },
                            }}
                          />
                          <Typography variant="body1" sx={{ fontWeight: isSelected ? 600 : 500, color: isSelected ? '#333' : '#555' }}>
                            {code}
                          </Typography>
                        </Box>

                        {/* Inline Comment Box */}
                        {isSelected && (
                          <Box sx={{ mt: 2, pl: 5, pr: 1, pb: 1 }}>
                            <Typography variant="caption" sx={{ color: '#999', mb: 0.8, display: 'block', fontWeight: 500 }}>
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
                                  p: 1.5,
                                  '& fieldset': {
                                    borderColor: '#EEE',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: '#DDD',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#F26A2E', // Match brand color on focus
                                  }
                                },
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
                  expandedRecipient={expandedRecipient}
                  onExpandRecipient={setExpandedRecipient}
                  recipientChannels={recipientChannels}
                  onChannelChange={(id, channel) => setRecipientChannels(prev => ({ ...prev, [id]: channel }))}
                  recipientMessages={recipientMessages}
                  onMessageChange={(id, message) => setRecipientMessages(prev => ({ ...prev, [id]: message }))}
                />
              )}
            </Box>

          </Grid>
        </Grid>

        {/* Fixed Footer Buttons */}
        <Box sx={{ display: 'flex', gap: 2, pt: 3, borderTop: '1px solid #F5F5F5', justifyContent: 'flex-end', mr: 2 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderColor: '#333',
              color: '#333',
              borderRadius: '30px',
              px: 5,
              py: 1,
              fontWeight: 600,
              textTransform: 'none',
              borderWidth: '1px',
              '&:hover': {
                borderColor: '#000',
                backgroundColor: 'rgba(0,0,0,0.04)',
                borderWidth: '1px',
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
              borderRadius: '30px',
              px: 5,
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
      </Box>
    </Dialog>
  );
};

export default ChainOfDelayModal;
