import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import MapView from '../components/MapView';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <MapView />
    </DashboardLayout>
  );
};

export default Dashboard;
