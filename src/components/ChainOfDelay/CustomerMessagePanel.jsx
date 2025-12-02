import React from 'react';
import { Box, Typography, Button, TextField, ToggleButton, ToggleButtonGroup, Chip } from '@mui/material';
import { Edit } from '@mui/icons-material';

const CustomerMessagePanel = ({
  selectedChannel,
  onChannelChange,
  message,
  onMessageChange,
  onConfirm,
  onCancel
}) => {
  const handlePersonalize = (tag) => {
    onMessageChange(message + ` {{${tag}}} `);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
        Customers
      </Typography>

      <Typography variant="caption" sx={{ color: '#666', mb: 1, display: 'block' }}>
        Select the type of message
      </Typography>
      
      <ToggleButtonGroup
        value={selectedChannel}
        exclusive
        onChange={(e, newVal) => newVal && onChannelChange(newVal)}
        sx={{ mb: 3 }}
      >
        <ToggleButton 
          value="email" 
          sx={{ 
            px: 3, 
            py: 0.5, 
            borderRadius: '20px !important', 
            border: '1px solid #E0E0E0',
            textTransform: 'none',
            fontWeight: 600,
            '&.Mui-selected': { backgroundColor: '#0B3B32', color: '#fff', '&:hover': { backgroundColor: '#082D26' } }
          }}
        >
          Email
        </ToggleButton>
        <ToggleButton 
          value="sms" 
          sx={{ 
            px: 3, 
            py: 0.5, 
            borderRadius: '20px !important', 
            border: '1px solid #E0E0E0',
            ml: 1,
            textTransform: 'none',
            fontWeight: 600,
            '&.Mui-selected': { backgroundColor: '#0B3B32', color: '#fff', '&:hover': { backgroundColor: '#082D26' } }
          }}
        >
          SMS
        </ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ position: 'relative', flex: 1 }}>
        <TextField
          multiline
          rows={6}
          fullWidth
          placeholder="Typing in your comments..."
          value={message}
          onChange={(e) => {
            if (e.target.value.length <= 255) {
              onMessageChange(e.target.value);
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: '#FFF',
              p: 2,
              alignItems: 'flex-start',
              minHeight: '140px'
            }
          }}
          InputProps={{
            endAdornment: (
              <Edit sx={{ position: 'absolute', right: 16, top: 16, color: '#999', fontSize: 18 }} />
            )
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
             {/* Optional Personalize Chips */}
             <Chip 
                label="{{name}}" 
                size="small" 
                onClick={() => handlePersonalize('name')}
                sx={{ borderRadius: '4px', bgcolor: '#F5F5F5', color: '#666', fontSize: '0.75rem' }} 
             />
             <Chip 
                label="{{date}}" 
                size="small" 
                onClick={() => handlePersonalize('date')}
                sx={{ borderRadius: '4px', bgcolor: '#F5F5F5', color: '#666', fontSize: '0.75rem' }} 
             />
          </Box>
          <Typography variant="caption" sx={{ color: '#999' }}>
            {message.length}/255 characters
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          fullWidth
          sx={{
            borderColor: '#333',
            color: '#333',
            borderRadius: '25px',
            py: 1.2,
            fontWeight: 600
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={message.length === 0}
          fullWidth
          sx={{
            backgroundColor: '#0B3B32',
            color: '#fff',
            borderRadius: '25px',
            py: 1.2,
            fontWeight: 600,
            '&:hover': { backgroundColor: '#082D26' },
            '&.Mui-disabled': { backgroundColor: '#E0E0E0', color: '#999' }
          }}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default CustomerMessagePanel;
