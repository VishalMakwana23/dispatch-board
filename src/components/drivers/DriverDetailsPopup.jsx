import React from 'react';
import { Box, Paper, Typography, Avatar, IconButton, Chip, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CircleIcon from '@mui/icons-material/Circle';

const DriverDetailsPopup = ({ driver, onClose }) => {
  if (!driver) return null;

  const currentAssignment = driver.assignments.find(a => a.status === 'Ongoing') || driver.assignments[0];

  return (
    <Paper
      elevation={4}
      sx={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '1000px',
        borderRadius: '16px',
        padding: '24px 32px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
        zIndex: 1200,
        fontFamily: 'Montserrat',
      }}
    >
      <IconButton 
        onClick={onClose} 
        size="small" 
        sx={{ 
            position: 'absolute', 
            top: 20, 
            right: 20, 
            color: '#888',
            '&:hover': { color: '#333' }
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      {/* 1. Header: Route ID + Status */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, borderBottom: '1px solid #f0f0f0', pb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.5px', color: '#222' }}>
            {currentAssignment?.routeId || 'No Active Route'}
        </Typography>
        {currentAssignment && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <CircleIcon style={{ fontSize: 8, color: '#0B8143', marginTop: 1 }} />
                <Typography variant="caption" sx={{ color: '#0B8143', fontWeight: 700, fontSize: '13px' }}>
                    {currentAssignment.status}
                </Typography>
            </Box>
        )}
      </Box>

      {/* 2. Middle Row: Driver Info + Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
        
        {/* Driver Info (Left) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
            <Box sx={{ position: 'relative', padding: '4px', border: '2px solid #E8F5E9', borderRadius: '50%' }}>
                <Avatar 
                    src={driver.avatar} 
                    sx={{ width: 64, height: 64 }} 
                />
                <Box sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: 14, 
                    height: 14, 
                    bgcolor: '#0B8143', 
                    borderRadius: '50%', 
                    border: '2px solid white',
                    zIndex: 1
                }} />
            </Box>
            <Box>
                <Typography variant="caption" sx={{ color: '#999', fontWeight: 600, fontSize: '12px', display: 'block', mb: 0.5 }}>Driver</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '18px', lineHeight: 1.2, color: '#222' }}>{driver.name}</Typography>
                <Typography variant="caption" sx={{ color: '#888', fontSize: '13px' }}>{driver.company}</Typography>
            </Box>
        </Box>

        {/* Action Buttons (Right) */}
        <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Box sx={{ 
                bgcolor: '#333', 
                color: 'white', 
                borderRadius: '6px', 
                px: 2, 
                py: 1, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <span style={{ opacity: 0.7 }}>#</span> {driver.stats?.stopCount || 0} Stops
            </Box>
            <Box sx={{ 
                bgcolor: '#333', 
                color: 'white', 
                borderRadius: '6px', 
                px: 2, 
                py: 1, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <DirectionsCarIcon sx={{ fontSize: 18, opacity: 0.7 }} />
                {driver.stats?.vehicleType || 'Vehicle'}
            </Box>
        </Box>
      </Box>

      {/* 3. Bottom Row: Stats Grid */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
            <Box>
                <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 1, fontSize: '12px' }}>Total</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '13px', color: '#222', mb: 0.5 }}>Distance - {driver.stats?.totalDistance || '-'}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '13px', color: '#222' }}>Duration: {driver.stats?.duration || '-'}</Typography>
            </Box>
            
            <Box>
                <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 1, fontSize: '12px' }}>Start Time</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '13px', color: '#222', mb: 0.5 }}>{driver.stats?.startTime || '-'}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '13px', color: '#222' }}>Oct 27, 2023</Typography>
            </Box>

            <Box>
                <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 1, fontSize: '12px' }}>End Time</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '13px', color: '#222' }}>{driver.stats?.endTime || '-'}</Typography>
            </Box>

            <Box>
                <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 1, fontSize: '12px' }}>Login Location</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '13px', color: '#222', maxWidth: '180px', lineHeight: 1.4 }}>{driver.stats?.loginLocation || '-'}</Typography>
            </Box>

            <Box>
                <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 1, fontSize: '12px' }}>Logout Location</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '13px', color: '#222' }}>{driver.stats?.logoutLocation || '-'}</Typography>
            </Box>
      </Box>
    </Paper>
  );
};

export default DriverDetailsPopup;
