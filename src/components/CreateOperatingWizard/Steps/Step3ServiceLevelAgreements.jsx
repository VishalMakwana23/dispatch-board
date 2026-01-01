import React from 'react';
import { Box, Typography, TextField, MenuItem, Select, RadioGroup, FormControlLabel, Radio, InputAdornment } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, parseISO } from 'date-fns';

const TIME_OPTIONS = [
    '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm',
    '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm'
];

const Step3ServiceLevelAgreements = ({ data, updateData }) => {

    // Helper to update specific fields in nested objects if needed, 
    // but for now we follow the flat structure or simple nesting from the parent state.

    const handleDateChange = (section, field, date) => {
        const currentSchedule = { ...data.slaSchedule };
        if (date) {
            currentSchedule[field] = format(date, 'yyyy-MM-dd');
        } else {
            currentSchedule[field] = '';
        }
        updateData(section, currentSchedule);
    };

    const handleWeeklyHoursChange = (dayKey, type, value) => {
        const currentSchedule = { ...data.slaSchedule };
        const weeklyHours = { ...currentSchedule.weeklyHours };
        const dayConfig = weeklyHours[dayKey] || { start: '', end: '' };

        weeklyHours[dayKey] = { ...dayConfig, [type]: value };

        updateData('slaSchedule', {
            ...currentSchedule,
            weeklyHours: weeklyHours
        });
    };

    const handleStopLevelTimeChange = (type, value) => {
        const currentSchedule = { ...data.slaSchedule };
        const stopLevel = { ...currentSchedule.stopLevel };
        stopLevel[type] = value;
        updateData('slaSchedule', {
            ...currentSchedule,
            stopLevel: stopLevel
        });
    };

    const handleConstraintChange = (field, value) => {
        updateData('operationalConstraints', {
            ...data.operationalConstraints,
            [field]: value
        });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: 'flex', gap: 3, height: '100%', overflowY: 'auto', p: 1 }}>

                {/* Left Column */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>

                    <Typography variant="subtitle2" fontWeight="600" color="#1B3E38">Service Level Agreements</Typography>

                    {/* Mid/Final Mile Route Model */}
                    <Box sx={{ border: '1px solid #E0E0E0', borderRadius: 2, p: 2 }}>
                        <Typography variant="caption" fontWeight="600" mb={1} display="block">Mid/Final Mile Route Model</Typography>
                        <RadioGroup
                            value={data.midFinalMileModel}
                            onChange={(e) => updateData('midFinalMileModel', e.target.value)}
                            sx={{ gap: 1 }}
                        >
                            {['Exclusive', 'Co-load', 'Fraction'].map((option) => (
                                <Box
                                    key={option}
                                    sx={{
                                        border: '1px solid #E0E0E0',
                                        borderRadius: 1,
                                        p: 1, pl: 2,
                                        display: 'flex', alignItems: 'center',
                                        '&:hover': { bgcolor: '#F9F9F9' }
                                    }}
                                >
                                    <FormControlLabel
                                        value={option.toLowerCase()}
                                        control={<Radio sx={{ color: '#1B3E38', '&.Mui-checked': { color: '#1B3E38' }, p: 0.5 }} size="small" />}
                                        label={<Typography variant="body2" fontWeight="500" fontSize="0.85rem">{option}</Typography>}
                                        sx={{ width: '100%', m: 0 }}
                                    />
                                </Box>
                            ))}
                        </RadioGroup>
                    </Box>

                    {/* Stops Priority Preference */}
                    <Box sx={{ border: '1px solid #E0E0E0', borderRadius: 2, p: 2 }}>
                        <Typography variant="caption" fontWeight="600" mb={1} display="block">Stops Priority Preference</Typography>
                        <RadioGroup
                            value={data.stopsPriority}
                            onChange={(e) => updateData('stopsPriority', e.target.value)}
                            sx={{ gap: 1 }}
                        >
                            <Box sx={{ border: '1px solid #E0E0E0', borderRadius: 1, p: 1, pl: 2, display: 'flex', alignItems: 'center' }}>
                                <FormControlLabel
                                    value="preference_1"
                                    control={<Radio sx={{ color: '#1B3E38', '&.Mui-checked': { color: '#1B3E38' }, p: 0.5 }} size="small" />}
                                    label={<Typography variant="body2" fontWeight="500" fontSize="0.85rem">Preference 1 - e.g. Pharma Products</Typography>}
                                    sx={{ width: '100%', m: 0 }}
                                />
                            </Box>
                            <Box sx={{ border: '1px solid #E0E0E0', borderRadius: 1, p: 1, pl: 2, display: 'flex', alignItems: 'center' }}>
                                <FormControlLabel
                                    value="preference_2"
                                    control={<Radio sx={{ color: '#1B3E38', '&.Mui-checked': { color: '#1B3E38' }, p: 0.5 }} size="small" />}
                                    label={<Typography variant="body2" fontWeight="500" fontSize="0.85rem">Preference 2 - e.g. Front Shop</Typography>}
                                    sx={{ width: '100%', m: 0 }}
                                />
                            </Box>
                        </RadioGroup>
                    </Box>

                    {/* Dynamic Overflow & Pre-departure */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ flex: 1, border: '1px solid #E0E0E0', borderRadius: 2, p: 2 }}>
                            <Typography variant="caption" fontWeight="600" mb={1} display="block">Dynamic Overflow Handling</Typography>
                            <Select
                                fullWidth
                                size="small"
                                value={data.dynamicOverflow || '20%'}
                                onChange={(e) => updateData('dynamicOverflow', e.target.value)}
                                sx={{ bgcolor: 'white', '& .MuiSelect-select': { fontSize: '0.85rem' } }}
                            >
                                <MenuItem value="10%">10%</MenuItem>
                                <MenuItem value="20%">20%</MenuItem>
                                <MenuItem value="30%">30%</MenuItem>
                            </Select>
                        </Box>
                        <Box sx={{ flex: 1, border: '1px solid #E0E0E0', borderRadius: 2, p: 2 }}>
                            <Typography variant="caption" fontWeight="600" mb={1} display="block">Pre-departure cutoff constraints</Typography>
                            <Select
                                fullWidth
                                size="small"
                                value={data.preDepartureCutoff || '20%'}
                                onChange={(e) => updateData('preDepartureCutoff', e.target.value)}
                                sx={{ bgcolor: 'white', '& .MuiSelect-select': { fontSize: '0.85rem' } }}
                            >
                                <MenuItem value="10%">10%</MenuItem>
                                <MenuItem value="20%">20%</MenuItem>
                                <MenuItem value="30%">30%</MenuItem>
                            </Select>
                        </Box>
                    </Box>

                    {/* Operational Constraints */}
                    <Box sx={{ border: '1px solid #E0E0E0', borderRadius: 2, p: 2 }}>
                        <Typography variant="caption" fontWeight="600" mb={2} display="block">Operational Constraints</Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #E0E0E0', borderRadius: 1, p: 1 }}>
                                <Typography variant="body2" sx={{ flex: 1, color: '#666' }}>Max dwell time at stops</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #1B3E38', borderRadius: 1, px: 1, py: 0.5 }}>
                                    <TextField
                                        variant="standard"
                                        InputProps={{ disableUnderline: true }}
                                        value={data.operationalConstraints?.maxDwell ?? 5}
                                        onChange={(e) => handleConstraintChange('maxDwell', e.target.value)}
                                        sx={{ width: 30, '& input': { textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, p: 0 } }}
                                    />
                                </Box>
                                <Typography variant="caption" color="text.secondary" ml={1}>Hours</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #E0E0E0', borderRadius: 1, p: 1 }}>
                                <Typography variant="body2" sx={{ flex: 1, color: '#666' }}>Max Stops</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #1B3E38', borderRadius: 1, px: 1, py: 0.5 }}>
                                    <TextField
                                        variant="standard"
                                        InputProps={{ disableUnderline: true }}
                                        value={data.operationalConstraints?.maxStops ?? 5}
                                        onChange={(e) => handleConstraintChange('maxStops', e.target.value)}
                                        sx={{ width: 30, '& input': { textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, p: 0 } }}
                                    />
                                </Box>
                                <Typography variant="caption" color="text.secondary" ml={1} lineHeight={1.2}>Count <br /> / Per Day</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #E0E0E0', borderRadius: 1, p: 1 }}>
                            <Typography variant="body2" sx={{ flex: 1, color: '#666' }}>Max Distance</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #1B3E38', borderRadius: 1, px: 1, py: 0.5 }}>
                                <TextField
                                    variant="standard"
                                    InputProps={{ disableUnderline: true }}
                                    value={data.operationalConstraints?.maxDistance ?? 5}
                                    onChange={(e) => handleConstraintChange('maxDistance', e.target.value)}
                                    sx={{ width: 30, '& input': { textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, p: 0 } }}
                                />
                            </Box>
                            <Typography variant="caption" color="text.secondary" ml={1} lineHeight={1.2}>KM <br /> / Per Day</Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Right Column */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="subtitle2" fontWeight="600" color="#1B3E38">Completion windows</Typography>

                    <Box sx={{ border: '1px solid #E0E0E0', borderRadius: 2, p: 2 }}>

                        {/* Route-level completion windows */}
                        <Typography variant="caption" fontWeight="600" mb={1} display="block">Route-level completion windows</Typography>
                        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>Start Date</Typography>
                                <DatePicker
                                    value={data.slaSchedule?.startDate ? parseISO(data.slaSchedule.startDate) : null}
                                    onChange={(newValue) => handleDateChange('slaSchedule', 'startDate', newValue)}
                                    format="MM/dd/yyyy"
                                    slots={{ openPickerIcon: CalendarTodayIcon }}
                                    slotProps={{
                                        textField: {
                                            size: 'small', fullWidth: true,
                                            sx: { '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#1B3E38' } }
                                        },
                                        openPickerButton: { sx: { color: '#1B3E38' } },
                                        layout: { sx: { '& .MuiPickersDay-root.Mui-selected': { bgcolor: '#1B3E38' } } }
                                    }}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>End Date</Typography>
                                <DatePicker
                                    value={data.slaSchedule?.endDate ? parseISO(data.slaSchedule.endDate) : null}
                                    onChange={(newValue) => handleDateChange('slaSchedule', 'endDate', newValue)}
                                    format="MM/dd/yyyy"
                                    slots={{ openPickerIcon: CalendarTodayIcon }}
                                    slotProps={{
                                        textField: {
                                            size: 'small', fullWidth: true,
                                            sx: { '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#1B3E38' } }
                                        },
                                        openPickerButton: { sx: { color: '#1B3E38' } },
                                        layout: { sx: { '& .MuiPickersDay-root.Mui-selected': { bgcolor: '#1B3E38' } } }
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Weekly Hours */}
                        <Typography variant="caption" color="text.secondary" mb={1.5} display="block">Weekly Hours</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => {
                                const dayKey = `day_${index}`;
                                const weeklyHours = data.slaSchedule?.weeklyHours || {};
                                const dayConfig = weeklyHours[dayKey] || { start: '', end: '' };
                                const isActive = !!dayConfig.start;

                                return (
                                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Box sx={{
                                            width: 32, height: 32, borderRadius: '50%',
                                            bgcolor: isActive ? '#1B3E38' : '#F0F0F0',
                                            color: isActive ? 'white' : '#9E9E9E',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 13, fontWeight: 600
                                        }}>
                                            {day}
                                        </Box>
                                        <Select
                                            size="small"
                                            value={dayConfig.start}
                                            onChange={(e) => handleWeeklyHoursChange(dayKey, 'start', e.target.value)}
                                            sx={{
                                                minWidth: 120, bgcolor: 'white',
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
                                            value={dayConfig.end}
                                            onChange={(e) => handleWeeklyHoursChange(dayKey, 'end', e.target.value)}
                                            sx={{
                                                minWidth: 120, bgcolor: 'white',
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
                                    </Box>
                                );
                            })}
                        </Box>

                        {/* Stop-level time windows */}
                        <Box sx={{ border: '1px solid #E0E0E0', borderRadius: 2, p: 2 }}>
                            <Typography variant="caption" fontWeight="600" mb={2} display="block">Stop-level time windows</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Select
                                    size="small"
                                    value={data.slaSchedule?.stopLevel?.start || ''}
                                    onChange={(e) => handleStopLevelTimeChange('start', e.target.value)}
                                    sx={{ flex: 1, bgcolor: 'white', '& .MuiSelect-select': { fontSize: '0.85rem' } }}
                                    displayEmpty
                                >
                                    <MenuItem value=""><Typography variant="caption" color="text.secondary">Start Time</Typography></MenuItem>
                                    {TIME_OPTIONS.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                                </Select>
                                <Typography color="text.secondary">-</Typography>
                                <Select
                                    size="small"
                                    value={data.slaSchedule?.stopLevel?.end || ''}
                                    onChange={(e) => handleStopLevelTimeChange('end', e.target.value)}
                                    sx={{ flex: 1, bgcolor: 'white', '& .MuiSelect-select': { fontSize: '0.85rem' } }}
                                    displayEmpty
                                >
                                    <MenuItem value=""><Typography variant="caption" color="text.secondary">End Time</Typography></MenuItem>
                                    {TIME_OPTIONS.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                                </Select>
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Box >
        </LocalizationProvider >
    );
};

export default Step3ServiceLevelAgreements;
