import React, { useState } from 'react';
import { Box } from '@mui/material';
import ScenarioPlanningPanel from '../../components/ScenarioPlanningPanel';
import MapView from '../../components/MapView';
import CreateOperatingWizard from '../../components/CreateOperatingWizard';

const ScenarioPlanningView = ({ activeView, setActiveView, isCollapsed }) => {
    const [marketMode, setMarketMode] = useState(false);
    const [trafficMode, setTrafficMode] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    // No mock data routes for the empty scenario
    const selectedRoutes = [];

    if (isCreating) {
        return <CreateOperatingWizard onBack={() => setIsCreating(false)} />;
    }

    return (
        <>
            <ScenarioPlanningPanel isCollapsed={isCollapsed} onAdd={() => setIsCreating(true)} />

            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                <MapView
                    panels={[]}
                    selectedRoutes={selectedRoutes}
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
