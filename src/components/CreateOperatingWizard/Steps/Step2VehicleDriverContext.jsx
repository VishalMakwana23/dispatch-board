import React, { useRef } from 'react';
import { Box, Typography, Grid, Paper, Checkbox, FormControlLabel, Radio, TextField, Select, MenuItem, Chip, IconButton, InputAdornment, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Vehicle Images
import sedanImg from '../../../assets/vehicles/sedan.png';
import minivanImg from '../../../assets/vehicles/mini van.png';
import cargovanImg from '../../../assets/vehicles/cargo van.png';
import sprinterImg from '../../../assets/vehicles/sprinter.png';
import oneTonImg from '../../../assets/vehicles/1 ton.png';
import fiveTonImg from '../../../assets/vehicles/5 ton.png';
import transportImg from '../../../assets/vehicles/transport.png';

// Auth Logos
import googleLogo from '../../../assets/logos/google.png';
import microsoftLogo from '../../../assets/logos/microsoft.png';

// Mock Vehicle Data
const VEHICLE_TYPES = [
    { id: 'sedan', name: 'Sedan', image: sedanImg },
    { id: 'minivan', name: 'MiniVan', image: minivanImg },
    { id: 'cargovan', name: 'CargoVan', image: cargovanImg },
    { id: 'sprinter', name: 'Sprinter', image: sprinterImg },
    { id: '1ton', name: '1 Ton', image: fiveTonImg },
    { id: '5ton', name: '5 Ton', image: fiveTonImg },
    { id: 'transport', name: 'Transport', image: transportImg },
];

const TIME_OPTIONS = [
    '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm',
    '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm'
];

const Step2VehicleDriverContext = ({ data, updateData }) => {
    // Handlers
    const handleVehicleToggle = (id) => {
        const currentVehicles = { ...data.selectedVehicles };
        if (currentVehicles[id]) {
            delete currentVehicles[id];
        } else {
            currentVehicles[id] = { quantity: 1 };
        }
        updateData('selectedVehicles', currentVehicles);
    };

    const handleVehicleQuantityChange = (id, change) => {
        const currentVehicles = { ...data.selectedVehicles };
        if (currentVehicles[id]) {
            const newQty = Math.max(1, (currentVehicles[id].quantity || 1) + change);
            currentVehicles[id] = { ...currentVehicles[id], quantity: newQty };
            updateData('selectedVehicles', currentVehicles);
        }
    };

    const handleConsiderationToggle = (field, value) => {
        const list = data[field] || [];
        if (list.includes(value)) {
            updateData(field, list.filter(item => item !== value));
        } else {
            updateData(field, [...list, value]);
        }
    };

    const handleWeeklyHoursChange = (dayKey, type, value) => {
        const currentSchedule = { ...data.driverSchedule };
        const weeklyHours = { ...currentSchedule.weeklyHours };
        const dayConfig = weeklyHours[dayKey] || { start: '', end: '' };

        weeklyHours[dayKey] = { ...dayConfig, [type]: value };

        updateData('driverSchedule', {
            ...currentSchedule,
            weeklyHours: weeklyHours
        });
    };

    const handleConfigChange = (section, field, value) => {
        updateData(section, { ...data[section], [field]: value });
    };

    const handleMarketVehicleCountChange = (marketName, vehicleId, field, value) => {
        let cleanValue = value;
        if (cleanValue.length > 1 && cleanValue.startsWith('0')) {
            cleanValue = cleanValue.substring(1);
        }

        const currentCounts = { ...(data.marketVehicleCounts || {}) };
        currentCounts[marketName] = { ...(currentCounts[marketName] || {}) };

        // Initialize if it doesn't exist or is not an object (migration from old single value)
        if (typeof currentCounts[marketName][vehicleId] !== 'object' || currentCounts[marketName][vehicleId] === null) {
            currentCounts[marketName][vehicleId] = { count: 0, capacity: 0 };
        }

        currentCounts[marketName][vehicleId] = {
            ...currentCounts[marketName][vehicleId],
            [field]: cleanValue
        };

        updateData('marketVehicleCounts', currentCounts);
    };

    return (
        <Box sx={{ display: 'flex', gap: 3, height: '100%', overflow: 'hidden', p: 1 }}>

            {/* Left Column: Vehicle Context */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}> {/* Added overflowY: auto just in case left column content exceeds height on small screens, but generally it stays fixed as requested if content is small */}

                {/* Vehicles Grid */}
                <Box sx={{ border: '1px solid #E0E0E0', borderRadius: 2, p: 2 }}>
                    <Typography variant="caption" fontWeight="600" mb={1} display="block">Vehicles</Typography>
                    <Typography variant="caption" color="text.secondary" mb={2} display="block">select needed Vehicle</Typography>

                    <Grid container spacing={1} mb={2}>
                        {VEHICLE_TYPES.map((vehicle) => {
                            const isSelected = !!data.selectedVehicles?.[vehicle.id];
                            return (
                                <Grid item xs={3} key={vehicle.id}>
                                    <Box
                                        onClick={() => handleVehicleToggle(vehicle.id)}
                                        sx={{
                                            border: isSelected ? '2px solid #1B3E38' : '1px solid #E0E0E0',
                                            borderRadius: 2, p: 1, height: 85,
                                            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                                            cursor: 'pointer', position: 'relative',
                                            bgcolor: isSelected ? '#F2F7F6' : 'white',
                                            transition: 'all 0.2s',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <Checkbox
                                                checked={isSelected}
                                                size="small"
                                                sx={{ p: 0, color: '#1B3E38', '&.Mui-checked': { color: '#1B3E38' }, position: 'absolute', top: 8, left: 8 }}
                                            />
                                        </Box>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%',
                                            mt: 1,
                                            mb: 0.5
                                        }}>
                                            <img
                                                src={vehicle.image}
                                                alt={vehicle.name}
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: '45px', // Constraint height to fit
                                                    objectFit: 'contain'
                                                }}
                                            />
                                        </Box>
                                        <Typography variant="caption" fontWeight="600" sx={{ fontSize: '0.7rem', ml: 0.5 }}>{vehicle.name}</Typography>
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>

                    {/* Market x Vehicle Matrix Table */}
                    <Box sx={{ mb: 1, overflowX: 'auto', mt: 2 }}>
                        <TableContainer component={Paper} elevation={0} sx={{ border: 'none' }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: '#666', borderBottom: '1px solid #E0E0E0', minWidth: 120 }}>
                                            Ziing Markets
                                        </TableCell>
                                        {Object.keys(data.selectedVehicles || {}).map(vehId => {
                                            const details = VEHICLE_TYPES.find(v => v.id === vehId);
                                            return (
                                                <TableCell key={vehId} sx={{ fontWeight: 600, fontSize: '0.75rem', color: '#666', borderBottom: '1px solid #E0E0E0', minWidth: 140 }}>
                                                    {details?.name}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(data.markets || []).map((market) => (
                                        <TableRow key={market.name}>
                                            <TableCell sx={{ fontSize: '0.85rem', fontWeight: 500, borderBottom: '1px solid #F0F0F0', py: 1.5 }}>
                                                {market.name}
                                            </TableCell>
                                            {Object.keys(data.selectedVehicles || {}).map(vehId => {
                                                const record = data.marketVehicleCounts?.[market.name]?.[vehId];
                                                // Handle legacy simple number vs new object structure
                                                const countVal = (typeof record === 'object' ? record?.count : record) ?? 0;
                                                const capacityVal = (typeof record === 'object' ? record?.capacity : 0) ?? 0;

                                                return (
                                                    <TableCell key={vehId} sx={{ borderBottom: '1px solid #F0F0F0', py: 1 }}>
                                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                                                            {/* Count Input */}
                                                            <Box>
                                                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', display: 'block', mb: 0.5 }}>Count</Typography>
                                                                <TextField
                                                                    variant="standard"
                                                                    size="small"
                                                                    fullWidth
                                                                    InputProps={{ disableUnderline: false }}
                                                                    placeholder="-"
                                                                    value={countVal}
                                                                    onChange={(e) => handleMarketVehicleCountChange(market.name, vehId, 'count', e.target.value)}
                                                                    sx={{
                                                                        '& input': { textAlign: 'center', fontSize: '0.9rem' },
                                                                        maxWidth: 60
                                                                    }}
                                                                />
                                                            </Box>
                                                            {/* Capacity Input */}
                                                            <Box>
                                                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', display: 'block', mb: 0.5 }}>Capacity</Typography>
                                                                <TextField
                                                                    variant="standard"
                                                                    size="small"
                                                                    fullWidth
                                                                    InputProps={{ disableUnderline: false }}
                                                                    placeholder="-"
                                                                    value={capacityVal}
                                                                    onChange={(e) => handleMarketVehicleCountChange(market.name, vehId, 'capacity', e.target.value)}
                                                                    sx={{
                                                                        '& input': { textAlign: 'center', fontSize: '0.9rem' },
                                                                        maxWidth: 60
                                                                    }}
                                                                />
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>

                {/* Considerations */}
                <Box sx={{ border: '1px solid #E0E0E0', borderRadius: 2, p: 2 }}>
                    <Typography variant="caption" fontWeight="600" mb={1} display="block">Vehicles Considerations</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {['Driver Heatmap', 'Temperature Control', 'Geo Sensor', 'Door Sensor', 'RFID sensor'].map(option => (
                            <Box
                                key={option}
                                onClick={() => handleConsiderationToggle('vehicleConsiderations', option)}
                                sx={{
                                    display: 'flex', alignItems: 'center', gap: 1,
                                    border: '1px solid #E0E0E0', borderRadius: 1, p: 1, cursor: 'pointer',
                                    '&:hover': { bgcolor: '#F9F9F9' }
                                }}
                            >
                                <Checkbox
                                    checked={(data.vehicleConsiderations || []).includes(option)}
                                    size="small"
                                    sx={{ p: 0.5, color: '#1B3E38', '&.Mui-checked': { color: '#1B3E38' } }}
                                />
                                <Typography variant="caption" fontWeight="500">{option}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ borderColor: '#E0E0E0' }} />

            {/* Right Column: Driver Context */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto', pr: 1 }}> {/* Added overflowY: auto and pr: 1 for right scroll */}

                {/* Drivers Schedule */}
                <Box sx={{ border: '1px solid #E0E0E0', borderRadius: 2, p: 2 }}>
                    <Typography variant="caption" fontWeight="600" mb={2} display="block">Drivers Schedule</Typography>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="caption" color="text.secondary" mb={0.5} display="block">Service hours limitations</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #E0E0E0', borderRadius: 1, p: 1 }}>
                            <Typography variant="body2" sx={{ flex: 1, color: '#666' }}>Service hours limitations</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #1B3E38', borderRadius: 1, px: 1, py: 0.5 }}>
                                <TextField
                                    variant="standard"
                                    InputProps={{ disableUnderline: true }}
                                    value={data.driverSchedule?.serviceHours ?? 5}
                                    onChange={(e) => handleConfigChange('driverSchedule', 'serviceHours', e.target.value)}
                                    sx={{ width: 30, '& input': { textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, p: 0 } }}
                                />
                            </Box>
                            <Typography variant="caption" color="text.secondary" ml={1} lineHeight={1.2}>Hrs <br /> / Per Day</Typography>
                        </Box>
                    </Box>

                    <Typography variant="caption" color="text.secondary" mb={1} display="block">Fixed Weekly schedules</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => {
                            const dayKey = `day_${index}`;
                            const weeklyHours = data.driverSchedule?.weeklyHours || {};
                            const dayConfig = weeklyHours[dayKey] || { start: '', end: '' };
                            const isActive = !!dayConfig.start;

                            return (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
                                    <Box sx={{
                                        width: 32, height: 32, borderRadius: '50%',
                                        bgcolor: isActive ? '#1B3E38' : '#F0F0F0',
                                        color: isActive ? 'white' : '#9E9E9E',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 13, fontWeight: 600,
                                        flexShrink: 0
                                    }}>
                                        {day}
                                    </Box>
                                    <Select
                                        size="small"
                                        fullWidth
                                        value={dayConfig.start || ''}
                                        onChange={(e) => handleWeeklyHoursChange(dayKey, 'start', e.target.value)}
                                        sx={{
                                            flex: 1, bgcolor: 'white',
                                            borderRadius: 1,
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: isActive ? '#1B3E38' : '#E0E0E0' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1B3E38' },
                                            '& .MuiSelect-select': { py: 1, fontSize: '0.85rem', color: isActive ? '#1B3E38' : '#9E9E9E' }
                                        }}
                                        displayEmpty
                                    >
                                        <MenuItem value=""><Typography variant="caption" color="text.secondary">Start Time</Typography></MenuItem>
                                        {TIME_OPTIONS.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                                    </Select>
                                    <Typography color="text.secondary">-</Typography>
                                    <Select
                                        size="small"
                                        fullWidth
                                        value={dayConfig.end || ''}
                                        onChange={(e) => handleWeeklyHoursChange(dayKey, 'end', e.target.value)}
                                        sx={{
                                            flex: 1, bgcolor: 'white',
                                            borderRadius: 1,
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: isActive ? '#1B3E38' : '#E0E0E0' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1B3E38' },
                                            '& .MuiSelect-select': { py: 1, fontSize: '0.85rem', color: isActive ? '#1B3E38' : '#9E9E9E' }
                                        }}
                                        displayEmpty
                                    >
                                        <MenuItem value=""><Typography variant="caption" color="text.secondary">End Time</Typography></MenuItem>
                                        {TIME_OPTIONS.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                                    </Select>

                                    <Typography color="text.secondary" sx={{ mx: 0.5 }}>|</Typography>

                                    {/* Break Start */}
                                    <Select
                                        size="small"
                                        fullWidth
                                        value={dayConfig.breakStart || ''}
                                        onChange={(e) => handleWeeklyHoursChange(dayKey, 'breakStart', e.target.value)}
                                        sx={{
                                            flex: 1, bgcolor: 'white',
                                            borderRadius: 1,
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: isActive ? '#1B3E38' : '#E0E0E0' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1B3E38' },
                                            '& .MuiSelect-select': { py: 1, fontSize: '0.85rem', color: isActive ? '#1B3E38' : '#9E9E9E' }
                                        }}
                                        displayEmpty
                                    >
                                        <MenuItem value=""><Typography variant="caption" color="text.secondary">Break Start</Typography></MenuItem>
                                        {TIME_OPTIONS.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                                    </Select>
                                    <Typography color="text.secondary">-</Typography>

                                    {/* Break End */}
                                    <Select
                                        size="small"
                                        fullWidth
                                        value={dayConfig.breakEnd || ''}
                                        onChange={(e) => handleWeeklyHoursChange(dayKey, 'breakEnd', e.target.value)}
                                        sx={{
                                            flex: 1, bgcolor: 'white',
                                            borderRadius: 1,
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: isActive ? '#1B3E38' : '#E0E0E0' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1B3E38' },
                                            '& .MuiSelect-select': { py: 1, fontSize: '0.85rem', color: isActive ? '#1B3E38' : '#9E9E9E' }
                                        }}
                                        displayEmpty
                                    >
                                        <MenuItem value=""><Typography variant="caption" color="text.secondary">Break End</Typography></MenuItem>
                                        {TIME_OPTIONS.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                                    </Select>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>

                {/* Drivers Eligibility */}
                <Box sx={{ border: '1px solid #E0E0E0', borderRadius: 2, p: 2 }}>
                    <Typography variant="caption" fontWeight="600" mb={1} display="block">Drivers Eligibility</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {['Transportation of Dangerous Goods card(TDG)', "Workers' Compensation Coverage(WCB)", 'Electronic Logbook (ELD) - (conditional based on regulated threshold and market)'].map(option => (
                            <Box
                                key={option}
                                onClick={() => handleConsiderationToggle('driverEligibility', option)}
                                sx={{
                                    display: 'flex', alignItems: 'center', gap: 1,
                                    border: '1px solid #E0E0E0', borderRadius: 1, p: 1, cursor: 'pointer',
                                    '&:hover': { bgcolor: '#F9F9F9' }
                                }}
                            >
                                <Checkbox
                                    checked={(data.driverEligibility || []).includes(option)}
                                    size="small"
                                    sx={{ p: 0.5, color: '#1B3E38', '&.Mui-checked': { color: '#1B3E38' } }}
                                />
                                <Typography variant="caption" fontWeight="500">{option}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Variable driver schedule */}
                <Box sx={{ border: '1px solid #E0E0E0', borderRadius: 2, p: 2 }}>
                    <Typography variant="caption" fontWeight="600" mb={1} display="block">Variable driver schedule</Typography>

                    <Box sx={{ p: 2, border: '1px solid #E0E0E0', borderRadius: 2 }}>
                        {/* Header with Market Selector */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="subtitle2" fontWeight="600" sx={{ fontSize: '0.9rem' }}>Active drivers</Typography>

                            <Select
                                size="small"
                                value={data.variableDriverSchedule?.selectedMarket || (data.markets?.[0]?.name || '')}
                                onChange={(e) => {
                                    const current = data.variableDriverSchedule || {};
                                    updateData('variableDriverSchedule', { ...current, selectedMarket: e.target.value });
                                }}
                                displayEmpty
                                variant="outlined"
                                sx={{
                                    height: 36,
                                    fontSize: '0.85rem',
                                    minWidth: 140,
                                    bgcolor: 'white',
                                    borderRadius: 10,
                                    borderColor: '#1B3E38',
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#1B3E38' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1B3E38' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1B3E38', borderWidth: 2 },
                                    color: '#1B3E38',
                                    fontWeight: 600
                                }}
                            >
                                <MenuItem value="" disabled>Select Market</MenuItem>
                                {(data.markets || []).map(m => (
                                    <MenuItem key={m.name} value={m.name}>{m.name}</MenuItem>
                                ))}
                                {/* Fallback for promo/demo if no markets added */}
                                {(data.markets || []).length === 0 && <MenuItem value="Default Market">Default Market</MenuItem>}
                            </Select>
                        </Box>

                        <Grid container spacing={2}>
                            {(() => {
                                // Dynamic Driver Data Resolution
                                const currentMarket = data.variableDriverSchedule?.selectedMarket || (data.markets?.[0]?.name) || 'Default Market';

                                const getDriversForMarket = (marketName) => {
                                    const name = marketName.toLowerCase();

                                    // Set 1: Toronto / East
                                    if (name.includes('toronto') || name.includes('mississauga') || name.includes('montreal')) {
                                        return [
                                            { id: `to1`, firstName: 'Cameron', lastName: 'Williamson', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces' }, // Changed img
                                            { id: `to2`, firstName: 'Brooklyn', lastName: 'Simmons', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces' },
                                            { id: `to3`, firstName: 'Guy', lastName: 'Hawkins', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces' },
                                            { id: `to4`, firstName: 'Jenny', lastName: 'Wilson', img: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?w=150&h=150&fit=crop&crop=faces' },

                                        ];
                                    }
                                    // Set 2: Vancouver / West
                                    else if (name.includes('vancouver') || name.includes('richmond') || name.includes('surrey')) {
                                        return [
                                            { id: `van1`, firstName: 'Courtney', lastName: 'Henry', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=faces' },
                                            { id: `van2`, firstName: 'Arlene', lastName: 'McCoy', img: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&h=150&fit=crop&crop=faces' },
                                            { id: `van3`, firstName: 'Ralph', lastName: 'Edwards', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces' },
                                            { id: `van4`, firstName: 'Jerome', lastName: 'Bell', img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=faces' },

                                        ];
                                    }
                                    // Set 3: Edmonton / Prairies
                                    else if (name.includes('edmonton') || name.includes('winnipeg') || name.includes('calgary')) {
                                        return [
                                            { id: `edm1`, firstName: 'Leslie', lastName: 'Alexander', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces' },
                                            { id: `edm2`, firstName: 'Ronald', lastName: 'Richards', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces' },
                                            { id: `edm3`, firstName: 'Jane', lastName: 'Cooper', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces' },
                                            { id: `edm4`, firstName: 'Robert', lastName: 'Fox', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces' },

                                        ];
                                    }
                                    // Fallback: Default Mix
                                    else {
                                        return [
                                            { id: `gen1`, firstName: 'Savannah', lastName: 'Nguyen', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces' },
                                            { id: `gen2`, firstName: 'Marvin', lastName: 'McKinney', img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=faces' },
                                            { id: `gen3`, firstName: 'Bessie', lastName: 'Cooper', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces' },
                                            { id: `gen4`, firstName: 'Darrell', lastName: 'Steward', img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=faces' },

                                        ];
                                    }
                                };

                                const drivers = getDriversForMarket(currentMarket);

                                return drivers.map((driver) => {
                                    const driverDates = data.variableDriverSchedule?.driverDates || {};
                                    // Key by driver ID AND market to ensure uniqueness if needed, currently generic ID is enough
                                    const selectedDate = driverDates[driver.id] ? new Date(driverDates[driver.id]) : null;

                                    return (
                                        <Grid item xs={6} key={driver.id}>
                                            <Box sx={{
                                                border: '1px solid #E0E0E0',
                                                borderRadius: 3, // More rounded as per image
                                                p: 2,
                                                bgcolor: 'white',
                                                transition: 'box-shadow 0.2s',
                                                '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }
                                            }}>
                                                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                                    <Avatar
                                                        src={driver.img}
                                                        sx={{ width: 48, height: 48, bgcolor: '#F5F5F5' }}
                                                    />
                                                    <Box sx={{ flex: 1 }}>
                                                        <Box sx={{ borderBottom: '1px solid #F0F0F0', pb: 0.5, mb: 0.5 }}>
                                                            <Typography variant="caption" color="text.secondary" display="block" fontSize="0.65rem" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>First Name</Typography>
                                                            <Typography variant="body2" fontSize="0.9rem" fontWeight="600" color="#333">{driver.firstName}</Typography>
                                                        </Box>
                                                        <Box sx={{ borderBottom: '1px solid #F0F0F0', pb: 0.5 }}>
                                                            <Typography variant="caption" color="text.secondary" display="block" fontSize="0.65rem" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>Last Name</Typography>
                                                            <Typography variant="body2" fontSize="0.9rem" fontWeight="600" color="#333">{driver.lastName}</Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                {/* Auth Buttons */}
                                                <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
                                                    <Box
                                                        component="button"
                                                        sx={{
                                                            flex: 1,
                                                            border: 'none',
                                                            bgcolor: '#1a73e8',
                                                            color: 'white',
                                                            borderRadius: 5, // More rounded pill shape? Or just slightly rounded? User image had standard rounded. Let's stick to 1 or maybe 2.
                                                            py: 0.8,
                                                            px: 1.5,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            cursor: 'pointer',
                                                            gap: 1.5,
                                                            fontSize: '0.7rem',
                                                            fontWeight: 600,
                                                            textWrap: 'nowrap',
                                                            transition: 'opacity 0.2s',
                                                            '&:hover': { opacity: 0.9 }
                                                        }}
                                                    >
                                                        Integrated
                                                        <Box
                                                            component="img"
                                                            src={googleLogo}
                                                            sx={{ width: 16, height: 16, bgcolor: 'white', borderRadius: '50%', p: 0.25 }}
                                                        />
                                                    </Box>
                                                    <Box
                                                        component="button"
                                                        sx={{
                                                            flex: 1,
                                                            border: 'none',
                                                            bgcolor: '#2f2f2f',
                                                            color: 'white',
                                                            borderRadius: 5,
                                                            py: 0.8,
                                                            px: 1.5,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            cursor: 'pointer',
                                                            gap: 1.5,
                                                            fontSize: '0.7rem',
                                                            fontWeight: 600,
                                                            textWrap: 'nowrap',
                                                            transition: 'opacity 0.2s',
                                                            '&:hover': { opacity: 0.9 }
                                                        }}
                                                    >
                                                        Integrated
                                                        <Box
                                                            component="img"
                                                            src={microsoftLogo}
                                                            sx={{ width: 16, height: 16 }}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    );
                                });
                            })()}
                        </Grid>
                    </Box>
                </Box>

                {/* Drivers Considerations */}
                <Box sx={{ border: '1px solid #E0E0E0', borderRadius: 2, p: 2 }}>
                    <Typography variant="caption" fontWeight="600" mb={2} display="block">Drivers Considerations</Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                        <Typography variant="caption" color="text.secondary">Max Stops</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ border: '1px solid #1B3E38', borderRadius: 1, px: 1, py: 0.5 }}>
                                <TextField
                                    variant="standard"
                                    InputProps={{ disableUnderline: true }}
                                    value={data.driverConsiderations?.maxStops ?? 5}
                                    onChange={(e) => handleConfigChange('driverConsiderations', 'maxStops', e.target.value)}
                                    sx={{ width: 30, '& input': { textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, p: 0 } }}
                                />
                            </Box>
                            <Typography variant="caption" color="text.secondary" ml={1} lineHeight={1.2}>Count <br /> / Per Day</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="caption" color="text.secondary">Max Distance</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ border: '1px solid #1B3E38', borderRadius: 1, px: 1, py: 0.5 }}>
                                <TextField
                                    variant="standard"
                                    InputProps={{ disableUnderline: true }}
                                    value={data.driverConsiderations?.maxDistance ?? 5}
                                    onChange={(e) => handleConfigChange('driverConsiderations', 'maxDistance', e.target.value)}
                                    sx={{ width: 30, '& input': { textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, p: 0 } }}
                                />
                            </Box>
                            <Typography variant="caption" color="text.secondary" ml={1} lineHeight={1.2}>KM <br /> / Per Day</Typography>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
};

export default Step2VehicleDriverContext;
