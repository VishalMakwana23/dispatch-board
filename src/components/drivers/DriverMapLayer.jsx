import React, { useEffect } from 'react';
import { Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const DriverMapLayer = ({ driver }) => {
  const map = useMap();

  useEffect(() => {
    if (driver && driver.routePolyline && driver.routePolyline.length > 0) {
      const bounds = L.latLngBounds(driver.routePolyline);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [driver, map]);

  if (!driver || !driver.routePolyline) return null;

  const getMarkerIcon = (status) => {
    let color = '#9E9E9E'; // Default grey
    if (status === 'completed') color = '#2E7D32'; // Green
    if (status === 'warning') color = '#ED6C02'; // Yellow/Orange
    if (status === 'failed') color = '#D32F2F'; // Red
    if (status === 'unattempted') color = '#9E9E9E'; // Grey

    return L.divIcon({
      className: 'custom-driver-stop-icon',
      html: `<div style="background-color: ${color}; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>`,
      iconSize: [10, 10],
      iconAnchor: [5, 5],
    });
  };

  return (
    <>
      <Polyline 
        positions={driver.routePolyline} 
        color="#0B3B32" 
        weight={5} 
        opacity={0.9} 
      />
      
      {driver.stops && driver.stops.map(stop => (
        <Marker 
            key={stop.id} 
            position={[stop.lat, stop.lng]} 
            icon={getMarkerIcon(stop.status)}
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
