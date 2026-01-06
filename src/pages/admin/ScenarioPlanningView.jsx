import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import useRoutePanels from '../../hooks/useRoutePanels';
import ScenarioPlanningPanel from '../../components/ScenarioPlanningPanel';
import RightPanelContainer from '../../components/RightPanelContainer';
import MapView from '../../components/MapView';
import CreateOperatingWizard from '../../components/CreateOperatingWizard';
import ScenarioStatsFooter from '../../components/ScenarioStatsFooter';
import { startScenarioCreation, cancelCreation } from '../../redux/slices/scenarioSlice';

const ScenarioPlanningView = ({ activeView, setActiveView, isCollapsed }) => {
    const [marketMode, setMarketMode] = useState(false);
    const [trafficMode, setTrafficMode] = useState(false);

    // Redux State
    const dispatch = useDispatch();
    const { viewMode, results } = useSelector((state) => state.scenario);

    // Panel Management
    const { panels, openPanel, closePanel, togglePanelExpand, closeAllPanels } = useRoutePanels();

    // If in wizard mode, show the wizard full screen (or as implemented previously)
    if (viewMode === 'wizard') {
        return <CreateOperatingWizard onBack={() => dispatch(cancelCreation())} />;
    }

    // Determine what to show in the sidebar and on the map

    // For map routes: if we have results, use them. Otherwise empty for now (or regular scenario routes if implemented)
    // PATCH: Assign colors dynamically if missing (for existing state)
    const PALETTE = ['#1976D2', '#2E7D32', '#ED6C02', '#9C27B0'];
    const enhancedResults = (viewMode === 'results' && results) ? results.map((r, i) => ({
        ...r,
        color: r.color || PALETTE[i % PALETTE.length]
    })) : [];

    const mapRoutes = enhancedResults;

    const handleRouteSelect = (route) => {
        setMarketMode(false);
        setTrafficMode(false);
        // Ensure we pass the enhanced route with color
        const enhancedRoute = enhancedResults.find(r => r.id === route.id) || route;
        openPanel(enhancedRoute);
    };

    return (
        <>
            {/* Sidebar */}
            <ScenarioPlanningPanel
                isCollapsed={isCollapsed}
                onAdd={() => dispatch(startScenarioCreation())}
                results={mapRoutes}
                onRouteSelect={handleRouteSelect}
                openRouteIds={panels?.map(p => p.routeId) || []}
            />

            <RightPanelContainer
                panels={panels}
                onToggle={togglePanelExpand}
                onClose={closePanel}
                isCollapsed={isCollapsed}
            />

            {/* Map Area */}
            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                <MapView
                    panels={panels}
                    selectedRoutes={mapRoutes}
                    marketMode={marketMode}
                    onMarketToggle={() => setMarketMode(!marketMode)}
                    trafficMode={trafficMode}
                    onTrafficToggle={() => setTrafficMode(!trafficMode)}
                />
            </Box>

            {/* Dashboard Footer */}
            <ScenarioStatsFooter results={enhancedResults} />
        </>
    );
};

export default ScenarioPlanningView;
