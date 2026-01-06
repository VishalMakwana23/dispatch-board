import React, { useState, useMemo } from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import CachedIcon from '@mui/icons-material/Cached';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import RouteIcon from '@mui/icons-material/Route';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const StatValue = ({ value, unit, label, subLabel }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '95px' }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 1, height: '30px', alignItems: 'flex-end' }}>
            <Typography sx={{ fontSize: '1.8rem', fontWeight: 700, color: '#1B1B1B', lineHeight: 1, letterSpacing: '-0.03em' }}>
                {value}
            </Typography>
            {unit && (
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#1B1B1B', mb: 0.3 }}>
                    {unit}
                </Typography>
            )}
        </Box>
        <Box sx={{ bgcolor: '#F4F4F4', px: 1.5, py: 0.5, borderRadius: '6px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Typography variant="caption" color="text.primary" fontWeight="700" sx={{ lineHeight: 1.2, fontSize: '0.65rem' }}>
                {label}
            </Typography>
            {subLabel && (
                <Typography variant="caption" color="text.secondary" fontWeight="500" sx={{ lineHeight: 1.2, fontSize: '0.6rem' }}>
                    {subLabel}
                </Typography>
            )}
        </Box>
    </Box>
);

const PillStat = ({ value, label, icon, minWidth = '125px' }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, minWidth: minWidth }}>
        <Typography sx={{ fontSize: '1.4rem', fontWeight: 700, color: '#424242', letterSpacing: '-0.02em' }}>{value}</Typography>
        <Box
            sx={{
                display: 'flex', alignItems: 'center', gap: 1,
                border: '1px solid #388E3C', borderRadius: '6px',
                px: 1, py: 0.5,
                bgcolor: 'white',
                width: '100%',
                justifyContent: 'center',
                minHeight: '34px'
            }}
        >
            {React.cloneElement(icon, { sx: { fontSize: 16, color: '#388E3C' } })}
            <Typography variant="caption" color="#388E3C" fontWeight="700" sx={{ lineHeight: 1.1, fontSize: '0.62rem', textAlign: 'left', flex: 1, whiteSpace: 'pre-line' }}>
                {label}
            </Typography>
        </Box>
    </Box>
);

const WarningStat = ({ value, label, minWidth = '145px' }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, minWidth: minWidth }}>
        <Typography sx={{ fontSize: '1.4rem', fontWeight: 700, color: '#F57C00', letterSpacing: '-0.02em' }}>{value}</Typography>
        <Box
            sx={{
                display: 'flex', alignItems: 'center', gap: 1,
                border: '1px solid #F57C00', borderRadius: '6px',
                px: 1, py: 0.5,
                bgcolor: 'white',
                width: '100%',
                justifyContent: 'center',
                minHeight: '34px'
            }}
        >
            <WarningAmberIcon sx={{ fontSize: 16, color: '#F57C00' }} />
            <Typography variant="caption" color="#F57C00" fontWeight="700" sx={{ lineHeight: 1.1, fontSize: '0.62rem', textAlign: 'left', flex: 1, whiteSpace: 'pre-line' }}>
                {label}
            </Typography>
        </Box>
    </Box>
);

const ScenarioStatsFooter = ({ results = [] }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const stats = useMemo(() => {
        const totalRoutes = results.length;
        const totalDistance = results.reduce((acc, r) => acc + (parseInt(r.distance) || 0), 0);

        return {
            totalRoutes: totalRoutes || 180,
            kmDistance: totalDistance || 625,
            costPerRoute: '12345',
            costPerStop: '45',
        };
    }, [results]);

    if (!isExpanded) {
        return (
            <Box
                onClick={() => setIsExpanded(true)}
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: 'white',
                    color: 'text.primary',
                    py: 1,
                    px: 3,
                    borderRadius: '24px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    zIndex: 1000,
                    boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
                    border: '1px solid #e0e0e0'
                }}
            >
                <CachedIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: 18 }} />
                <Typography variant="subtitle2" fontWeight="600" sx={{ fontSize: '0.85rem' }}>Output & Comparison Metrics</Typography>
                <KeyboardDoubleArrowUpIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: 18 }} />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 30,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 'fit-content',
                maxWidth: '95vw',
            }}
        >
            {/* Header Tab */}
            <Box
                onClick={() => setIsExpanded(false)}
                sx={{
                    bgcolor: 'white',
                    py: 0.8,
                    px: 2.5,
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    boxShadow: '0px -1px 3px rgba(0,0,0,0.02)', // Very subtle shadow as per design
                    mb: -1,
                    zIndex: 1,
                    border: '1px solid #f0f0f0',
                    borderBottom: 'none'
                }}
            >
                <CachedIcon fontSize="small" sx={{ color: '#757575', fontSize: 16 }} />
                <Typography variant="subtitle2" fontWeight="700" color="#424242" sx={{ fontSize: '0.8rem' }}>Output & Comparison Metrics</Typography>
                <KeyboardDoubleArrowDownIcon fontSize="small" sx={{ color: '#757575', fontSize: 16 }} />
            </Box>

            {/* Main Card */}
            <Paper
                elevation={0}
                sx={{
                    width: 'auto',
                    minWidth: '1080px', // Matches the wide layout
                    height: '105px',
                    borderRadius: '16px', // Matches the rounded card
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 5,
                    gap: 4.5,
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: '0px 8px 24px rgba(0,0,0,0.06)',
                    border: '1px solid #f0f0f0'
                }}
            >
                {/* Section 1: Numeric Stats */}
                <Box sx={{ display: 'flex', gap: 4 }}>
                    <StatValue value={stats.totalRoutes} label="Overall" subLabel="Routes" />
                    <StatValue value={stats.kmDistance} label="KM" subLabel="Distance" />
                    <StatValue value={stats.costPerRoute} unit="CAD" label="Cost proxies" subLabel="/ per route" />
                    <StatValue value={stats.costPerStop} unit="CAD" label="Cost proxies" subLabel="/ per stop" />
                </Box>

                <Divider orientation="vertical" flexItem sx={{ height: '40%', alignSelf: 'center', mx: 1.5, borderColor: '#eee' }} />

                {/* Section 2: Percentage Pills */}
                <Box sx={{ display: 'flex', gap: 3 }}>
                    <PillStat
                        value="99%"
                        label={`Capacity\nutilization`}
                        icon={<CachedIcon />}
                    />
                    <PillStat
                        value="100%"
                        label={`SLA\nadherence`}
                        icon={<ThumbUpIcon />}
                    />
                    <PillStat
                        value="98%"
                        label={`Route\nBalance`}
                        icon={<RouteIcon />}
                    />
                    <PillStat
                        value="99%"
                        label={`Stop sequencing\nefficiency`}
                        icon={<GpsFixedIcon />}
                        minWidth="160px"
                    />
                </Box>

                <Divider orientation="vertical" flexItem sx={{ height: '40%', alignSelf: 'center', mx: 1.5, borderColor: '#eee' }} />

                {/* Section 3: Warnings */}
                <Box>
                    <WarningStat value="1" label={`Identified Constraint\nViolations`} minWidth="165px" />
                </Box>

            </Paper>
        </Box>
    );
};

export default ScenarioStatsFooter;
