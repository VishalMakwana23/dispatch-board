import React, { useState } from 'react';
import { Box } from '@mui/material';
import ScenarioPlanningPanel from '../../components/ScenarioPlanningPanel';
import MapView from '../../components/MapView';

const ScenarioPlanningView = ({ activeView, setActiveView, isCollapsed }) => {
    const [marketMode, setMarketMode] = useState(false);
    const [trafficMode, setTrafficMode] = useState(false);

    // No mock data routes for the empty scenario
    const selectedRoutes = [];

    return (
        <>
            <ScenarioPlanningPanel isCollapsed={isCollapsed} />

            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                <MapView
                    panels={[]}
                    selectedRoutes={selectedRoutes}
                    marketMode={marketMode}
                    onMarketToggle={() => setMarketMode(!marketMode)}
                    trafficMode={trafficMode}
                    onTrafficToggle={() => setTrafficMode(!trafficMode)}
                />
                {/* No StatsFooter requested for this empty view yet, or maybe it should be empty? 
            The image shows the map covering the bottom right, no footer visible in the snippet provided in request, 
            although the full design might have it. I'll omit it for now to match "Empty" vibe or just let MapView take full height.
        */}
            </Box>
        </>
    );
};

export default ScenarioPlanningView;
