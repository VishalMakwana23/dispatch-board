import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const UnassignedOrdersView = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4, textAlign: 'center', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5" color="textSecondary">
          Unassigned orders page coming soon...
        </Typography>
      </Paper>
    </Box>
  );
};

export default UnassignedOrdersView;
