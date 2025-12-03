import React, { useEffect } from 'react';
import { Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';


const STATUS_COLORS = {
  green: '#107C41',
  yellow: '#E8A72B',
  orange: '#E67200',
  red: '#D24238',
  grey: '#AAAAAA',
};

// Custom Icons
const createStopIcon = (stop) => {
  const color = STATUS_COLORS[stop.color] || STATUS_COLORS.grey;
  
  let iconHtml = '';
  
  // Use SVG icons inside the markers for better visual match
  // Warehouse: Home/Load
  // Completed: Check
  // Risk/Issue: Exclamation/Truck
  // Last Location: Person/Truck
  
  if (stop.isWarehouse) {
     iconHtml = `<div style="background-color: ${color}; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; color: white; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                  <svg style="width:14px;height:14px" viewBox="0 0 24 24"><path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg>
                </div>`;
  } else if (stop.status === 'last_location') {
     iconHtml = `<div style="background-color: ${color}; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; color: white; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                  <svg style="width:18px;height:18px" viewBox="0 0 24 24"><path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>
                </div>`;
  } else if (stop.status === 'completed') {
      iconHtml = `<div style="background-color: ${color}; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; color: white; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">
                    <svg style="width:12px;height:12px" viewBox="0 0 24 24"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
                  </div>`;
  } else if (stop.status === 'upcoming') {
       // Outline style for upcoming
       iconHtml = `<div style="background-color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; color: ${color}; border: 2px solid ${color}; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">
                    <svg style="width:12px;height:12px" viewBox="0 0 24 24"><path fill="currentColor" d="M20,8H17V4H3C1.89,4 1,4.89 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8M6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5M18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5M17,12V9.5H19.5L21.47,12H17Z" /></svg>
                  </div>`;
  } else {
     // Default (Truck) for others
     iconHtml = `<div style="background-color: ${color}; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; color: white; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">
                  <svg style="width:12px;height:12px" viewBox="0 0 24 24"><path fill="currentColor" d="M20,8H17V4H3C1.89,4 1,4.89 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8M6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5M18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5M17,12V9.5H19.5L21.47,12H17Z" /></svg>
                </div>`;
  }

  return L.divIcon({
    className: 'custom-stop-icon',
    html: iconHtml,
    iconSize: stop.status === 'last_location' ? [30, 30] : (stop.isWarehouse ? [24, 24] : [20, 20]),
    iconAnchor: stop.status === 'last_location' ? [15, 15] : (stop.isWarehouse ? [12, 12] : [10, 10]),
  });
};

const MapRouteLayer = ({ route }) => {
  const map = useMap();
  
  // Use route.stops directly from the new data structure
  const stops = route?.stops || [];

  useEffect(() => {
    if (stops && stops.length > 0) {
      // Calculate bounds from stops
      const bounds = L.latLngBounds(stops.map(s => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [stops, map]);

  if (!route || stops.length === 0) return null;

  // Create polyline from stops order
  const polylinePositions = stops.map(s => [s.lat, s.lng]);

  return (
    <>
      <Polyline
        positions={polylinePositions}
        pathOptions={{ color: route.color || '#0A3B32', weight: 4, opacity: 0.9 }}
      />
      {stops.map((stop) => (
        <Marker
          key={stop.id}
          position={[stop.lat, stop.lng]}
          icon={createStopIcon({ 
            ...stop, 
            color: route.color,
            isWarehouse: stop.type === 'warehouse' 
          })} // Pass route color and isWarehouse
        >
          <Popup>
            <strong>{stop.address}</strong><br/>
            Type: {stop.type}<br/>
            Status: {stop.status}
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default MapRouteLayer;
