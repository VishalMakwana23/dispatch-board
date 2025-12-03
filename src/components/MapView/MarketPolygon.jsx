import React from 'react';
import { Polygon, Marker } from 'react-leaflet';
import L from 'leaflet';

const MarketPolygon = ({ market }) => {
  const polygonOptions = {
    color: 'rgba(150,150,150,0.7)', // Border stroke
    weight: 2,
    fillColor: 'rgba(200, 200, 200, 0.35)', // Fill color
    fillOpacity: 0.35,
    dashArray: '5, 5', // Optional: adds a bit of texture if desired, but solid is requested. Removing dash for solid.
    // Actually, let's stick to the requested solid stroke
  };

  // Custom icon for the city label
  const labelIcon = L.divIcon({
    className: 'market-label',
    html: `<div style="
      font-family: Montserrat, sans-serif;
      font-weight: 600;
      color: rgba(90, 90, 90, 0.7);
      font-size: 24px;
      text-align: center;
      white-space: nowrap;
      text-shadow: 0 0 2px white;
    ">${market.name}</div>`,
    iconSize: [200, 40],
    iconAnchor: [100, 20] // Center the label
  });

  return (
    <>
      <style>
        {`
          .market-polygon-path {
            transition: fill-opacity 0.3s ease, stroke-opacity 0.3s ease;
            transform-origin: center;
            animation: fadeIn 0.3s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
      <Polygon 
        positions={market.polygon} 
        pathOptions={{
            className: 'market-polygon-path',
            color: 'rgba(150,150,150,0.7)',
            weight: 2,
            fillColor: 'rgba(200, 200, 200, 0.35)',
            fillOpacity: 1 // relying on rgba alpha
        }}
        eventHandlers={{
            mouseover: (e) => {
                e.target.setStyle({ fillOpacity: 0.5 });
            },
            mouseout: (e) => {
                e.target.setStyle({ fillOpacity: 1 }); // reset to default rgba alpha
            }
        }}
      />
      <Marker position={market.center} icon={labelIcon} interactive={false} />
    </>
  );
};

export default MarketPolygon;
