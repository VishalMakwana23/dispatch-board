import React from 'react';
import { Box, Typography, Avatar, Chip, IconButton, Paper } from '@mui/material';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CircleIcon from '@mui/icons-material/Circle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import WarningIcon from '@mui/icons-material/Warning';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const DriverCard = ({ driver, isSelected, onClick }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return '#107C41'; // Green
      case 'inactive': return '#A0A0A0';
      case 'unavailable': return '#D64537';
      default: return '#A0A0A0';
    }
  };

  const getBorderColor = () => {
    if (isSelected) return '2px solid #FF5722'; // Orange when selected
    return '1px solid #e0e0e0'; // Default grey border
  };

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: '12px',
        boxShadow: '0px 2px 12px rgba(0,0,0,0.06)',
        border: getBorderColor(),
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0px 4px 16px rgba(0,0,0,0.1)',
        }
      }}
    >
      {/* Row 1: Warning (Left) & Status (Right) */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, minHeight: '24px' }}>
         <Box>
            {driver.permitExpiry && (
                <Box sx={{ 
                    bgcolor: '#FFF4E5', // Light Orange
                    color: '#D32F2F', // Red text
                    px: 1.5, 
                    py: 0.5, 
                    borderRadius: '6px', 
                    fontSize: '10px', 
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.8,
                    width: 'fit-content'
                }}>
                    <WarningIcon sx={{ fontSize: 14, color: '#D32F2F', flexShrink: 0 }} />
                    <Box component="span">
                        {driver.permitExpiry.includes('Missing') ? driver.permitExpiry : (
                            <>
                                Work Permit Expires{' '}
                                <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
                                    {driver.permitExpiry}
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>
            )}
         </Box>
         
         <Chip 
            label={driver.status} 
            size="small" 
            sx={{ 
                bgcolor: getStatusColor(driver.status), 
                color: 'white', 
                fontWeight: 600, 
                fontSize: '11px',
                height: '24px',
                textTransform: 'capitalize',
                borderRadius: '12px',
                '& .MuiChip-label': { px: 1.5 }
            }} 
            icon={<CircleIcon style={{ fontSize: 6, color: 'white', marginLeft: 6 }} />}
        />
      </Box>

      {/* Row 2: Name/Company (Left) & Icons (Right) */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Montserrat', lineHeight: 1.2, fontSize: '18px', mb: 0.5 }}>
                {driver.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', fontFamily: 'Montserrat', fontSize: '13px' }}>
                {driver.company}
            </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small" sx={{ bgcolor: '#E0F2F1', borderRadius: 1, p: 0.8, width: 32, height: 32 }}>
                <PersonOffOutlinedIcon sx={{ fontSize: 18, color: '#00695C' }} />
            </IconButton>
            <IconButton size="small" sx={{ bgcolor: '#E0F2F1', borderRadius: 1, p: 0.8, width: 32, height: 32 }}>
                <ChatBubbleOutlineIcon sx={{ fontSize: 18, color: '#00695C' }} />
            </IconButton>
        </Box>
      </Box>

      {/* Divider */}
      <Box sx={{ borderBottom: '1px solid #f0f0f0', mb: 2 }} />

      {/* Assignments */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography variant="caption" sx={{ color: '#999', fontWeight: 500, fontSize: '13px', fontFamily: 'Montserrat' }}>Assignments</Typography>
            <IconButton size="small" sx={{ padding: 0 }}>
                 <AddCircleOutlineIcon sx={{ color: '#ccc', fontSize: 24 }} />
            </IconButton>
        </Box>
        
        {driver.assignments.map((assign, idx) => (
            <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography variant="body2" sx={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: '15px', color: '#333' }}>
                    {assign.routeId}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Status Indicator */}
                    {assign.status === 'Ongoing' ? (
                        <CircleIcon sx={{ fontSize: 14, color: '#2E7D32' }} /> // Filled for Ongoing
                    ) : (
                        <RadioButtonUncheckedIcon sx={{ fontSize: 14, color: '#999' }} /> // Hollow for Planned
                    )}
                    
                    <Typography variant="caption" sx={{ 
                        color: assign.status === 'Ongoing' ? '#2E7D32' : '#999',
                        fontWeight: 700,
                        fontSize: '13px',
                        textTransform: 'capitalize'
                    }}>
                        {assign.status}
                    </Typography>
                </Box>
            </Box>
        ))}
        {/* Placeholder if no assignments to match look? No, assuming data exists */}
      </Box>
    </Paper>
  );
};

export default DriverCard;
