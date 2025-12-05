import React from 'react';
import useRoutePanels from '../../hooks/useRoutePanels';
import RoutesPanel from '../../components/RoutesPanel';
import RightPanelContainer from '../../components/RightPanelContainer';
import MapView from '../../components/MapView';
import StatsFooter from '../../components/StatsFooter';
import { routes } from '../../mock/routes';
import { Box } from '@mui/material';

const RoutesView = ({ activeView, setActiveView, isCollapsed }) => {
  const { panels, openPanel, closePanel, togglePanelExpand } = useRoutePanels();

  return (
    <>
      <RoutesPanel 
        onRouteSelect={openPanel} 
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
      />
      <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
        <MapView panels={panels} />
        <StatsFooter routes={routes} />
      </Box>
    </>
  );
};

export default RoutesView;
