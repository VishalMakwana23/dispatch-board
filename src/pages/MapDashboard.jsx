import React from 'react';
import useRoutePanels from '../hooks/useRoutePanels';
import DashboardLayout from '../layouts/DashboardLayout';
import MapView from '../components/MapView';

const Dashboard = () => {
  const { panels, openPanel, closePanel, togglePanelExpand } = useRoutePanels();

  return (
    <DashboardLayout 
      panels={panels} 
      onRouteSelect={openPanel}
      onTogglePanel={togglePanelExpand}
      onClosePanel={closePanel}
    >
      <MapView panels={panels} selectedRoutes={panels.map(p => p.data)} />
    </DashboardLayout>
  );
};

export default Dashboard;
