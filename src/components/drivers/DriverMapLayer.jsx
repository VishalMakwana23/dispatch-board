import React, { useEffect } from 'react';
import { Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import warehouseIcon from '../../assets/werehouse.svg';
import destinationIcon from '../../assets/Subtract.svg';

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

const DriverMapLayer = ({ driver }) => {
  const map = useMap();

  useEffect(() => {
    if (driver && driver.routePolyline && driver.routePolyline.length > 0) {
      map.invalidateSize();
      const bounds = L.latLngBounds(driver.routePolyline);
      map.fitBounds(bounds, { 
        paddingTopLeft: [50, 50],
        paddingBottomRight: [50, 300] 
      });
    }
  }, [driver, map]);

  if (!driver || !driver.routePolyline) return null;

  const createStopIcon = (stop, isLastStop) => {
    const color = getStopColor(stop.status);
    
    let iconHtml = '';
    let iconSize = [16, 16]; // 16px dots
    let iconAnchor = [8, 8];

    // Determine if it's a warehouse (start) or destination (end)
    // Note: Driver data might not explicitly say 'warehouse', so we assume first stop is start/warehouse if needed, 
    // but usually driver view shows a sequence. 
    // Let's assume index 0 is start and last index is end for special icons if we want to match the main map exactly.
    // However, the `stop` object here might not have `isWarehouse`. 
    // We'll check if it's the first stop in the list for warehouse icon if `stop.type` isn't available.
    
    const isFirstStop = driver.stops && driver.stops[0].id === stop.id;

    if (isFirstStop || stop.type === 'warehouse') {
       iconSize = [40, 40];
       iconAnchor = [20, 20];
       // Dark container for warehouse
       iconHtml = `<div style="background-color: #1A3C34; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                    <img src="${warehouseIcon}" alt="Warehouse" style="width: 20px; height: 20px; filter: brightness(0) invert(1);" />
                  </div>`;
    } else if (isLastStop) {
       iconSize = [40, 40];
       iconAnchor = [20, 20];
       // Orange container for destination
       iconHtml = `<div style="background-color: #FF5722; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                    <img src="${destinationIcon}" alt="Destination" style="width: 20px; height: 20px; filter: brightness(0) invert(1);" />
                  </div>`;
    } else {
       // Simple colored dot for intermediate stops
       iconHtml = `<div style="background-color: ${color}; border-radius: 50%; width: 100%; height: 100%; border: 3px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>`;
    }

    return L.divIcon({
      className: 'custom-driver-stop-icon',
      html: iconHtml,
      iconSize: iconSize,
      iconAnchor: iconAnchor,
    });
  };

  return (
    <>
      <Polyline 
        positions={driver.routePolyline} 
        // Use driver route color if available, else dark green
        pathOptions={{ color: driver.routeColor || '#1A3C34', weight: 6, opacity: 1 }}
      />
      
      {driver.stops && driver.stops.map((stop, index) => (
        <Marker 
            key={stop.id} 
            position={[stop.lat, stop.lng]} 
            icon={createStopIcon(stop, index === driver.stops.length - 1)}
        >
            <Popup>
                <strong>{stop.address}</strong><br/>
                Status: {stop.status}
            </Popup>
        </Marker>
      ))}
    </>
  );
};

export default DriverMapLayer;
