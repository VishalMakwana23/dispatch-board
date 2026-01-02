import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import ScenarioPlanningPanel from '../../components/ScenarioPlanningPanel';
import MapView from '../../components/MapView';
import CreateOperatingWizard from '../../components/CreateOperatingWizard';
import { startScenarioCreation, cancelCreation } from '../../redux/slices/scenarioSlice';

const ScenarioPlanningView = ({ activeView, setActiveView, isCollapsed }) => {
    const [marketMode, setMarketMode] = useState(false);
    const [trafficMode, setTrafficMode] = useState(false);

    // Redux State
    const dispatch = useDispatch();
    const { viewMode, results } = useSelector((state) => state.scenario);

    // If in wizard mode, show the wizard full screen (or as implemented previously)
    if (viewMode === 'wizard') {
        return <CreateOperatingWizard onBack={() => dispatch(cancelCreation())} />;
    }

    // Determine what to show in the sidebar and on the map

    // For map routes: if we have results, use them. Otherwise empty for now (or regular scenario routes if implemented)
    const mapRoutes = viewMode === 'results' && results ? results : [];

    return (
        <>
            {/* Sidebar */}
            <ScenarioPlanningPanel
                isCollapsed={isCollapsed}
                onAdd={() => dispatch(startScenarioCreation())}
                results={viewMode === 'results' ? results : null}
            />

            {/* Map Area */}
            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                <MapView
                    panels={[]}
                    selectedRoutes={mapRoutes}
                    marketMode={marketMode}
                    onMarketToggle={() => setMarketMode(!marketMode)}
                    trafficMode={trafficMode}
                    onTrafficToggle={() => setTrafficMode(!trafficMode)}
                />
            </Box>
        </>
    );
};

export default ScenarioPlanningView;
