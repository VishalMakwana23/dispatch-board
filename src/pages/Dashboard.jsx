import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import MapView from '../components/MapView';

const Dashboard = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);

  return (
    <DashboardLayout selectedRoute={selectedRoute} onRouteSelect={setSelectedRoute}>
      <MapView selectedRoute={selectedRoute} />
    </DashboardLayout>
  );
};

export default Dashboard;
