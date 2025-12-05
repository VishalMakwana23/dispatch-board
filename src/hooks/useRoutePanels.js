import { useState, useCallback } from 'react';

const useRoutePanels = () => {
  const [panels, setPanels] = useState([]);

  const openPanel = useCallback((route) => {
    setPanels((prevPanels) => {
      // Check if panel already exists
      const existingPanelIndex = prevPanels.findIndex((p) => p.routeId === route.id);
      
      if (existingPanelIndex !== -1) {
        // Toggle behavior: Closing the panel if already open (Deselect)
        return prevPanels.filter((p) => p.routeId !== route.id);
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

  const closeAllPanels = useCallback(() => {
    setPanels([]);
  }, []);

  return {
    panels,
    openPanel,
    closePanel,
    togglePanelExpand,
    closeAllPanels,
  };
};

export default useRoutePanels;
