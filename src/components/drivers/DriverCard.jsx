import React from 'react';
import { Box, Typography, Avatar, Chip, IconButton, Paper } from '@mui/material';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CircleIcon from '@mui/icons-material/Circle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const DriverCard = ({ driver, isSelected, onClick }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return '#0B8143';
      case 'inactive': return '#A0A0A0';
      case 'unavailable': return '#D64537';
      default: return '#A0A0A0';
    }
  };

  const getPermitColor = (expiry) => {
    if (expiry.includes('Missing')) return '#D64537'; // Red for missing
    // Simple check for now, could be date logic
    return '#E4A025'; // Orange for warning
  };

  const getBorderColor = () => {
    if (!isSelected) return '1px solid transparent';
    // If there is a warning (permit expiry), use Orange
    if (driver.permitExpiry && !driver.permitExpiry.includes('Missing')) return '2px solid #E4A025';
    if (driver.permitExpiry && driver.permitExpiry.includes('Missing')) return '2px solid #D32F2F';
    // Fallback to status color
    return `2px solid ${getStatusColor(driver.status)}`;
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
      {/* Header: Warning + Status */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
        <Box>
             {/* Work Permit Warning - Only show if relevant */}
            {!driver.permitExpiry.includes('Missing') && (
                <Box sx={{ 
                    bgcolor: '#FFF4E5', 
                    color: '#E4A025', 
                    px: 1, 
                    py: 0.5, 
                    borderRadius: '4px', 
                    fontSize: '10px', 
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    mb: 1,
                    width: 'fit-content'
                }}>
                    <span style={{ fontSize: '12px' }}>⚠️</span> 
                    Work Permit Expires {driver.permitExpiry}
                </Box>
            )}
             {driver.permitExpiry.includes('Missing') && (
                <Box sx={{ 
                    bgcolor: '#FFEBEE', 
                    color: '#D32F2F', 
                    px: 1, 
                    py: 0.5, 
                    borderRadius: '4px', 
                    fontSize: '10px', 
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    mb: 1,
                    width: 'fit-content'
                }}>
                    <span style={{ fontSize: '12px' }}>⚠️</span> 
                    {driver.permitExpiry}
                </Box>
            )}

            <Typography variant="subtitle1" sx={{ fontWeight: 700, fontFamily: 'Montserrat', lineHeight: 1.2 }}>
                {driver.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#888', fontFamily: 'Montserrat', fontSize: '11px' }}>
                {driver.company}
            </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
            <Chip 
                label={driver.status} 
                size="small" 
                sx={{ 
                    bgcolor: getStatusColor(driver.status), 
                    color: 'white', 
                    fontWeight: 600, 
                    fontSize: '10px',
                    height: '22px',
                    textTransform: 'capitalize',
                    '& .MuiChip-label': { px: 1 }
                }} 
                icon={<CircleIcon style={{ fontSize: 6, color: 'white' }} />}
            />
            <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton size="small" sx={{ bgcolor: '#F5F5F5', borderRadius: 1, p: 0.5, width: 24, height: 24 }}>
                    <AltRouteIcon sx={{ fontSize: 14, color: '#555' }} />
                </IconButton>
                <IconButton size="small" sx={{ bgcolor: '#F5F5F5', borderRadius: 1, p: 0.5, width: 24, height: 24 }}>
                    <ChatBubbleOutlineIcon sx={{ fontSize: 14, color: '#555' }} />
                </IconButton>
            </Box>
        </Box>
      </Box>

      {/* Assignments */}
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="caption" sx={{ color: '#aaa', fontWeight: 600, fontSize: '10px' }}>Assignments</Typography>
            <Typography variant="caption" sx={{ color: '#aaa', cursor: 'pointer', fontSize: '14px' }}>+</Typography>
        </Box>
        
        {driver.assignments.map((assign, idx) => (
            <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                <Typography variant="caption" sx={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: '11px', color: '#333' }}>
                    {assign.routeId}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {assign.status === 'Ongoing' ? (
                        <CircleIcon sx={{ fontSize: 8, color: '#0B8143' }} />
                    ) : (
                        <RadioButtonUncheckedIcon sx={{ fontSize: 8, color: '#ccc' }} />
                    )}
                    <Typography variant="caption" sx={{ 
                        color: assign.status === 'Ongoing' ? '#0B8143' : '#ccc',
                        fontWeight: 600,
                        fontSize: '10px'
                    }}>
                        {assign.status}
                    </Typography>
                </Box>
            </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default DriverCard;
