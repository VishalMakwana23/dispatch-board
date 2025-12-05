import { Modal, Box, Typography, IconButton, Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Fade, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import { closeProfile } from '../../redux/slices/uiSlice';


import { useNavigate } from 'react-router-dom';

const ProfilePopup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isProfileOpen = useSelector((state) => state.ui.isProfileOpen);

  // Get User Data from Local Storage
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
    name: 'Guest User',
    email: 'guest@ziing.ai',
    role: 'Guest'
  };

  const handleAction = (action) => {
    // Navigate and Close
    if (action === 'logout') {
        localStorage.removeItem('currentUser'); // Clear session
        // localStorage.removeItem('rememberedEmail'); // Optional: keep email for convenience
        dispatch(closeProfile());
        navigate('/login');
    } else {
        console.log(`Action triggered: ${action}`);
    }
  };

  return (
    <Modal
      open={isProfileOpen}
      onClose={() => dispatch(closeProfile())}
      aria-labelledby="profile-modal-title"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isProfileOpen}>
        <Box 
          sx={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400, 
            bgcolor: '#ffffff',
            borderRadius: '16px', 
            boxShadow: 24, 
            p: 3, 
            outline: 'none',
            fontFamily: 'Montserrat, sans-serif'
          }}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography id="profile-modal-title" variant="h6" sx={{ fontWeight: 600, fontFamily: 'Montserrat, sans-serif', color: '#333' }}>
              My Profile
            </Typography>
            <IconButton onClick={() => dispatch(closeProfile())} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          
          {/* Section 1: User Info */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3, textAlign: 'center' }}>
            <Avatar 
              sx={{ width: 80, height: 80, mb: 2, bgcolor: '#1B3E38', fontSize: '2rem' }}
            >
              {currentUser.name.charAt(0)}
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600, fontFamily: 'Montserrat, sans-serif', color: '#333' }}>
              {currentUser.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Montserrat, sans-serif' }}>
              {currentUser.email}
            </Typography>
            <Box 
              sx={{ 
                mt: 1, 
                bgcolor: '#E0F2F1', 
                color: '#00695C', 
                px: 1.5, 
                py: 0.5, 
                borderRadius: '12px', 
                fontSize: '0.75rem', 
                fontWeight: 600 
              }}
            >
              {currentUser.role.toUpperCase()}
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Section 2: Account Actions */}
          <List disablePadding>
              {[
                  { label: 'View Full Profile', icon: 'mdi:account-circle', action: 'view_profile' },
                  { label: 'Change Password', icon: 'mdi:lock-outline', action: 'change_password' },
                  { label: 'Manage Notifications', icon: 'mdi:bell-outline', action: 'notifications' },
                  { label: 'Logout', icon: 'mdi:logout', action: 'logout', color: 'error.main' },
              ].map((item, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                      <ListItemButton 
                          onClick={() => handleAction(item.action)}
                          sx={{ 
                              borderRadius: '8px', 
                              '&:hover': { bgcolor: 'action.hover' }
                          }}
                      >
                          <ListItemIcon sx={{ minWidth: 40, color: item.color || 'action.active' }}>
                              <Icon icon={item.icon} width="24" height="24" />
                          </ListItemIcon>
                          <ListItemText 
                              primary={item.label} 
                              primaryTypographyProps={{ 
                                  fontFamily: 'Montserrat, sans-serif', 
                                  fontSize: '0.95rem',
                                  color: item.color || 'text.primary'
                              }} 
                          />
                           <Icon icon="mdi:chevron-right" width="20" height="20" color="#9e9e9e" />
                      </ListItemButton>
                  </ListItem>
              ))}
          </List>

        </Box>
      </Fade>
    </Modal>
  );
};

export default ProfilePopup;
