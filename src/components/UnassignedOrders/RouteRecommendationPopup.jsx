import React from 'react';
import { Paper, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const RouteRecommendationPopup = ({ recommendations, onAssign, onClose }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        position: 'absolute',
        top: '120px',
        left: '20px',
        width: '380px',
        borderRadius: '16px',
        p: '20px', // Exact padding from screenshot annotation
        zIndex: 1000, 
        boxShadow: '0px 6px 30px rgba(0,0,0,0.1)',
        fontFamily: 'Montserrat',
        bgcolor: '#fff'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 600, fontFamily: 'Montserrat' }}>
          Routes Recommendation
        </Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: '#666' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {recommendations.map((route) => (
          <Paper
            key={route.routeId}
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 1.5,
              border: '1px solid #E3E3E3',
              borderRadius: '12px',
              bgcolor: '#fff', // White background for the item
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Status Circle */}
              <Box 
                sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%', 
                  border: '1px solid #E0E0E0', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Box 
                  sx={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%', 
                    bgcolor: route.statusColor || '#0B8A41' // Default green
                  }} 
                />
              </Box>

              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '13px', fontFamily: 'Montserrat', color: '#000' }}>
                  {route.routeId}
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '12px', fontFamily: 'Montserrat', color: '#999' }}>
                  {route.driver} <span style={{ margin: '0 4px' }}>•</span> {route.distance}
                </Typography>
              </Box>
            </Box>
            
            <IconButton 
              onClick={() => onAssign(route.routeId)}
              sx={{ 
                border: '1px solid #E3E3E3', 
                borderRadius: '50%', // Circular button
                width: 36,
                height: 36,
                '&:hover': { bgcolor: '#F5F5F5' },
                color: '#0B3B32'
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Paper>
        ))}
      </Box>
    </Paper>
  );
};

export default RouteRecommendationPopup;
