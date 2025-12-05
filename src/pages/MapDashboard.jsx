import React, { useState } from 'react';
import useRoutePanels from '../hooks/useRoutePanels';
import DashboardLayout from '../layouts/DashboardLayout';
import MapView from '../components/MapView';

const Dashboard = () => {
  const { panels, openPanel, closePanel, togglePanelExpand, closeAllPanels } = useRoutePanels();
  const [marketMode, setMarketMode] = useState(false);

  const handleRouteSelect = (route) => {
    setMarketMode(false); // Turn off market mode when selecting a route
    openPanel(route);
  };

  const handleMarketToggle = () => {
    const newMarketMode = !marketMode;
    setMarketMode(newMarketMode);
    
    if (newMarketMode) {
      closeAllPanels(); // Close all active route panels when enabling market mode
    }
  };

  return (
    <DashboardLayout 
      panels={panels} 
      onRouteSelect={handleRouteSelect}
      onTogglePanel={togglePanelExpand}
      onClosePanel={closePanel}
    >
      <MapView 
        panels={panels} 
        selectedRoutes={panels.map(p => p.data)} 
        marketMode={marketMode}
        onMarketToggle={handleMarketToggle}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
