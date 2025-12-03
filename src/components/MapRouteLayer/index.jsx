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
};

// Helper to get color from status
const getStopColor = (status) => {
  const normalizedStatus = status?.toLowerCase();
  if (normalizedStatus === 'completed') return STATUS_COLORS.completed;
  if (normalizedStatus === 'ongoing') return STATUS_COLORS.ongoing;
  if (normalizedStatus === 'pending') return STATUS_COLORS.pending;
  if (normalizedStatus?.includes('risk') || normalizedStatus?.includes('issue') || normalizedStatus?.includes('missing')) return STATUS_COLORS.issue;
  return STATUS_COLORS.grey; // Default
};

// Custom Icons
const createStopIcon = (stop, isLastStop) => {
  const color = getStopColor(stop.status);
  
  let iconHtml = '';
  let iconSize = [16, 16]; // Increased from 12 to 16
  let iconAnchor = [8, 8];

  if (stop.isWarehouse) {
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
    className: 'custom-stop-icon',
    html: iconHtml,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
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
        // Use route.color if available, otherwise fallback to Dark Green
        pathOptions={{ color: route.color || '#1A3C34', weight: 6, opacity: 1 }}
      />
      {stops.map((stop, index) => (
        <Marker
          key={stop.id}
          position={[stop.lat, stop.lng]}
          icon={createStopIcon({ 
            ...stop, 
            isWarehouse: stop.type === 'warehouse' 
          }, index === stops.length - 1)} // Pass isLastStop
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
