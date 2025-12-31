import React from 'react';
import { Box, Typography } from '@mui/material';

const PlaceholderStep = ({ title }) => {
    return (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography variant="h5" color="text.secondary">{title}</Typography>
        </Box>
    );
};

export default PlaceholderStep;
