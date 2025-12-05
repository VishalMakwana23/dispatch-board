import React, { useState } from 'react';
import useRoutePanels from '../hooks/useRoutePanels';
import DashboardLayout from '../layouts/DashboardLayout';
import MapView from '../components/MapView';

const Dashboard = () => {
  const { panels, openPanel, closePanel, togglePanelExpand, closeAllPanels } = useRoutePanels();
  const [marketMode, setMarketMode] = useState(false);
  const [trafficMode, setTrafficMode] = useState(false);

  const handleRouteSelect = (route) => {
    setMarketMode(false); // Turn off market mode
    setTrafficMode(false); // Turn off traffic mode
    openPanel(route);
  };

  const handleMarketToggle = () => {
    const newMarketMode = !marketMode;
    setMarketMode(newMarketMode);
    
    if (newMarketMode) {
      setTrafficMode(false); // Turn off traffic
      closeAllPanels(); // Deselect routes
    }
  };

  const handleTrafficToggle = () => {
    const newTrafficMode = !trafficMode;
    setTrafficMode(newTrafficMode);

    if (newTrafficMode) {
      setMarketMode(false); // Turn off market
      closeAllPanels(); // Deselect routes
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
        trafficMode={trafficMode}
        onTrafficToggle={handleTrafficToggle}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
