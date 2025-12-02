import React, { useEffect } from 'react';
import { Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

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

const stopIcon = L.divIcon({
  className: 'route-stop-icon',
  html: `<div style="
    background-color: #0B8A41; 
    width: 12px; 
    height: 12px; 
    border-radius: 50%; 
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  "></div>`,
  iconSize: [12, 12],
});

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
        pathOptions={{ color: '#333', weight: 3, opacity: 0.8 }} 
      />

      {/* Existing Stops */}
      {path.map((pos, idx) => (
        <Marker key={idx} position={pos} icon={stopIcon}>
           <Popup>Stop {idx + 1}</Popup>
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
