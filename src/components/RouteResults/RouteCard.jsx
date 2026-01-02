import React from 'react';
import { Box, Paper, Typography, Chip, IconButton } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import mckLogo from '../../assets/mck.png';
import ronaLogo from '../../assets/rona.png';

const RouteCard = ({ route }) => {
    // Parse endTime for display if available, else fallback
    const endDate = route.endTime ? route.endTime.split(' ')[0] : '12/04/2026';
    const endTime = route.endTime ? route.endTime.split(' ').slice(1).join(' ') : '08:00 PM';

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2, // Reduced padding for compactness
                mb: 2,
                border: '1px solid #E0E0E0',
                borderRadius: 2, // Reduced from 4 to match consistent design
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.2s',
                '&:hover': {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
                    borderColor: '#B0BEC5'
                },
                bgcolor: 'white'
            }}
        >
            {/* Header Badges - Single line forced */}
            <Box sx={{ display: 'flex', gap: 0.5, mb: 1, alignItems: 'center', flexWrap: 'nowrap', minHeight: 24 }}>
                {(route.badges || []).map((badge, index) => {
                    let borderColor = '#90CAF9';
                    let color = '#1565C0';
                    let bg = '#FFFFFF';

                    if (badge === '5 Ton' || badge.includes('Ton') || badge === 'Sprinter' || badge === 'MiniVan') {
                        borderColor = '#A5D6A7';
                        color = '#2E7D32';
                    }
                    if (badge === 'Pharma Products') {
                        borderColor = '#FFCC80';
                        color = '#EF6C00';
                    }
                    if (badge === 'Exclusive' || badge === 'Co-load') {
                        if (badge === 'Co-load') { borderColor = '#A5D6A7'; color = '#2E7D32'; }
                    }

                    return (
                        <Chip
                            key={index}
                            label={badge}
                            size="small"
                            variant="outlined"
                            sx={{
                                borderColor: borderColor,
                                color: color,
                                bgcolor: bg,
                                borderRadius: 1.5,
                                height: 20, // Slightly smaller height
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                '& .MuiChip-label': { px: 1 } // Tighter padding inside chip
                            }}
                        />
                    );
                })}
            </Box>

            {/* Route ID */}
            <Typography variant="h6" fontWeight="700" sx={{ mb: 2, fontSize: '1.1rem', letterSpacing: '-0.5px' }}>
                {route.id}
            </Typography>

            {/* Vehicle Image - Overlapping & Large */}
            {route.image && (
                <Box
                    component="img"
                    src={route.image}
                    alt="vehicle"
                    sx={{
                        position: 'absolute',
                        top: 15, // Adjusted top
                        right: -15,
                        height: 80, // Slightly smaller to match compact design
                        width: 130,
                        objectFit: 'contain',
                        filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.15))'
                    }}
                />
            )}

            {/* Stats Grid - Compact */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
                bgcolor: '#F8F9FA',
                p: 1.5, // Reduced padding
                borderRadius: 2.5
            }}>
                <Box>
                    <Typography variant="caption" color="text.secondary" display="block" fontSize="0.7rem" mb={0.2}>Type</Typography>
                    <Typography variant="subtitle2" fontWeight="700" fontSize="0.85rem">{route.type}</Typography>
                </Box>
                <Box>
                    <Typography variant="caption" color="text.secondary" display="block" fontSize="0.7rem" mb={0.2}>Stops</Typography>
                    <Typography variant="subtitle2" fontWeight="700" fontSize="0.85rem" sx={{ textDecoration: 'underline' }}>{Array.isArray(route.stops) ? route.stops.length : route.stops}</Typography>
                </Box>
                <Box>
                    <Typography variant="caption" color="text.secondary" display="block" fontSize="0.7rem" mb={0.2}>Orders</Typography>
                    <Typography variant="subtitle2" fontWeight="700" fontSize="0.85rem">{route.orders}</Typography>
                </Box>
                <Box>
                    <Typography variant="caption" color="text.secondary" display="block" fontSize="0.7rem" mb={0.2}>Distance</Typography>
                    <Typography variant="subtitle2" fontWeight="700" fontSize="0.85rem">{route.distance}</Typography>
                </Box>
            </Box>

            {/* Timeline Row */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                    <Typography variant="body2" color="text.primary" fontSize="0.85rem" fontWeight="500">{route.date}</Typography>
                    <Typography variant="caption" color="text.secondary" fontSize="0.75rem">{route.startTime}</Typography>
                </Box>

                {/* Dashed Arrow */}
                <Box sx={{ flex: 1, mx: 2, display: 'flex', alignItems: 'center' }}>
                    <Box sx={{
                        flex: 1,
                        borderTop: '2px dashed #CFD8DC',
                        height: '1px'
                    }} />
                    <Box sx={{
                        width: 0,
                        height: 0,
                        borderTop: '5px solid transparent',
                        borderBottom: '5px solid transparent',
                        borderLeft: '6px solid #CFD8DC'
                    }} />
                </Box>

                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" color="text.primary" fontSize="0.85rem" fontWeight="500">{endDate}</Typography>
                    <Typography variant="caption" color="text.secondary" fontSize="0.75rem">{endTime}</Typography>
                </Box>
            </Box>

            {/* Driver Section */}
            <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary" display="block" mb={0}>Driver</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0 }}>
                    <Typography variant="subtitle1" fontWeight="800" fontSize="0.95rem">{route.driverName}</Typography>
                    <ArrowDropDownIcon fontSize="small" sx={{ color: '#546E7A' }} />
                </Box>
                <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
                    {route.serviceProvider} • Vancouver&Calgary
                </Typography>
            </Box>

            {/* Footer */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box component="img" src={mckLogo} sx={{ height: 12, objectFit: 'contain' }} />
                    <Box component="img" src={ronaLogo} sx={{ height: 16, objectFit: 'contain' }} />
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" sx={{
                        bgcolor: '#E8F5E9',
                        color: '#2E7D32',
                        borderRadius: 1.5, // Slightly softer rounded
                        width: 28, // Smaller buttons
                        height: 28,
                        '&:hover': { bgcolor: '#C8E6C9' }
                    }}>
                        <MapIcon fontSize="small" sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton size="small" sx={{
                        bgcolor: '#E8F5E9',
                        color: '#2E7D32',
                        borderRadius: 1.5,
                        width: 28,
                        height: 28,
                        '&:hover': { bgcolor: '#C8E6C9' }
                    }}>
                        <ChatBubbleOutlineIcon fontSize="small" sx={{ fontSize: 16 }} />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
};

export default RouteCard;
