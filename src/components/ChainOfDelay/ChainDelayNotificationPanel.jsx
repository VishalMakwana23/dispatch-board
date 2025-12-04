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
  expandedRecipient,
  onExpandRecipient,
  recipientChannels,
  onChannelChange,
  recipientMessages,
  onMessageChange
}) => {
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Scrollable Content Area */}
      <Box sx={{ flex: 1, overflowY: 'auto', pr: 1, pt: 1 }}>
        {RECIPIENT_GROUPS.map((group) => {
          const isSelected = !!selectedRecipients[group.id];
          const isExpanded = expandedRecipient === group.id;

          // Expanded Card (Accordion Open)
          if (isExpanded) {
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
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Header Row */}
                <Box 
                  sx={{ display: 'flex', alignItems: 'center', mb: 2, cursor: 'pointer' }}
                  onClick={() => onExpandRecipient(group.id)}
                >
                  <Checkbox
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      onToggleRecipient(group.id);
                    }}
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
                        onClick={() => onChannelChange(group.id, 'email')}
                        sx={{ 
                            bgcolor: recipientChannels[group.id] === 'email' ? '#0B3B32' : '#F5F5F5', 
                            color: recipientChannels[group.id] === 'email' ? '#FFF' : '#666',
                            fontWeight: 600,
                            borderRadius: '4px',
                            height: '24px',
                            fontSize: '0.7rem',
                            '&:hover': { bgcolor: recipientChannels[group.id] === 'email' ? '#082D26' : '#E0E0E0' }
                        }} 
                    />
                    <Chip 
                        label="SMS" 
                        onClick={() => onChannelChange(group.id, 'sms')}
                        sx={{ 
                            bgcolor: recipientChannels[group.id] === 'sms' ? '#0B3B32' : '#F5F5F5', 
                            color: recipientChannels[group.id] === 'sms' ? '#FFF' : '#666',
                            fontWeight: 600,
                            borderRadius: '4px',
                            height: '24px',
                            fontSize: '0.7rem',
                            '&:hover': { bgcolor: recipientChannels[group.id] === 'sms' ? '#082D26' : '#E0E0E0' }
                        }} 
                    />
                  </Box>

                  <Box sx={{ position: 'relative' }}>
                    <InputBase
                      multiline
                      fullWidth
                      placeholder="Type your message here..."
                      value={recipientMessages[group.id] || ''}
                      onChange={(e) => {
                          if (e.target.value.length <= 255) onMessageChange(group.id, e.target.value);
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
              onClick={() => onExpandRecipient(group.id)}
              sx={{
                p: 1.5,
                mb: 1.5,
                border: '1px solid #E0E0E0',
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.2s',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#CCC'
                }
              }}
            >
              <Checkbox
                checked={isSelected}
                onChange={(e) => {
                  e.stopPropagation();
                  onToggleRecipient(group.id);
                }}
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
