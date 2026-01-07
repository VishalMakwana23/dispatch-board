import React, { useState } from 'react';
import useRoutePanels from '../../hooks/useRoutePanels';
import RoutesPanel from '../../components/RoutesPanel';
import RightPanelContainer from '../../components/RightPanelContainer';
import MapView from '../../components/MapView';
import StatsFooter from '../../components/StatsFooter';
import { routes } from '../../mock/routes';
import { Box } from '@mui/material';

const RoutesView = ({ activeView, setActiveView, isCollapsed }) => {
  const { panels, openPanel, closePanel, togglePanelExpand, closeAllPanels } = useRoutePanels();
  const [marketMode, setMarketMode] = useState(false);
  const [trafficMode, setTrafficMode] = useState(false);

  const handleRouteSelect = (route) => {
    setMarketMode(false);
    setTrafficMode(false);
    openPanel(route);
  };

  const handleMarketToggle = () => {
    const newMarketMode = !marketMode;
    setMarketMode(newMarketMode);

    if (newMarketMode) {
      setTrafficMode(false);
      closeAllPanels();
    }
  };

  const handleTrafficToggle = () => {
    const newTrafficMode = !trafficMode;
    setTrafficMode(newTrafficMode);

    if (newTrafficMode) {
      setMarketMode(false);
      closeAllPanels();
    }
  };

  return (
    <>
      <RoutesPanel
        onRouteSelect={handleRouteSelect}
        openRouteIds={panels?.map(p => p.routeId) || []}
        isAdmin={true}
        activeView={activeView}
        setActiveView={setActiveView}
        isCollapsed={isCollapsed}
      />
      <RightPanelContainer
        panels={panels}
        onToggle={togglePanelExpand}
        onClose={closePanel}
        isCollapsed={isCollapsed}
        isAdmin={true}
      />
      <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
        <MapView
          panels={panels}
          selectedRoutes={panels.map(p => p.data)}
          marketMode={marketMode}
          onMarketToggle={handleMarketToggle}
          trafficMode={trafficMode}
          onTrafficToggle={handleTrafficToggle}
          isAdmin={true}
        />
        <StatsFooter routes={routes} />
      </Box>
    </>
  );
};

export default RoutesView;
