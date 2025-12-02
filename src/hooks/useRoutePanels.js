import { useState, useCallback } from 'react';

const useRoutePanels = () => {
  const [panels, setPanels] = useState([]);

  const openPanel = useCallback((route) => {
    setPanels((prevPanels) => {
      // Check if panel already exists
      const existingPanelIndex = prevPanels.findIndex((p) => p.routeId === route.id);
      
      if (existingPanelIndex !== -1) {
        // If exists, bring to front (optional) or just ensure it's there.
        // Requirement says: "If routeId already open → bring panel to front (optional)."
        // Let's just keep it as is but maybe highlight it? 
        // For now, we won't reorder to avoid confusion, just ensure it's open.
        return prevPanels;
      }

      // Add new panel
      return [
        ...prevPanels,
        {
          routeId: route.id,
          expanded: true, // Default expanded
          data: route,
        },
      ];
    });
  }, []);

  const closePanel = useCallback((routeId) => {
    setPanels((prevPanels) => prevPanels.filter((p) => p.routeId !== routeId));
  }, []);

  const togglePanelExpand = useCallback((routeId) => {
    setPanels((prevPanels) =>
      prevPanels.map((p) =>
        p.routeId === routeId ? { ...p, expanded: !p.expanded } : p
      )
    );
  }, []);

  return {
    panels,
    openPanel,
    closePanel,
    togglePanelExpand,
  };
};

export default useRoutePanels;
