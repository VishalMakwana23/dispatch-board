import React, { useState } from 'react';
import { Box, Button, Typography, Paper, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
import { updateDraftData, setStep, generateResults } from '../../redux/slices/scenarioSlice';
import Step1NetworkContext from './Steps/Step1NetworkContext';
import Step2VehicleDriverContext from './Steps/Step2VehicleDriverContext';
import Step3ServiceLevelAgreements from './Steps/Step3ServiceLevelAgreements';
import Step4OptimizationObjectives from './Steps/Step4OptimizationObjectives';
import Step5UploadRouteData from './Steps/Step5UploadRouteData';

const STEPS = [
    { id: 1, title: 'Network & Market Context' },
    { id: 2, title: 'Vehicle & Driver Context' },
    { id: 3, title: 'Service Level Agreements' },
    { id: 4, title: 'Optimization Objectives' },
    { id: 5, title: 'Upload Route Data' },
];

const CreateOperatingWizard = ({ onBack }) => {
    const dispatch = useDispatch();
    const { currentStep, draft } = useSelector((state) => state.scenario);

    const updateFormData = (field, value) => {
        dispatch(updateDraftData({ field, value }));
    };

    const handleNext = () => {
        if (currentStep < STEPS.length) {
            dispatch(setStep(currentStep + 1));
        } else {
            console.log('Running Optimization with Data:', draft);
            dispatch(generateResults());
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <Step1NetworkContext data={draft} updateData={updateFormData} />;
            case 2:
                return <Step2VehicleDriverContext data={draft} updateData={updateFormData} />;
            case 3:
                return <Step3ServiceLevelAgreements data={draft} updateData={updateFormData} />;
            case 4:
                return <Step4OptimizationObjectives data={draft} updateData={updateFormData} />;
            case 5:
                return <Step5UploadRouteData data={draft} updateData={updateFormData} />;
            default:
                return null;
        }
    };

    // Validation logic (Basic)
    const isStepValid = () => {
        if (currentStep === 1) {
            // Ex: require at least one market
            return draft.markets.length > 0;
        }
        if (currentStep === 5) {
            return false;
        }
        return true;
    };

    return (
        <Box sx={{ display: 'flex', height: '100%', bgcolor: 'white', overflow: 'hidden' }}>
            {/* Steps Sidebar with Integrated Back Button */}
            <Paper
                elevation={0}
                sx={{
                    width: 320,
                    flexShrink: 0,
                    borderRight: '1px solid #e0e0e0',
                    height: '100%',
                    bgcolor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    pt: 3,
                    pb: 2,
                    zIndex: 2
                }}
            >
                {/* Back Link in Sidebar */}
                <Box sx={{ px: 3, mb: 4 }}>
                    <Button
                        startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
                        onClick={onBack}
                        sx={{
                            color: '#666',
                            textTransform: 'none',
                            fontWeight: 500,
                            fontSize: '0.85rem',
                            '&:hover': { bgcolor: 'transparent', color: '#1B3E38' },
                            p: 0,
                            minWidth: 0,
                            justifyContent: 'flex-start'
                        }}
                    >
                        Back to Operational Planning
                    </Button>
                </Box>

                <List sx={{ px: 2 }}>
                    {STEPS.map((step) => (
                        <ListItem key={step.id} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                selected={currentStep === step.id}
                                onClick={() => dispatch(setStep(step.id))}
                                sx={{
                                    borderRadius: 1,
                                    bgcolor: currentStep === step.id ? '#0B4E3E !important' : 'transparent',
                                    py: 1.5,
                                    px: 2,
                                    '&:hover': {
                                        bgcolor: currentStep === step.id ? '#0B4E3E' : 'rgba(0,0,0,0.04)'
                                    }
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    component="span"
                                    sx={{
                                        mr: 2,
                                        fontWeight: 400,
                                        color: currentStep === step.id ? 'white' : 'text.secondary',
                                        opacity: currentStep === step.id ? 1 : 0.7,
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    0{step.id}
                                </Typography>
                                <ListItemText
                                    primary={step.title}
                                    primaryTypographyProps={{
                                        fontWeight: currentStep === step.id ? 600 : 500,
                                        fontSize: '0.85rem',
                                        color: currentStep === step.id ? 'white' : 'text.primary'
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Content Area */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

                {/* Page Header */}
                <Box sx={{ px: 3, pt: 2, pb: 1 }}> {/* Reduced padding */}
                    <Typography variant="h6" fontWeight="700" color="#1B3E38">
                        {STEPS.find(s => s.id === currentStep)?.title}
                    </Typography>
                </Box>

                {/* Scrollable Form Content */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 3, pb: 2 }}> {/* Reduced padding */}
                    {renderStepContent()}
                </Box>

                {/* Fixed Footer Actions */}
                <Paper
                    elevation={0} // Remove elevation for cleaner look
                    sx={{
                        p: 2,
                        px: 3,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 2,
                        borderTop: '1px solid #f0f0f0', // Lighter border
                        zIndex: 10,
                        position: 'sticky',
                        bottom: 0,
                        mt: 'auto'
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={onBack}
                        sx={{
                            borderRadius: 30, // Pill shape
                            px: 4, py: 0.75,
                            borderColor: '#D0D0D0', // Lighter border like design
                            color: 'black',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { borderColor: 'black', bgcolor: 'transparent' }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        sx={{
                            borderRadius: 30, // Pill shape
                            px: 4, py: 0.75,
                            bgcolor: '#E0E0E0',
                            color: '#9E9E9E', // Disabled text color
                            textTransform: 'none',
                            fontWeight: 600,
                            boxShadow: 'none',
                            '&:hover': { bgcolor: '#d5d5d5' },
                            ...(isStepValid() && {
                                bgcolor: '#1B3E38',
                                color: 'white',
                                '&:hover': { bgcolor: '#142d2a' }
                            })
                        }}
                    >
                        {currentStep === 5 ? 'Run' : 'Next'}
                    </Button>
                </Paper>
            </Box>
        </Box>
    );
};

export default CreateOperatingWizard;
