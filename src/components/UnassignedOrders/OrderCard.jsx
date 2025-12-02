import React from 'react';
import { Paper, Box, Typography, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Keeping imports just in case, though we use custom boxes now
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MapIcon from '@mui/icons-material/Map'; 

const OrderCard = ({ order, isSelected, onClick }) => {
  return (
    <Paper
      elevation={0}
      onClick={() => onClick(order)}
      sx={{
        borderRadius: '12px',
        p: 2,
        mb: '14px',
        cursor: 'pointer',
        // Updated border color to #FF6300 as requested
        border: isSelected ? '1.5px solid #FF6300' : '1px solid transparent', 
        boxShadow: isSelected ? '0 4px 12px rgba(255, 99, 0, 0.15)' : '0 2px 10px rgba(0,0,0,0.04)',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        },
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#fff'
      }}
    >
      {/* Header: Order ID and Vendor */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, fontFamily: 'Montserrat', fontSize: '15px', color: '#333' }}>
          {order.id}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            color: '#007BFF', 
            fontFamily: 'Montserrat',
            textTransform: 'uppercase',
            fontSize: '11px'
          }}
        >
          {order.vendor}
        </Typography>
      </Box>

      {/* Stats Row */}
      <Box sx={{ display: 'flex', gap: 2.5, mb: 2 }}>
        <Box>
          <Typography variant="caption" color="textSecondary" sx={{ display: 'block', fontSize: '10px', fontFamily: 'Montserrat' }}>Items</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '13px', fontFamily: 'Montserrat' }}>{order.items}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="textSecondary" sx={{ display: 'block', fontSize: '10px', fontFamily: 'Montserrat' }}>Qty</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '13px', fontFamily: 'Montserrat' }}>{order.items}</Typography> 
        </Box>
        <Box>
          <Typography variant="caption" color="textSecondary" sx={{ display: 'block', fontSize: '10px', fontFamily: 'Montserrat' }}>Weight</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '13px', fontFamily: 'Montserrat' }}>{order.weight}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="textSecondary" sx={{ display: 'block', fontSize: '10px', fontFamily: 'Montserrat' }}>Dimensions (L*W*H)</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '13px', fontFamily: 'Montserrat' }}>{order.dimensions}</Typography>
        </Box>
      </Box>

      {/* Pickup Address */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
        <Box sx={{ 
            width: 16, height: 16, borderRadius: '50%', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 0.5, flexShrink: 0
        }}>
            <Box sx={{ width: 6, height: 6, bgcolor: '#333', borderRadius: '50%' }} />
        </Box>
        <Box>
          <Typography variant="caption" color="textSecondary" sx={{ fontSize: '10px', display: 'block', fontFamily: 'Montserrat' }}>Pickup Address</Typography>
          <Typography variant="body2" sx={{ fontSize: '12px', fontFamily: 'Montserrat', fontWeight: 500, color: '#333' }}>
            {order.pickup.address}
          </Typography>
        </Box>
      </Box>

      {/* Delivery Address */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
        <Box sx={{ 
            width: 16, height: 16, borderRadius: '4px', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 0.5, flexShrink: 0
        }}>
            <Box sx={{ width: 6, height: 6, bgcolor: '#333', borderRadius: '1px' }} />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="caption" color="textSecondary" sx={{ fontSize: '10px', display: 'block', fontFamily: 'Montserrat' }}>Delivery Address</Typography>
          <Typography variant="body2" sx={{ fontSize: '12px', fontFamily: 'Montserrat', fontWeight: 500, color: '#333' }}>
            {order.delivery.address}
          </Typography>
        </Box>
        
        {/* Action Icons */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
           <IconButton size="small" sx={{ bgcolor: '#EFF5F4', borderRadius: '8px', p: 0.5, '&:hover': { bgcolor: '#E0EAE8' } }}>
              <MapIcon sx={{ fontSize: 16, color: '#0B3B32' }} />
           </IconButton>
           <IconButton size="small" sx={{ bgcolor: '#EFF5F4', borderRadius: '8px', p: 0.5, '&:hover': { bgcolor: '#E0EAE8' } }}>
              <InfoOutlinedIcon sx={{ fontSize: 16, color: '#0B3B32' }} />
           </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default OrderCard;
