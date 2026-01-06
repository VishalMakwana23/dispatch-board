import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
import { backToPlanning } from '../../redux/slices/scenarioSlice';
import RouteCard from './RouteCard';

const RouteResultsView = () => {
    const dispatch = useDispatch();
    const { results } = useSelector((state) => state.scenario);

    return (
        <Box sx={{
            width: 360, // Fixed width sidebar like ScenarioPlanningPanel
            height: '100%',
            bgcolor: 'white',
            borderRight: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 2
        }}>
            <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton onClick={() => dispatch(backToPlanning())} size="small">
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="subtitle1" fontWeight="600">Route Results</Typography>
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                {results && results.map((route) => (
                    <RouteCard key={route.id} route={route} />
                ))}
            </Box>
        </Box>
    );
};

export default RouteResultsView;
