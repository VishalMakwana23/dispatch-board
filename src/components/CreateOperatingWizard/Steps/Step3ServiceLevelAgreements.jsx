import React from 'react';
import { Box, Typography, TextField, MenuItem, Select, RadioGroup, FormControlLabel, Radio, InputAdornment, Divider, Checkbox, Grid } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, parseISO } from 'date-fns';

const TIME_OPTIONS = [
    '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm',
    '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm'
];

const CUTOFF_CONFIG = [
    {
        id: 'Time-Based Cutoff',
        options: ['0 min', '15 min', '30 min', '45 min', '60 min']
    },
    {
        id: 'Status-Based Cutoff',
        options: [
            'Order must be in “Picked” or “Ready to Load” status',
            'If still “Allocated”, it is excluded'
        ]
    },
    {
        id: 'Capacity-Based Cutoff',
        options: [
            'Weight, cube, or stop count reached',
            'No additional stops can be added even if time remains'
        ]
    },
    {
        id: 'Regulatory / Compliance Cutoff',
        options: [
            'Controlled substances require sealing or documentation prior to departure',
            'Missing documentation = cannot load'
        ]
    },
    {
        id: 'Network / Linehaul Cutoff',
        options: [
            'Linehaul arrival at DC cutoff 7:00 AM to meet cross-dock arrival windows',
            'Missed cutoff cascades into downstream SLA breaches'
        ]
    }
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
            // Optional: Clean up details when unchecked
            const currentDetails = { ...data.cutoffDetails };
            delete currentDetails[value];
            updateData('cutoffDetails', currentDetails);
        } else {
            updateData('preDepartureCutoff', [...currentList, value]);
        }
    };

    const handleCutoffDetailChange = (id, value) => {
        updateData('cutoffDetails', {
            ...(data.cutoffDetails || {}),
            [id]: value
        });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: 'flex', gap: 3, height: '100%', overflowY: 'auto', p: 1 }}>

                {/* Left Column */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>



                    {/* Stop-time profiles by stop category */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ minWidth: 240, fontWeight: 700, fontSize: '0.9rem', color: '#1a1a1a' }}>Stop-time profiles by stop category</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                            {['Pharmacy', 'Walmart', 'Residential', 'Business', 'Apartment'].map((category) => {
                                const isChecked = (Array.isArray(data.stopTimeProfiles) ? data.stopTimeProfiles : []).includes(category);
                                return (
                                    <FormControlLabel
                                        key={category}
                                        control={
                                            <Checkbox
                                                checked={isChecked}
                                                onChange={() => {
                                                    const current = Array.isArray(data.stopTimeProfiles) ? data.stopTimeProfiles : [];
                                                    if (isChecked) {
                                                        updateData('stopTimeProfiles', current.filter(c => c !== category));
                                                    } else {
                                                        updateData('stopTimeProfiles', [...current, category]);
                                                    }
                                                }}
                                                size="small"
                                                sx={{ color: '#1B3E38', '&.Mui-checked': { color: '#1B3E38' }, p: 0.5 }}
                                            />
                                        }
                                        label={<Typography variant="body2">{category}</Typography>}
                                    />
                                );
                            })}
                        </Box>
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
                            value={data.dynamicOverflow || '1 min'}
                            onChange={(e) => updateData('dynamicOverflow', e.target.value)}
                            sx={{ width: 200, bgcolor: 'white', '& .MuiSelect-select': { fontSize: '0.85rem', py: 1 } }}
                            MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                        >
                            {/* Generate 1 min to 15 min */}
                            {[...Array(15)].map((_, i) => {
                                const val = `${i + 1} min`;
                                return <MenuItem key={val} value={val}>{val}</MenuItem>;
                            })}
                        </Select>
                    </Box>

                    {/* Pre-departure cutoff constraints */}
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#1a1a1a', mb: 1.5 }}>Pre-departure cutoff constraints</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, pl: 2 }}>
                            {CUTOFF_CONFIG.map((config) => {
                                const isChecked = (Array.isArray(data.preDepartureCutoff) ? data.preDepartureCutoff : []).includes(config.id);
                                return (
                                    <Box key={config.id} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 0.5 }}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={isChecked}
                                                    onChange={() => handlePreDepartureToggle(config.id)}
                                                    size="small"
                                                    sx={{ color: '#1B3E38', '&.Mui-checked': { color: '#1B3E38' }, p: 0.5 }}
                                                />
                                            }
                                            label={<Typography variant="body2">{config.id}</Typography>}
                                        />
                                        {isChecked && (
                                            <Select
                                                size="small"
                                                value={data.cutoffDetails?.[config.id] || ''}
                                                onChange={(e) => handleCutoffDetailChange(config.id, e.target.value)}
                                                displayEmpty
                                                sx={{
                                                    ml: 3.5,
                                                    width: '90%',
                                                    maxWidth: 400,
                                                    bgcolor: 'white',
                                                    '& .MuiSelect-select': { fontSize: '0.85rem', py: 1 }
                                                }}
                                            >
                                                <MenuItem value="" disabled><Typography variant="caption" color="text.secondary">Select Option</Typography></MenuItem>
                                                {config.options.map(opt => (
                                                    <MenuItem key={opt} value={opt} sx={{ fontSize: '0.85rem' }}>{opt}</MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>


                </Box>


            </Box >
        </LocalizationProvider >
    );
};

export default Step3ServiceLevelAgreements;
