import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import LogoHeader from '../components/LogoHeader';
import { useNavigate } from 'react-router-dom';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

// Import SVG Assets
import dashboardIcon from '../assets/space_dashboard.svg';
import assetTrackingIcon from '../assets/person_pin_circle.svg';
import upcomingRouteIcon from '../assets/route.svg';
import currentRouteIcon from '../assets/update.svg';
import pastRouteIcon from '../assets/done_all.svg';
import overagesIcon from '../assets/overage.svg';
import orderLogIcon from '../assets/dns.svg';
import archiveDataIcon from '../assets/archive.svg';

import SettingsPanel from '../components/SettingsPanel';
import ProfilePopup from '../components/ProfilePopup';

const AdminLayout = ({ children, activeView, setActiveView, isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();

  // Sidebar width: Collapsed = 65px, Expanded = 240px
  // LogoHeader width: 240px (Static)
  // Topbar left: 240px (Static)
  // RoutesPanel width: 350px

  // Main Content Margin:
  // If Sidebar is collapsed (65px), we still have LogoHeader at 240px?
  // User said "logo... static". 
  // If we want the content to expand when sidebar collapses, the Topbar and LogoHeader relationship is tricky.
  // But typically "Static Logo Header" means the top-left corner is fixed.
  // Let's keep Topbar fixed at 240px left for now as per "static" request implies stability.
  // But the Sidebar below it collapses.

  const sidebarWidth = isCollapsed ? 65 : 240;
  const routesPanelWidth = activeView === 'routes' ? 350 : 0;

  // Adjust margin to align with the visual sidebar/panel edge, 
  // BUT if Topbar is fixed at 240px, maybe content should also start at 240px?
  // Or does the content slide under the "empty" logo area?
  // Let's make content responsive to sidebar.
  const marginLeft = `${sidebarWidth + routesPanelWidth}px`;

  const adminMenuItems = [
    { icon: dashboardIcon, label: 'INSIGHT Engine', path: '/dashboard', action: () => navigate('/dashboard'), disabled: true },
    { icon: <AltRouteIcon />, label: 'APEX Dispatch', id: 'routes', action: () => setActiveView('routes'), active: ['routes', 'drivers', 'orders'].includes(activeView) },
    { icon: <AccountTreeIcon />, label: 'Scenario Planning', id: 'scenario_planning', action: () => setActiveView('scenario_planning'), active: activeView === 'scenario_planning' },
    { icon: assetTrackingIcon, label: 'CARE Intelligence', id: 'asset_tracking', disabled: true },
    { icon: upcomingRouteIcon, label: 'FIELD Command', id: 'upcoming_routes', disabled: true },
    { icon: currentRouteIcon, label: 'PAYFlow Engine', id: 'current_route', disabled: true },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <LogoHeader />
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        menuItems={adminMenuItems}
      />

      {/* Topbar needs to be adjusted. It was accepting isCollapsed to move. 
          If LogoHeader is static 240px, Topbar should probably start at 240px always?
          Or should it move? "give collapse and un collapse at the top menu"
          If I collapse sidebar, does logo header collapse? User said "logo... static".
          I will force Topbar to be static left 240px for now to match "static logo".
      */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: '240px',
        right: 0,
        zIndex: 1000
      }}>
        <Topbar isCollapsed={false} /> {/* Pass false to keep it expanded/fixed position if Topbar logic relies on it, or update Topbar CSS override */}
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'hidden',
          marginLeft: marginLeft, // Content still moves with sidebar
          paddingTop: '64px',
          position: 'relative',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {children}
      </Box>
      <SettingsPanel />
      <ProfilePopup />
    </Box>
  );
};

export default AdminLayout;
