import React from 'react';
import { Card, CardContent, Typography, Box, Chip, IconButton, Divider } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MapIcon from '@mui/icons-material/Map';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import TextSnippetIcon from '@mui/icons-material/TextSnippet'; // Placeholder for "T" icon

const RouteCard = ({ route, onClick, selected, isAdmin = false }) => {
  const isRisk = route.riskOfDelay;
  const isCoded = route.statusCoded;
  const isMissingPod = route.missingPod;

  // Status Colors
  const statusColor = isCoded ? '#ED6C02' : '#2E7D32'; // Orange or Green
  const statusText = route.status;

  return (
    <Card
      sx={{
        mb: 1, // Reduced margin from 2 to 1
        position: 'relative',
        overflow: 'visible',
        cursor: 'pointer',
        borderRadius: '12px',
        border: selected ? `2px solid ${route.color || '#1976D2'}` : '1px solid #e0e0e0', // Dynamic route color
        boxShadow: selected ? `0 4px 12px ${route.color ? route.color + '26' : 'rgba(25, 118, 210, 0.15)'}` : '0 2px 8px rgba(0,0,0,0.05)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transform: 'translateY(-2px)'
        }
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>

        {/* Header: Badges & Status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {!isAdmin && isMissingPod && (
              <Chip
                label="Missing POD"
                size="small"
                icon={<WarningIcon style={{ fontSize: 12, color: '#D32F2F' }} />}
                sx={{
                  height: 20,
                  fontSize: '0.65rem',
                  bgcolor: '#FFEBEE',
                  color: '#D32F2F',
                  fontWeight: 600,
                  borderRadius: '4px'
                }}
              />
            )}
            {!isAdmin && isRisk && (
              <Chip
                label="Risk of Delay"
                size="small"
                icon={<AccessTimeIcon style={{ fontSize: 12, color: '#ED6C02' }} />}
                sx={{
                  height: 20,
                  fontSize: '0.65rem',
                  bgcolor: '#FFF3E0',
                  color: '#ED6C02',
                  fontWeight: 600,
                  borderRadius: '4px'
                }}
              />
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {/* Halo Status Dot */}
            <Box sx={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              bgcolor: isCoded ? 'rgba(237, 108, 2, 0.2)' : 'rgba(46, 125, 50, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: statusColor }} />
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: statusColor, fontSize: '0.7rem' }}>
              {statusText}
            </Typography>
          </Box>
        </Box>

        {/* Route ID */}
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', mb: 1.5, lineHeight: 1.2 }}>
          {route.id}
        </Typography>

        {/* Stats Row */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, mb: 2 }}>
          {/* Type Column - Text Only */}
          <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '60px' }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem', mb: 0.5 }}>Type</Typography>
            <Typography variant="body2" fontWeight="700" sx={{ fontSize: '0.9rem', lineHeight: 1.1 }}>
              {route.type.split('-').map((part, i) => (
                <React.Fragment key={i}>
                  {part}{i < route.type.split('-').length - 1 && '-'}
                  <br />
                </React.Fragment>
              ))}
            </Typography>
          </Box>

          {/* Stats Grid */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'auto auto 1fr',
            gap: 2,
            flexGrow: 1,
            bgcolor: '#F8F9FA',
            p: 1.5,
            borderRadius: '8px',
            position: 'relative',
            alignItems: 'center'
          }}>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem' }}>Stops</Typography>
              <Typography variant="body2" fontWeight="700" sx={{ textDecoration: 'underline', cursor: 'pointer', fontSize: '0.95rem' }}>{route.stats?.stops || 0}</Typography>
            </Box>
            {!isAdmin && (
              <Box>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem' }}>Orders</Typography>
                <Typography variant="body2" fontWeight="700" sx={{ fontSize: '0.95rem' }}>{route.stats?.orders || 0}</Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifySelf: 'end' }}>
              {/* Remaining Badge */}
              <Box sx={{
                position: 'absolute',
                top: -10,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                bgcolor: '#fff',
                px: 0.75,
                py: 0.25,
                borderRadius: '4px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #eee'
              }}>
                <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#666', fontWeight: 600 }}>Remaining</Typography>
                <SwapVertIcon sx={{ fontSize: 12, color: '#666' }} />
              </Box>

              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Distance</Typography>
              <Typography variant="body2" fontWeight="800" sx={{ fontSize: '1rem' }}>{route.stats?.distance || '0 km'}</Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 1.5, borderStyle: 'dashed' }} />

        {/* Driver Info & Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Box>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem', mb: 0.2 }}>Driver</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Typography variant="body2" fontWeight="700" sx={{ fontSize: '0.9rem' }}>{route.driver?.name || 'Unassigned'}</Typography>
              <ArrowDropDownIcon fontSize="small" color="action" />
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.65rem', mt: 0.2 }}>
              {route.driver?.company || 'No Company'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small" sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', borderRadius: '8px', '&:hover': { bgcolor: '#C8E6C9' } }}>
              <MapIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', borderRadius: '8px', '&:hover': { bgcolor: '#C8E6C9' } }}>
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RouteCard;
