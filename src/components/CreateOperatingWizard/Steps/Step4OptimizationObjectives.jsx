import React from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';

const OBJECTIVES = [
    { value: 'reduce_distance', label: 'Reduce Total Distance or Drive Time' },
    { value: 'improve_sequencing', label: 'Improve Stop Sequencing Efficiency' },
    { value: 'balance_load', label: 'Balance Load Across Routes' },
    { value: 'reduce_routes', label: 'Reduce the Total Number of Routes Required' },
    { value: 'improve_utilization', label: 'Improve Vehicle Utilization' },
    { value: 'improve_ontime', label: 'Improve On-time Performance' },
    { value: 'reduce_excess', label: 'Reduce Excess Capacity' },
    { value: 'improve_productivity', label: 'Improve Driver Productivity' },
    { value: 'minimize_ghg', label: 'Minimize GHG Emissions' },
];

const SCENARIOS = [
    { key: 'traffic', label: 'Traffic' },
    { key: 'weather', label: 'Weather Impact' },
    { key: 'roadRestrictions', label: 'Road Restrictions/Access' },
    { key: 'construction', label: 'Construction or Known Bottlenecks' },
];

const ModernSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#1B3E38',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));


const Step4OptimizationObjectives = ({ data, updateData }) => {

    const handleScenarioChange = (key, checked) => {
        const currentScenarios = { ...data.scenarioVariables };
        currentScenarios[key] = checked;
        updateData('scenarioVariables', currentScenarios);
    };

    return (
        <Box sx={{ display: 'flex', gap: 4, height: '100%', overflowY: 'auto', p: 1 }}>

            {/* Left Column: Optimization Objectives */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="subtitle2" fontWeight="600" color="#1B3E38">Optimization Objectives</Typography>

                <RadioGroup
                    value={data.optimizationObjective || 'reduce_distance'}
                    onChange={(e) => updateData('optimizationObjective', e.target.value)}
                    sx={{ gap: 1.5 }}
                >
                    {OBJECTIVES.map((obj) => (
                        <Box
                            key={obj.value}
                            sx={{
                                border: 'none',
                                bgcolor: '#F9F9F9',
                                borderRadius: 1,
                                p: 1.5, pl: 2,
                                display: 'flex', alignItems: 'center'
                            }}
                        >
                            <FormControlLabel
                                value={obj.value}
                                control={<Radio sx={{ color: '#1B3E38', '&.Mui-checked': { color: '#1B3E38' }, p: 0.5, mr: 1 }} size="small" />}
                                label={<Typography variant="body2" fontWeight="500" fontSize="0.85rem">{obj.label}</Typography>}
                                sx={{ width: '100%', m: 0 }}
                            />
                        </Box>
                    ))}
                </RadioGroup>
            </Box>

            {/* Right Column: Real-World Conditions */}
            <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" fontWeight="600" color="#1B3E38" mb={2}>Real-World Conditions (Scenario Variables)</Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {SCENARIOS.map((scenario) => (
                        <Box
                            key={scenario.key}
                            sx={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                bgcolor: '#F9F9F9',
                                borderRadius: 1,
                                p: 1.5, px: 2
                            }}
                        >
                            <Typography variant="body2" fontWeight="500" fontSize="0.85rem">{scenario.label}</Typography>
                            <ModernSwitch
                                checked={!!data.scenarioVariables?.[scenario.key]}
                                onChange={(e) => handleScenarioChange(scenario.key, e.target.checked)}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>

        </Box>
    );
};

export default Step4OptimizationObjectives;
