import React from 'react';
import { Box, Typography, Checkbox, Paper, Chip, InputBase } from '@mui/material';
import { Edit } from '@mui/icons-material';

const RECIPIENT_GROUPS = [
  { id: 'customers', label: 'Customers' },
  { id: 'managers', label: 'Ziing Operational Managers' },
  { id: 'drivers', label: 'Drivers' },
  { id: 'providers', label: 'Service Providers' },
];

const ChainDelayNotificationPanel = ({
  selectedRecipients,
  onToggleRecipient,
  selectedChannel,
  onChannelChange,
  message,
  onMessageChange
}) => {
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Scrollable Content Area */}
      <Box sx={{ flex: 1, overflowY: 'auto', pr: 1, pt: 1 }}>
        {RECIPIENT_GROUPS.map((group) => {
          const isSelected = !!selectedRecipients[group.id];
          const isCustomers = group.id === 'customers';

          // Expanded Customers Card
          if (isCustomers && isSelected) {
            return (
              <Paper
                key={group.id}
                elevation={0}
                sx={{
                  p: 2,
                  mb: 2,
                  border: '1px solid #F26A2E',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  position: 'relative'
                }}
              >
                {/* Header Row */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Checkbox
                    checked={true}
                    onChange={() => onToggleRecipient(group.id)}
                    sx={{
                      color: '#F26A2E',
                      p: 0,
                      mr: 1.5,
                      '&.Mui-checked': { color: '#F26A2E' },
                    }}
                  />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#333', fontSize: '0.95rem' }}>
                    {group.label}
                  </Typography>
                </Box>

                {/* Expanded Content */}
                <Box sx={{ pl: 0 }}> 
                  <Typography variant="caption" sx={{ color: '#666', mb: 1, display: 'block', fontSize: '0.75rem' }}>
                    Select the type of message
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip 
                        label="Email" 
                        onClick={() => onChannelChange('email')}
                        sx={{ 
                            bgcolor: selectedChannel === 'email' ? '#0B3B32' : '#F5F5F5', 
                            color: selectedChannel === 'email' ? '#FFF' : '#666',
                            fontWeight: 600,
                            borderRadius: '4px',
                            height: '24px',
                            fontSize: '0.7rem',
                            '&:hover': { bgcolor: selectedChannel === 'email' ? '#082D26' : '#E0E0E0' }
                        }} 
                    />
                    <Chip 
                        label="SMS" 
                        onClick={() => onChannelChange('sms')}
                        sx={{ 
                            bgcolor: selectedChannel === 'sms' ? '#0B3B32' : '#F5F5F5', 
                            color: selectedChannel === 'sms' ? '#FFF' : '#666',
                            fontWeight: 600,
                            borderRadius: '4px',
                            height: '24px',
                            fontSize: '0.7rem',
                            '&:hover': { bgcolor: selectedChannel === 'sms' ? '#082D26' : '#E0E0E0' }
                        }} 
                    />
                  </Box>

                  <Box sx={{ position: 'relative' }}>
                    <InputBase
                      multiline
                      fullWidth
                      value={message}
                      onChange={(e) => {
                          if (e.target.value.length <= 255) onMessageChange(e.target.value);
                      }}
                      sx={{
                        bgcolor: '#FAFAFA',
                        borderRadius: '8px',
                        p: 1.5,
                        fontSize: '0.8rem',
                        color: '#444',
                        lineHeight: 1.6,
                        minHeight: '100px',
                        alignItems: 'flex-start',
                        pr: 4 // Space for icon
                      }}
                    />
                    <Edit sx={{ position: 'absolute', right: 12, top: 12, fontSize: 16, color: '#333' }} />
                  </Box>
                </Box>
              </Paper>
            );
          }

          // Default / Collapsed Card
          return (
            <Paper
              key={group.id}
              elevation={0}
              sx={{
                p: 1.5,
                mb: 1.5,
                border: '1px solid #E0E0E0',
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: '#CCC'
                }
              }}
            >
              <Checkbox
                checked={isSelected}
                onChange={() => onToggleRecipient(group.id)}
                sx={{
                  color: '#C4C4C4',
                  p: 0,
                  mr: 1.5,
                  '&.Mui-checked': { color: '#333' },
                }}
              />
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#333', fontSize: '0.95rem' }}>
                {group.label}
              </Typography>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};

export default ChainDelayNotificationPanel;
