import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

const createClusterIcon = (count, type) => {
  const size = type === 'active' ? 40 : 30;
  const color = type === 'active' ? '#1B3E38' : '#757575'; // Dark green or Grey
  
  return L.divIcon({
    className: 'custom-cluster-icon',
    html: `<div style="
      background-color: ${color};
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-family: Montserrat, sans-serif;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      border: 2px solid white;
    ">${count}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
};

const MarketMarkers = ({ markers }) => {
  return (
    <>
      {markers.map((marker) => {
        // Map mapPoints data to visual style
        // If marker has a value, use it. If it's a warehouse, maybe skip or show differently?
        // The design shows clusters with numbers.
        // mapPoints have: value, color ('green', 'grey', 'orange'), type ('stop', 'warehouse')
        
        if (marker.type === 'warehouse') return null; // Skip warehouses for cluster view? Or show as small? Design shows clusters.
        
        const count = marker.value || 0;
        const type = marker.color === 'green' ? 'active' : 'inactive'; // Map green to active, others to inactive
        
        return (
          <Marker 
            key={marker.id} 
            position={[marker.lat, marker.lng]} 
            icon={createClusterIcon(count, type)}
          />
        );
      })}
    </>
  );
};

export default MarketMarkers;
