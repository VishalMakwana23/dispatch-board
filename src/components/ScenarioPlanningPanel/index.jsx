import React, { useState } from 'react';
import { Box, Typography, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import FilterPopup from '../RoutesPanel/FilterPopup'; // Reuse filter if needed or create new

const ScenarioPlanningPanel = ({ isCollapsed = false, onAdd }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const filterOpen = Boolean(filterAnchorEl);

    return (
        <Box
            sx={{
                width: '350px',
                height: 'calc(100vh - 64px)',
                backgroundColor: '#F6F7F8',
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1px solid #e0e0e0',
                position: 'fixed',
                left: isCollapsed ? '65px' : '240px',
                top: '64px',
                zIndex: 1100,
                transition: 'left 0.3s ease',
            }}
        >
            <Box sx={{ p: 2, pb: 1, bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Scenario Planning</Typography>
                </Box>

                <TextField
                    fullWidth
                    placeholder="Search..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 2 }}
                />

                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={onAdd}
                    sx={{
                        borderColor: '#1B3E38',
                        color: '#1B3E38',
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                            borderColor: '#142d2a',
                            backgroundColor: 'rgba(27, 62, 56, 0.05)'
                        }
                    }}
                >
                    Add
                </Button>
            </Box>

            {/* Empty State */}
            <Box sx={{ flexGrow: 1, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.6 }}>
                <Typography variant="body1" align="center" sx={{ color: '#666' }}>
                    Hey, You don't have any planned routes yet!
                </Typography>
            </Box>

            {/* Reusing FilterPopup from RoutesPanel or we could stub it */}
            <FilterPopup
                open={filterOpen}
                anchorEl={filterAnchorEl}
                onClose={() => setFilterAnchorEl(null)}
                onApply={() => { }}
                type="routes"
            />
        </Box>
    );
};

export default ScenarioPlanningPanel;
