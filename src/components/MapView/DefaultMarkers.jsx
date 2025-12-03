import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Re-using the icon creation logic from the original file
const createCustomIcon = (point) => {
  if (point.type === 'warehouse') {
    return L.divIcon({
      className: 'custom-icon',
      html: `<div style="background-color: black; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; color: white; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
               <span style="font-size: 16px;">🏠</span> 
             </div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  }

  const colorMap = {
    green: '#2E7D32',
    grey: '#9E9E9E',
    orange: '#ED6C02',
  };
  
  const bgColor = colorMap[point.color] || '#2E7D32';

  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${bgColor}; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; color: white; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
             <span style="font-weight: bold; font-size: 14px;">${point.value}</span>
           </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

const DefaultMarkers = ({ points }) => {
  return (
    <>
      {points.map((point) => (
        <Marker 
          key={point.id} 
          position={[point.lat, point.lng]} 
          icon={createCustomIcon(point)}
        >
          <Popup>
            Value: {point.value} <br /> Type: {point.type}
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default DefaultMarkers;
