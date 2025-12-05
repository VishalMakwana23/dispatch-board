import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import RoutesPanel from '../components/RoutesPanel';
import Topbar from '../components/Topbar';
import LogoHeader from '../components/LogoHeader';
import StatsFooter from '../components/StatsFooter';
import { killeenData } from '../mock/killeenData';
import { useNavigate } from 'react-router-dom';
import AltRouteIcon from '@mui/icons-material/AltRoute';

import RightPanelContainer from '../components/RightPanelContainer';
import ChainOfDelayContainer from '../components/ChainOfDelay';

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

const DashboardLayout = ({ children, panels, onRouteSelect, onTogglePanel, onClosePanel }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();

  // Sidebar width: Collapsed = 65px, Expanded = 240px
  // LogoHeader width: 240px (Static)
  // Topbar left: 240px (Static)
  // RoutesPanel width: 350px (always present in DashboardLayout)
  
  const sidebarWidth = isCollapsed ? 65 : 240;
  
  // Margin includes Sidebar (dynamic?) + RoutesPanel (350)
  // But if Topbar is fixed at 240px, and Sidebar collapses...
  // The RoutesPanel is positioned based on sidebar state (65px or 240px).
  // So the content margin should be: RoutesPanel Left + RoutesPanel Width.
  // RoutesPanel Left = isCollapsed ? 65 : 240.
  // RoutesPanel Width = 350.
  // Margin = (isCollapsed ? 65 : 240) + 350.
  
  const marginLeft = `${(isCollapsed ? 65 : 240) + 350}px`;

  const clientMenuItems = [
    { icon: dashboardIcon, label: 'INSIGHT Engine', path: '/dashboard', action: () => navigate('/dashboard'), disabled: true }, 
    { icon: <AltRouteIcon />, label: 'APEX Dispatch', active: true, action: () => {} }, 
    { icon: assetTrackingIcon, label: 'CARE Intelligence', id: 'asset_tracking', disabled: true },
    { icon: upcomingRouteIcon, label: 'FIELD Command', id: 'upcoming_routes', disabled: true },
    { icon: currentRouteIcon, label: 'PAYFlow Engine', id: 'current_route', disabled: true },
    // { icon: pastRouteIcon, label: 'Past Route', id: 'past_route', disabled: true },
    // { icon: overagesIcon, label: 'Overages', id: 'overages', disabled: true },
    // { icon: orderLogIcon, label: 'Order Log', id: 'order_log', disabled: true },
    // { icon: archiveDataIcon, label: 'Archive Data', id: 'archive_data', disabled: true },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <LogoHeader />
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        menuItems={clientMenuItems}
      />
      
      {/* Topbar fixed at 240px left */}
      <Box sx={{ 
        position: 'fixed', 
        top: 0, 
        left: '240px', 
        right: 0, 
        zIndex: 1000 
      }}>
        <Topbar isCollapsed={false} />
      </Box>

      <RoutesPanel 
        onRouteSelect={onRouteSelect} 
        openRouteIds={panels?.map(p => p.routeId) || []} 
        isCollapsed={isCollapsed}
      />
      <RightPanelContainer 
        panels={panels} 
        onToggle={onTogglePanel} 
        onClose={onClosePanel} 
        isCollapsed={isCollapsed}
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'hidden',
          marginLeft: marginLeft,
          paddingTop: '64px', // Topbar height
          position: 'relative',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {children}
        <StatsFooter routes={killeenData.routes} />
      </Box>
      <ChainOfDelayContainer isCollapsed={isCollapsed} />
      <SettingsPanel />
      <ProfilePopup />
    </Box>
  );
};

export default DashboardLayout;
