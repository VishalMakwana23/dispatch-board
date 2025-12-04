import React, { useEffect } from 'react';
import { Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import warehouseIcon from '../../assets/werehouse.svg';
import destinationIcon from '../../assets/Subtract.svg';

// Mock Route Path (Coordinates)
// In a real app, this would come from a routing API based on the route's stops
const generateMockPath = (centerLat, centerLng) => {
  return [
    [centerLat + 0.02, centerLng - 0.02],
    [centerLat + 0.015, centerLng - 0.01],
    [centerLat + 0.01, centerLng],
    [centerLat, centerLng + 0.01],
    [centerLat - 0.01, centerLng + 0.015],
    [centerLat - 0.02, centerLng + 0.005],
  ];
};

// Custom Icons
const createStopIcon = (index, totalStops) => {
  let iconHtml = '';
  let iconSize = [12, 12];
  let iconAnchor = [6, 6];

  if (index === 0) {
     // Warehouse (Start)
     iconSize = [40, 40];
     iconAnchor = [20, 20];
     iconHtml = `<div style="background-color: #1A3C34; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                  <img src="${warehouseIcon}" alt="Warehouse" style="width: 20px; height: 20px; filter: brightness(0) invert(1);" />
                </div>`;
  } else if (index === totalStops - 1) {
     // Destination (End)
     iconSize = [40, 40];
     iconAnchor = [20, 20];
     iconHtml = `<div style="background-color: #FF6300; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                  <img src="${destinationIcon}" alt="Destination" style="width: 20px; height: 20px; filter: brightness(0) invert(1);" />
                </div>`;
  } else {
     // Intermediate Stops
     iconHtml = `<div style="
        background-color: #0B8A41; 
        width: 12px; 
        height: 12px; 
        border-radius: 50%; 
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      "></div>`;
  }

  return L.divIcon({
    className: 'route-stop-icon',
    html: iconHtml,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
  });
};

const RoutePreviewLayer = ({ route, order }) => {
  const map = useMap();
  
  // Generate a path relative to the order's pickup location for demo purposes
  const path = generateMockPath(order.pickup.lat, order.pickup.lng);

  useEffect(() => {
    if (path.length > 0) {
      const bounds = L.latLngBounds(path);
      bounds.extend([order.pickup.lat, order.pickup.lng]); // Include order pickup
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, order]);

  return (
    <>
      {/* Route Path */}
      <Polyline 
        positions={path} 
        pathOptions={{ color: '#1A3C34', weight: 4, opacity: 1 }} 
      />

      {/* Existing Stops */}
      {path.map((pos, idx) => (
        <Marker key={idx} position={pos} icon={createStopIcon(idx, path.length)}>
           <Popup>
             {idx === 0 ? 'Warehouse' : idx === path.length - 1 ? 'Destination' : `Stop ${idx}`}
           </Popup>
        </Marker>
      ))}

      {/* Dashed line to new order? Optional */}
      <Polyline 
        positions={[path[2], [order.pickup.lat, order.pickup.lng]]} 
        pathOptions={{ color: '#FF6300', weight: 2, dashArray: '5, 10', opacity: 0.8 }} 
      />
    </>
  );
};

export default RoutePreviewLayer;
