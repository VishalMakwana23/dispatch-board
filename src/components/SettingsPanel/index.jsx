import React, { useState, useEffect } from 'react';
import { Drawer, Box, Typography, IconButton, Switch, FormControlLabel, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import { closeSettings } from '../../redux/slices/uiSlice';

const SettingsPanel = () => {
  const dispatch = useDispatch();
  const isSettingsOpen = useSelector((state) => state.ui.isSettingsOpen);
  
  // Persist switch state in local storage
  const [marketingEmails, setMarketingEmails] = useState(() => {
    const saved = localStorage.getItem('marketingEmails');
    return saved === 'true'; // Default false if not set
  });

  useEffect(() => {
    localStorage.setItem('marketingEmails', marketingEmails);
  }, [marketingEmails]);

  const toggleMarketing = (e) => {
    setMarketingEmails(e.target.checked);
  };

  return (
    <Drawer
      anchor="right"
      open={isSettingsOpen}
      onClose={() => dispatch(closeSettings())}
      PaperProps={{
        sx: {
          width: 400,
          maxWidth: '100%',
          p: 4,
          boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
          fontFamily: 'Montserrat, sans-serif'
        }
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, fontFamily: 'Montserrat, sans-serif' }}>
          Settings
        </Typography>
        <IconButton onClick={() => dispatch(closeSettings())}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Email Settings */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600, mb: 2, fontFamily: 'Montserrat, sans-serif', color: '#1B3E38' }}>
          Email Settings
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body1" sx={{ fontFamily: 'Montserrat, sans-serif' }}>
            Subscribe to marketing emails
          </Typography>
          <Switch 
            checked={marketingEmails} 
            onChange={toggleMarketing}
            inputProps={{ 'aria-label': 'Subscribe to marketing emails' }}
          />
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Future Placeholder */}
      <Box>
         <Typography variant="body2" sx={{ color: 'grey.500', fontStyle: 'italic', fontFamily: 'Montserrat, sans-serif' }}>
           More personalization options coming soon…
         </Typography>
      </Box>

    </Drawer>
  );
};

export default SettingsPanel;
