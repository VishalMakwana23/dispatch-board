import React from 'react';
import { Paper, Box, Typography, Radio } from '@mui/material';

const StatusCodeOption = ({ label, selected, onSelect }) => {
  return (
    <Paper
      elevation={0}
      onClick={() => onSelect(label)}
      sx={{
        p: 1.5,
        mb: 1.5,
        borderRadius: '10px',
        border: selected ? '1px solid #F26A2E' : '1px solid #E0E0E0',
        backgroundColor: selected ? '#FFF5F2' : '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: selected ? '#F26A2E' : '#B0B0B0',
        },
      }}
    >
      <Radio
        checked={selected}
        onChange={() => onSelect(label)}
        value={label}
        name="status-code-radio"
        sx={{
          color: '#C4C4C4',
          p: 0.5,
          mr: 1,
          '&.Mui-checked': {
            color: '#F26A2E',
          },
        }}
      />
      <Typography variant="body2" sx={{ fontWeight: 500, color: selected ? '#F26A2E' : '#333' }}>
        {label}
      </Typography>
    </Paper>
  );
};

export default StatusCodeOption;
