import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import RoutePanel from '../RoutePanel';

const RightPanelContainer = ({ panels, onToggle, onClose, isCollapsed = true }) => {
  const containerRef = useRef(null);

  // Auto-scroll to the right when a new panel is added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [panels.length]);

  if (panels.length === 0) return null;

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'fixed',
        left: `${(isCollapsed ? 65 : 240) + 350}px`, // Dynamic left: Sidebar + RoutesPanel
        right: 0,      // Extend to the right edge
        top: 80, 
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start', 
        justifyContent: 'flex-start', // Stack from left
        gap: 2,
        padding: 2,
        zIndex: 1200,
        overflowX: 'auto', 
        pointerEvents: 'none', 
        transition: 'left 0.3s ease', // Smooth transition
        '& > *': {
          pointerEvents: 'auto', 
        },
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderRadius: '4px',
        },
      }}
    >
      {/* 
         We map panels directly. 
         They will stack from left to right.
      */}
      {panels.map((panel) => (
        <RoutePanel
          key={panel.routeId}
          route={panel.data}
          expanded={panel.expanded}
          onToggle={() => onToggle(panel.routeId)}
          onClose={() => onClose(panel.routeId)}
        />
      ))}
    </Box>
  );
};

export default RightPanelContainer;
