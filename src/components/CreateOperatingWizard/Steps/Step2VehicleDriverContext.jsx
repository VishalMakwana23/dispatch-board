import React, { useRef } from 'react';
import { Box, Typography, Grid, Paper, Checkbox, FormControlLabel, Radio, TextField, Select, MenuItem, Chip, IconButton, InputAdornment, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Vehicle Images
import sedanImg from '../../../assets/vehicles/sedan.png';
import minivanImg from '../../../assets/vehicles/mini van.png';
import cargovanImg from '../../../assets/vehicles/cargo van.png';
import sprinterImg from '../../../assets/vehicles/sprinter.png';
import oneTonImg from '../../../assets/vehicles/1 ton.png';
import fiveTonImg from '../../../assets/vehicles/5 ton.png';
import transportImg from '../../../assets/vehicles/transport.png';

// Mock Vehicle Data
const VEHICLE_TYPES = [
    { id: 'sedan', name: 'Sedan', image: sedanImg },
    { id: 'minivan', name: 'MiniVan', image: minivanImg },
    { id: 'cargovan', name: 'CargoVan', image: cargovanImg },
    { id: 'sprinter', name: 'Sprinter', image: sprinterImg },
    { id: '1ton', name: '1 Ton', image: oneTonImg },
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
        <Box sx={{ display: 'flex', gap: 3, height: '100%', overflowY: 'auto', p: 1 }}>

            {/* Left Column: Vehicle Context */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>

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
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>

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
                        {['Transportation of Dangerous Goods card(TDG)', "Workers' Compensation Coverage(WCB)", 'Electronic Logbook (ELD)'].map(option => (
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
