import React from 'react';
import { Box, Typography, TextField, MenuItem, FormControl, RadioGroup, FormControlLabel, Radio, Chip, IconButton, Select, InputLabel, InputAdornment, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, parseISO } from 'date-fns';

// Mock Data for Dropdowns
const MOCK_MARKETS = ['Calgary', 'Toronto', 'Vancouver', 'Montreal'];
const MOCK_CITIES = ['Calgary', 'GTA', 'Mississauga', 'Brampton'];
const MOCK_DEPOTS = ['Calgary HUB1', 'Toronto HUB2'];
const TIME_OPTIONS = [
    '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm',
    '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm'
];

const Step1NetworkContext = ({ data, updateData }) => {
    // Helpers
    const handleMarketAdd = (market) => {
        if (!data.markets.some(m => m.name === market)) {
            updateData('markets', [...data.markets, { name: market, open: '6:00am', close: '7:00pm' }]);
        }
    };

    const handleMarketRemove = (name) => {
        updateData('markets', data.markets.filter(m => m.name !== name));
    };

    const handleMarketTimeChange = (name, type, value) => {
        const updated = data.markets.map(m => m.name === name ? { ...m, [type]: value } : m);
        updateData('markets', updated);
    };

    const handleCityToggle = (city) => {
        if (data.cities.includes(city)) {
            updateData('cities', data.cities.filter(c => c !== city));
        } else {
            updateData('cities', [...data.cities, city]);
        }
    };

    const handleDepotAdd = (depot) => {
        if (!data.depots.some(d => d.name === depot)) {
            updateData('depots', [...data.depots, { name: depot, loading: '6:00am', unloading: '7:00am', dock: 6 }]);
        }
    };

    const handleDepotChange = (name, field, value) => {
        const updated = data.depots.map(d => d.name === name ? { ...d, [field]: value } : d);
        updateData('depots', updated);
    };
    const handleDepotRemove = (name) => {
        updateData('depots', data.depots.filter(d => d.name !== name));
    };

    const handleDateChange = (field, date) => {
        if (date) {
            updateData(field, format(date, 'yyyy-MM-dd'));
        } else {
            updateData(field, '');
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: 'flex', gap: 3, height: '100%', overflowY: 'auto', p: 1 }}>
                {/* Left Column */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>

                    {/* Markets */}
                    <Box>
                        <Typography variant="subtitle2" fontWeight="600" mb={0.5} sx={{ fontSize: '0.85rem' }}>Network&Market Context</Typography>
                        <Typography variant="caption" fontWeight="600" mb={0.5} display="block">Markets</Typography>
                        <Select
                            fullWidth
                            size="small"
                            displayEmpty
                            value=""
                            onChange={(e) => handleMarketAdd(e.target.value)}
                            sx={{ mb: 1, bgcolor: 'white', '& .MuiSelect-select': { py: 0.75, fontSize: '0.85rem' } }}
                            renderValue={() => <Typography variant="body2" color="text.secondary" fontSize="0.85rem">Type to select markets</Typography>}
                        >
                            {MOCK_MARKETS.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                        </Select>

                        {data.markets.map((market) => (
                            <Box key={market.name} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, bgcolor: '#F8F9FA', p: 0.5, borderRadius: 1 }}>
                                <Chip label={market.name} onDelete={() => handleMarketRemove(market.name)} size="small" sx={{ borderRadius: 1, bgcolor: '#E0E7E5', fontSize: '0.75rem', height: 24 }} />
                                <Select size="small" value={market.open} onChange={(e) => handleMarketTimeChange(market.name, 'open', e.target.value)} sx={{ minWidth: 90, bgcolor: 'white', '& .MuiSelect-select': { py: 0.5, fontSize: '0.8rem' } }}>
                                    {TIME_OPTIONS.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                                </Select>
                                <Typography variant="caption">-</Typography>
                                <Select size="small" value={market.close} onChange={(e) => handleMarketTimeChange(market.name, 'close', e.target.value)} sx={{ minWidth: 90, bgcolor: 'white', '& .MuiSelect-select': { py: 0.5, fontSize: '0.8rem' } }}>
                                    {TIME_OPTIONS.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                                </Select>
                            </Box>
                        ))}
                    </Box>

                    {/* Cities */}
                    <Box>
                        <Typography variant="caption" fontWeight="600" mb={0.5} display="block">Cities</Typography>
                        <Select
                            fullWidth
                            size="small"
                            displayEmpty
                            value=""
                            onChange={(e) => handleCityToggle(e.target.value)}
                            sx={{ mb: 1, bgcolor: 'white', '& .MuiSelect-select': { py: 0.75, fontSize: '0.85rem' } }}
                            renderValue={() => <Typography variant="body2" color="text.secondary" fontSize="0.85rem">Type to select cities</Typography>}
                        >
                            {MOCK_CITIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                        </Select>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {data.cities.map(city => (
                                <Chip key={city} label={city} onDelete={() => handleCityToggle(city)} size="small" sx={{ borderRadius: 1, bgcolor: '#E0E7E5', fontSize: '0.75rem', height: 24 }} />
                            ))}
                        </Box>
                    </Box>

                    {/* Depots/Hubs */}
                    <Box>
                        <Typography variant="caption" fontWeight="600" mb={0.5} display="block">Depots/Hubs</Typography>
                        <Select
                            fullWidth
                            size="small"
                            displayEmpty
                            value=""
                            onChange={(e) => handleDepotAdd(e.target.value)}
                            sx={{ mb: 1, bgcolor: 'white', '& .MuiSelect-select': { py: 0.75, fontSize: '0.85rem' } }}
                            renderValue={() => <Typography variant="body2" color="text.secondary" fontSize="0.85rem">Type to select depots/hubs</Typography>}
                        >
                            {MOCK_DEPOTS.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                        </Select>

                        {data.depots.length > 0 && (
                            <Box sx={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 0.8fr', gap: 1, mb: 0.5 }}>
                                <Typography variant="caption" color="text.secondary" fontSize="0.7rem">Selected depots/hubs</Typography>
                                <Typography variant="caption" color="text.secondary" fontSize="0.7rem">Loading Time</Typography>
                                <Typography variant="caption" color="text.secondary" fontSize="0.7rem">Unloading Time</Typography>
                                <Typography variant="caption" color="text.secondary" fontSize="0.7rem">Dock Capacity</Typography>
                            </Box>
                        )}

                        {data.depots.map((depot) => (
                            <Box key={depot.name} sx={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 0.8fr', gap: 1, mb: 0.5, alignItems: 'center' }}>
                                <Chip label={depot.name} onDelete={() => handleDepotRemove(depot.name)} size="small" sx={{ borderRadius: 1, bgcolor: '#E0E7E5', width: 'fit-content', fontSize: '0.75rem', height: 24 }} />
                                <Select size="small" value={depot.loading} onChange={(e) => handleDepotChange(depot.name, 'loading', e.target.value)} sx={{ bgcolor: 'white', '& .MuiSelect-select': { py: 0.5, fontSize: '0.8rem' } }}>
                                    {TIME_OPTIONS.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                                </Select>
                                <Select size="small" value={depot.unloading} onChange={(e) => handleDepotChange(depot.name, 'unloading', e.target.value)} sx={{ bgcolor: 'white', '& .MuiSelect-select': { py: 0.5, fontSize: '0.8rem' } }}>
                                    {TIME_OPTIONS.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                                </Select>
                                <TextField
                                    type="number"
                                    size="small"
                                    value={depot.dock}
                                    onChange={(e) => handleDepotChange(depot.name, 'dock', e.target.value)}
                                    sx={{ bgcolor: 'white', '& .MuiInputBase-input': { py: 0.5, fontSize: '0.8rem' } }}
                                    InputProps={{ inputProps: { min: 0 } }}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ borderColor: '#E0E0E0' }} />

                {/* Right Column */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="subtitle2" fontWeight="600" sx={{ fontSize: '0.85rem' }}>Linhaul Route Context</Typography>

                    {/* Linhaul Model */}
                    <Box sx={{ border: '1px solid #E0E0E0', borderRadius: 2, p: 1.5 }}>
                        <Typography variant="caption" fontWeight="600" mb={1} display="block">Linhaul Route Model</Typography>
                        <RadioGroup
                            value={data.linhaulModel}
                            onChange={(e) => updateData('linhaulModel', e.target.value)}
                            sx={{ gap: 0.5 }}
                        >
                            {['Exclusive', 'Co-load', 'Fraction'].map((option) => (
                                <Box
                                    key={option}
                                    sx={{
                                        border: '1px solid #E0E0E0',
                                        borderRadius: 1,
                                        p: 0.5, pl: 1.5,
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

                    {/* Route-level completion windows */}
                    <Box sx={{ border: '1px solid #E0E0E0', borderRadius: 2, p: 2 }}>
                        <Typography variant="subtitle2" fontWeight="600" mb={2}>Route-level completion windows</Typography>
                        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>Start Date</Typography>
                                <DatePicker
                                    value={data.startDate ? parseISO(data.startDate) : null}
                                    onChange={(newValue) => handleDateChange('startDate', newValue)}
                                    format="MM-dd-yyyy"
                                    slots={{
                                        openPickerIcon: CalendarTodayIcon
                                    }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            fullWidth: true,
                                            sx: {
                                                bgcolor: 'white',
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 1,
                                                    '&.Mui-focused fieldset': { borderColor: '#1B3E38' }
                                                },
                                                '& .MuiInputBase-input': { fontSize: '0.85rem' }
                                            }
                                        },
                                        openPickerButton: {
                                            sx: { color: '#1B3E38' }
                                        },
                                        layout: {
                                            sx: {
                                                '& .MuiPercent-root': { color: '#1B3E38' },
                                                '& .MuiPickersDay-root.Mui-selected': { bgcolor: '#1B3E38', '&:hover': { bgcolor: '#142E29' } },
                                                '& .MuiPickersDay-root.Mui-selected:focus': { bgcolor: '#1B3E38' },
                                            }
                                        }
                                    }}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>End Date</Typography>
                                <DatePicker
                                    value={data.endDate ? parseISO(data.endDate) : null}
                                    onChange={(newValue) => handleDateChange('endDate', newValue)}
                                    format="MM-dd-yyyy"
                                    slots={{
                                        openPickerIcon: CalendarTodayIcon
                                    }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            fullWidth: true,
                                            sx: {
                                                bgcolor: 'white',
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 1,
                                                    '&.Mui-focused fieldset': { borderColor: '#1B3E38' }
                                                },
                                                '& .MuiInputBase-input': { fontSize: '0.85rem' }
                                            }
                                        },
                                        openPickerButton: {
                                            sx: { color: '#1B3E38' }
                                        },
                                        layout: {
                                            sx: {
                                                '& .MuiPercent-root': { color: '#1B3E38' },
                                                '& .MuiPickersDay-root.Mui-selected': { bgcolor: '#1B3E38', '&:hover': { bgcolor: '#142E29' } },
                                                '& .MuiPickersDay-root.Mui-selected:focus': { bgcolor: '#1B3E38' },
                                            }
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        <Typography variant="caption" color="text.secondary" mb={1.5} display="block">Weekly Hours</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => {
                                const dayKey = `day_${index}`;
                                const dayConfig = data.weeklyHours[dayKey] || { start: '', end: '' };
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
                                            onChange={(e) => {
                                                const newWeekly = { ...data.weeklyHours, [dayKey]: { ...dayConfig, start: e.target.value } };
                                                updateData('weeklyHours', newWeekly);
                                            }}
                                            sx={{
                                                flex: 1, bgcolor: 'white',
                                                borderRadius: 1,
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: isActive ? '#1B3E38' : '#E0E0E0' },
                                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: isActive ? '#1B3E38' : '#E0E0E0' },
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
                                            onChange={(e) => {
                                                const newWeekly = { ...data.weeklyHours, [dayKey]: { ...dayConfig, end: e.target.value } };
                                                updateData('weeklyHours', newWeekly);
                                            }}
                                            sx={{
                                                flex: 1, bgcolor: 'white',
                                                borderRadius: 1,
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: isActive ? '#1B3E38' : '#E0E0E0' },
                                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: isActive ? '#1B3E38' : '#E0E0E0' },
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
                    </Box>
                </Box>
            </Box>
        </LocalizationProvider>
    );
};


export default Step1NetworkContext;
