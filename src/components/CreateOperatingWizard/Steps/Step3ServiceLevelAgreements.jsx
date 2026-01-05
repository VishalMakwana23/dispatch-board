import React from 'react';
import { Box, Typography, TextField, MenuItem, Select, RadioGroup, FormControlLabel, Radio, InputAdornment, Divider, Checkbox } from '@mui/material';
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

    const handlePreDepartureToggle = (value) => {
        const currentList = Array.isArray(data.preDepartureCutoff) ? data.preDepartureCutoff : [];
        if (currentList.includes(value)) {
            updateData('preDepartureCutoff', currentList.filter(item => item !== value));
        } else {
            updateData('preDepartureCutoff', [...currentList, value]);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: 'flex', gap: 3, height: '100%', overflowY: 'auto', p: 1 }}>

                {/* Left Column */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>

                    {/* Mid/Final Mile Route Model */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ minWidth: 240, fontWeight: 700, fontSize: '0.9rem', color: '#1a1a1a' }}>Final Mile Route Model</Typography>
                        <RadioGroup
                            row
                            value={data.midFinalMileModel}
                            onChange={(e) => updateData('midFinalMileModel', e.target.value)}
                            sx={{ gap: 3 }}
                        >
                            {['Exclusive', 'Co-load', 'Fractional'].map((option) => (
                                <FormControlLabel
                                    key={option}
                                    value={option.toLowerCase()}
                                    control={<Radio sx={{ color: '#1B3E38', '&.Mui-checked': { color: '#1B3E38' }, p: 0.5 }} size="small" />}
                                    label={<Typography variant="body2">{option}</Typography>}
                                />
                            ))}
                        </RadioGroup>
                    </Box>

                    {/* Stops Priority Preference */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ minWidth: 240, fontWeight: 700, fontSize: '0.9rem', color: '#1a1a1a' }}>Stops Priority Preference</Typography>
                        <RadioGroup
                            row
                            value={data.stopsPriority}
                            onChange={(e) => updateData('stopsPriority', e.target.value)}
                            sx={{ gap: 3 }}
                        >
                            <FormControlLabel
                                value="preference_1"
                                control={<Radio sx={{ color: '#1B3E38', '&.Mui-checked': { color: '#1B3E38' }, p: 0.5 }} size="small" />}
                                label={<Typography variant="body2">Preference 1 - e.g. Pharma Products</Typography>}
                            />
                            <FormControlLabel
                                value="preference_2"
                                control={<Radio sx={{ color: '#1B3E38', '&.Mui-checked': { color: '#1B3E38' }, p: 0.5 }} size="small" />}
                                label={<Typography variant="body2">Preference 2 - e.g. Front Shop</Typography>}
                            />
                        </RadioGroup>
                    </Box>

                    {/* Dynamic Overflow Handling */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ minWidth: 240, fontWeight: 700, fontSize: '0.9rem', color: '#1a1a1a', whiteSpace: 'nowrap' }}>Dynamic Overflow Handling</Typography>
                        <Select
                            size="small"
                            value={data.dynamicOverflow || '20%'}
                            onChange={(e) => updateData('dynamicOverflow', e.target.value)}
                            sx={{ width: 200, bgcolor: 'white', '& .MuiSelect-select': { fontSize: '0.85rem', py: 1 } }}
                        >
                            {/* Generate 0% to 100% in increments of 10 */}
                            {[...Array(11)].map((_, i) => {
                                const val = `${i * 10}%`;
                                return <MenuItem key={val} value={val}>{val}</MenuItem>;
                            })}
                        </Select>
                    </Box>

                    {/* Pre-departure cutoff constraints */}
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#1a1a1a', mb: 1.5 }}>Pre-departure cutoff constraints</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, pl: 2 }}>
                            {[
                                'Time-Based Cutoff',
                                'Status-Based Cutoff',
                                'Capacity-Based Cutoff',
                                'Regulatory / Compliance Cutoff',
                                'Network / Linehaul Cutoff'
                            ].map(option => (
                                <FormControlLabel
                                    key={option}
                                    control={
                                        <Checkbox
                                            checked={(Array.isArray(data.preDepartureCutoff) ? data.preDepartureCutoff : []).includes(option)}
                                            onChange={() => handlePreDepartureToggle(option)}
                                            size="small"
                                            sx={{ color: '#1B3E38', '&.Mui-checked': { color: '#1B3E38' }, p: 0.5 }}
                                        />
                                    }
                                    label={<Typography variant="body2">{option}</Typography>}
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* Operational Constraints */}
                    <Box sx={{ border: '1px solid #E0E0E0', borderRadius: 2, p: 2 }}>
                        <Typography variant="caption" fontWeight="600" mb={2} display="block">Operational Constraints</Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {/* Max dwell time */}
                            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #E0E0E0', borderRadius: 3, p: 1.5 }}>
                                <Typography variant="body2" sx={{ flex: 1, color: '#333', fontWeight: 500 }}>Max dwell time at stops</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #1B3E38', borderRadius: 1, px: 1, py: 0.5 }}>
                                    <TextField
                                        variant="standard"
                                        InputProps={{ disableUnderline: true }}
                                        value={data.operationalConstraints?.maxDwell ?? 5}
                                        onChange={(e) => handleConstraintChange('maxDwell', e.target.value)}
                                        sx={{ width: 30, '& input': { textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, p: 0, color: '#9E9E9E' } }}
                                    />
                                </Box>
                                <Typography variant="caption" color="text.secondary" ml={1}>Hours</Typography>
                            </Box>

                            {/* Max Stops */}
                            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #E0E0E0', borderRadius: 3, p: 1.5 }}>
                                <Typography variant="body2" sx={{ flex: 1, color: '#333', fontWeight: 500 }}>Max Stops</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #1B3E38', borderRadius: 1, px: 1, py: 0.5 }}>
                                    <TextField
                                        variant="standard"
                                        InputProps={{ disableUnderline: true }}
                                        value={data.operationalConstraints?.maxStops ?? 5}
                                        onChange={(e) => handleConstraintChange('maxStops', e.target.value)}
                                        sx={{ width: 30, '& input': { textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, p: 0, color: '#9E9E9E' } }}
                                    />
                                </Box>
                                <Typography variant="caption" color="text.secondary" ml={1} lineHeight={1.2}>Count <br /> / Per Day</Typography>
                            </Box>

                            {/* Max Distance */}
                            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #E0E0E0', borderRadius: 3, p: 1.5 }}>
                                <Typography variant="body2" sx={{ flex: 1, color: '#333', fontWeight: 500 }}>Max Distance</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #1B3E38', borderRadius: 1, px: 1, py: 0.5 }}>
                                    <TextField
                                        variant="standard"
                                        InputProps={{ disableUnderline: true }}
                                        value={data.operationalConstraints?.maxDistance ?? 5}
                                        onChange={(e) => handleConstraintChange('maxDistance', e.target.value)}
                                        sx={{ width: 30, '& input': { textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, p: 0, color: '#9E9E9E' } }}
                                    />
                                </Box>
                                <Typography variant="caption" color="text.secondary" ml={1} lineHeight={1.2}>KM <br /> / Per Day</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ borderColor: '#E0E0E0' }} />

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
                                            value={dayConfig.start}
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
                                            value={dayConfig.end}
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
