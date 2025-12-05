import React, { useEffect } from 'react';
import { Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import warehouseIcon from '../../assets/werehouse.svg';
import destinationIcon from '../../assets/Subtract.svg';
import truckIcon from '../../assets/truck.svg';
import nameIcon from '../../assets/name.svg';

const STATUS_COLORS = {
  completed: '#107C41', // Green
  ongoing: '#E8A72B',   // Orange/Yellow
  pending: '#AAAAAA',   // Grey
  issue: '#D24238',     // Red
  risk: '#D24238',      // Red
  warning: '#E8A72B',   // Map 'warning' to Orange
  failed: '#D24238',    // Map 'failed' to Red
  unattempted: '#AAAAAA' // Map 'unattempted' to Grey
};

// Helper to get color from status
const getStopColor = (status) => {
  const normalizedStatus = status?.toLowerCase();
  if (STATUS_COLORS[normalizedStatus]) return STATUS_COLORS[normalizedStatus];
  if (normalizedStatus?.includes('risk') || normalizedStatus?.includes('issue') || normalizedStatus?.includes('missing')) return STATUS_COLORS.issue;
  return STATUS_COLORS.pending; // Default
};

const DriverMapLayer = ({ driver, allDrivers, onDriverSelect }) => {
  const map = useMap();

  useEffect(() => {
    if (driver && driver.routePolyline && driver.routePolyline.length > 0) {
      // Single Driver View: Zoom to route
      // map.invalidateSize(); // Removed to prevent potential conflicts or unnecessary calls handling elsewhere
      // Actually invalidating size is good if container resizes, but strictly for data change:
      
        // Helper to extract points
        let points = [];
        if (driver.stops && driver.stops.length > 0) {
           points = driver.stops.map(s => [s.lat, s.lng]);
        }
        
        if (points.length > 0) {
           const bounds = L.latLngBounds(points);
           map.flyToBounds(bounds, { 
             padding: [50, 50],
             duration: 1.5
           });
        }
    } else if (!driver && allDrivers && allDrivers.length > 0) {
        // All Drivers View: Zoom to encompass all current driver locations
        const driverLocations = allDrivers.map(d => {
             const currentStop = d.stops.find(s => s.isDriverHere || s.status === 'ongoing') || d.stops[0];
             return currentStop ? [currentStop.lat, currentStop.lng] : null;
        }).filter(Boolean);

        if (driverLocations.length > 0) {
            const bounds = L.latLngBounds(driverLocations);
            map.flyToBounds(bounds, {
                padding: [50, 50],
                duration: 1.5
            });
        }
    }
  }, [driver, allDrivers, map]);

  const createDetailedStopIcon = (stop, isLastStop, isDriverHere) => {
    const color = getStopColor(stop.status);
    
    let iconHtml = '';
    let iconSize = [16, 16]; 
    let iconAnchor = [8, 8];

     if (isDriverHere) {
        // Driver Icon (Yellow/Orange Truck) for Single Driver View
        // Larger and pulsing
        iconSize = [40, 40];
        iconAnchor = [20, 20];
         iconHtml = `<div class="pulse-ring" style="width: 100%; height: 100%;">
                        <div style="background-color: #E8A72B; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.4);">
                           <img src="${truckIcon}" alt="Truck" style="width: 24px; height: 24px; filter: brightness(0) invert(1);" />
                        </div>
                    </div>`;
    } else if (stop.type === 'warehouse') {
       iconSize = [40, 40];
       iconAnchor = [20, 20];
       iconHtml = `<div style="background-color: #1A3C34; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                    <img src="${warehouseIcon}" alt="Warehouse" style="width: 20px; height: 20px; filter: brightness(0) invert(1);" />
                  </div>`;
    } else if (stop.status === 'completed') {
        // Use nameIcon (Checkmark) for completed stops
        // Using Green #107C41
        iconHtml = `<div style="background-color: #107C41; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);">
                      <img src="${nameIcon}" alt="Completed" style="width: 14px; height: 14px; filter: brightness(0) invert(1);" />
                    </div>`;
    } else {
       iconHtml = `<div style="background-color: ${color}; border-radius: 50%; width: 100%; height: 100%; border: 3px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>`;
    }

    return L.divIcon({
      className: 'custom-driver-stop-icon',
      html: iconHtml,
      iconSize: iconSize,
      iconAnchor: iconAnchor,
    });
  };

  const createGlobalWarehouseIcon = () => {
       return L.divIcon({
          className: 'global-warehouse-icon',
          html: `<div style="background-color: black; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.5); cursor: pointer;">
                   <img src="${warehouseIcon}" alt="Warehouse" style="width: 22px; height: 22px; filter: brightness(0) invert(1);" />
                 </div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20]
      });
  };

  // --- RENDER: SINGLE DRIVER VIEW ---
  if (driver) {
      // 1. Generate polyline from stops to ensure it matches stops exactly
      const polylinePositions = driver.stops?.map(s => [s.lat, s.lng]) || [];

      return (
        <>
          <Polyline 
            positions={polylinePositions} 
            pathOptions={{ color: driver.routeColor || '#1A3C34', weight: 6, opacity: 1 }}
          />
          
          {driver.stops && driver.stops.map((stop, index) => {
             const isDriverHere = stop.isDriverHere || stop.status === 'ongoing';
             return (
                <Marker 
                    key={index} // Using index as fallback if id is missing or duplicate in dev, ideally use stop.id
                    position={[stop.lat, stop.lng]} 
                    icon={createDetailedStopIcon(stop, index === driver.stops.length - 1, isDriverHere)}
                    zIndexOffset={isDriverHere ? 1000 : 0}
                >
                    <Popup>
                        <strong>{stop.address}</strong><br/>
                        Status: {stop.status}
                    </Popup>
                </Marker>
             );
          })}
        </>
      );
  }

  // --- RENDER: ALL DRIVERS VIEW ---
  // Requirement: Show Driver icons at their current location.
  if (allDrivers && allDrivers.length > 0) {
      return (
          <>
            {allDrivers.map((drv) => {
                // Find driver's current location (isDriverHere or ongoing) or fallback to first stop
                const currentStop = drv.stops.find(s => s.isDriverHere || s.status === 'ongoing') || drv.stops[0];
                
                if (!currentStop) return null;

                // Create a driver icon similar to single view but maybe slightly simpler if needed, 
                // or exactly the same to match "Image 2" which likely implies the "Driver Here" look.
                // We'll use a slightly scaled down version of the "Detailed" driver icon for the overview
                // to avoid too much clutter, or just use the same style.
                // Let's use a explicit creator for clarity.
                
                const iconHtml = `<div style="background-color: #E8A72B; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.4);">
                                    <img src="${truckIcon}" alt="Truck" style="width: 20px; height: 20px; filter: brightness(0) invert(1);" />
                                  </div>`;

                const driverIcon = L.divIcon({
                    className: 'global-driver-icon',
                    html: iconHtml,
                    iconSize: [36, 36], // Slightly smaller than the 40x40 active one, or same. Let's go 36.
                    iconAnchor: [18, 18]
                });

                return (
                    <Marker
                        key={drv.id}
                        position={[currentStop.lat, currentStop.lng]}
                        icon={driverIcon}
                        eventHandlers={{
                            click: () => onDriverSelect && onDriverSelect(drv)
                        }}
                    >
                        <Popup>
                            <strong>{drv.name}</strong><br/>
                            {drv.company}<br/>
                            <span style={{fontSize: '0.8em', color: '#666'}}>Click to view route</span>
                        </Popup>
                    </Marker>
                );
            })}
          </>
      );
  }

  return null;
};

export default DriverMapLayer;
