import React, { useEffect } from 'react';
import { Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { selectStop, clearSelectedStop } from '../../redux/slices/uiSlice';
import warehouseIcon from '../../assets/werehouse.svg';
import destinationIcon from '../../assets/Subtract.svg';
import truckIcon from '../../assets/truck.svg';
import MapLegend from './MapLegend';

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
// Custom Icons
const createStopIcon = (stop, isLastStop) => {
  const color = getStopColor(stop.status);
  const isDriverHere = stop.isDriverHere;
  const isSelected = stop.isSelected;
  
  let iconHtml = '';
  // Base size
  let size = isSelected ? 48 : (isDriverHere ? 40 : 20); 
  let iconSize = [size, size];
  let iconAnchor = [size/2, size/2];

  if (isDriverHere) {
       // Driver Icon (Yellow/Orange Truck)
        iconHtml = `<div class="pulse-ring" style="width: 100%; height: 100%; transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'}; transition: transform 0.3s ease;">
                        <div style="background-color: #E8A72B; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.4);">
                           <img src="${truckIcon}" alt="Truck" style="width: 24px; height: 24px; filter: brightness(0) invert(1);" />
                        </div>
                    </div>`;
  } else if (stop.isWarehouse) {
     iconSize = [40, 40];
     iconAnchor = [20, 20];
     iconHtml = `<div style="background-color: #1A3C34; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'}; transition: transform 0.3s ease;">
                  <img src="${warehouseIcon}" alt="Warehouse" style="width: 20px; height: 20px; filter: brightness(0) invert(1);" />
                </div>`;
  } else {
     // Intermediate stops
     // If selected, show expanded info or just larger dot?
     // Image shows white dot pending, green dot completed.
     // Let's make it simple: Color dot.
     const innerColor = stop.status === 'completed' ? '#107C41' : (stop.status === 'pending' ? 'white' : color);
     const borderColor = stop.status === 'pending' ? '#AAAAAA' : 'white';
     
     iconHtml = `<div style="
            background-color: ${innerColor}; 
            border-radius: 50%; 
            width: 100%; 
            height: 100%; 
            border: 3px solid ${borderColor}; 
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            transform: ${isSelected ? 'scale(1.5)' : 'scale(1)'}; 
            transition: transform 0.3s ease;
            position: relative;
        ">
            ${isSelected ? `<div style="position: absolute; top: -5px; left: -5px; right: -5px; bottom: -5px; border-radius: 50%; border: 2px solid ${color}; animation: pulse 1.5s infinite;"></div>` : ''}
        </div>`;
  }

  return L.divIcon({
    className: `custom-stop-icon ${isSelected ? 'selected' : ''}`,
    html: iconHtml,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
  });
};

const StopMarker = ({ stop, index, isDriverHere, isSelected, isLast, dispatch }) => {
  const markerRef = React.useRef(null);

  useEffect(() => {
    if (isSelected && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [isSelected]);

  return (
    <Marker
        key={stop.id}
        position={[stop.lat, stop.lng]}
        ref={markerRef}
        icon={createStopIcon({ 
            ...stop, 
            isWarehouse: stop.type === 'warehouse',
            isDriverHere,
            isSelected
        }, isLast)} 
        eventHandlers={{
            click: () => {
                dispatch(selectStop(stop.id));
            },
            popupclose: () => {
                dispatch(clearSelectedStop(stop.id));
            }
        }}
        zIndexOffset={isSelected ? 1000 : (isDriverHere ? 900 : 0)}
    >
        <Popup offset={[0, -10]}>
            <Box sx={{ minWidth: '200px' }}>
                <Typography variant="subtitle2" fontWeight="bold">{stop.name}</Typography>
                <Typography variant="body2" color="text.secondary">{stop.address}</Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        📦 {stop.parcels || 0} items
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            🕒 {stop.etaWindow || '-'}
                    </Typography>
                </Box>
                    {isDriverHere && (
                    <Box sx={{ mt: 1, p: 0.5, bgcolor: '#FFF3E0', color: '#E65100', borderRadius: 1, fontSize: '11px', textAlign: 'center' }}>
                        DRIVER IS HERE
                    </Box>
                )}
            </Box>
        </Popup>
    </Marker>
  );
};

const MapRouteLayer = ({ route }) => {
  const map = useMap();
  const dispatch = useDispatch();
  const selectedStopId = useSelector(state => state.ui.selectedStopId);
  
  // Use route.stops directly from the new data structure
  const stops = route?.stops || [];

  useEffect(() => {
    if (stops && stops.length > 0) {
      if (selectedStopId) {
        const stop = stops.find(s => s.id === selectedStopId);
        if (stop) {
            map.flyTo([stop.lat, stop.lng], 16, { animate: true, duration: 1.5 });
        }
      } else {
        // Only fit bounds initially or if no stop selected
        // const bounds = L.latLngBounds(stops.map(s => [s.lat, s.lng]));
        // map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      }
    }
  }, [stops, map, selectedStopId]);

  if (!route || stops.length === 0) return null;

  // --- Polyline Segmentation Logic ---
  const completedStopIndex = stops.findIndex(s => s.status === 'ongoing');
  const driverStopIndex = completedStopIndex === -1 ? stops.length : completedStopIndex;

  const allPositions = stops.map(s => [s.lat, s.lng]);

  // Segment 1: Completed (Green) - From Start to Driver/Ongoing Stop
  const completedPath = allPositions.slice(0, driverStopIndex + 1);

  // Segment 2: Ongoing (Yellow) - From Driver/Ongoing to Next Stop
  const ongoingPath = driverStopIndex < stops.length - 1 ? 
      allPositions.slice(driverStopIndex, driverStopIndex + 2) : [];

  // Segment 3: Remaining (Gray) - From Next Stop to End
  const remainingPath = driverStopIndex < stops.length - 1 ? 
      allPositions.slice(driverStopIndex + 1) : [];


  return (
    <>
      {/* Polylines */}
      <Polyline positions={completedPath} pathOptions={{ color: '#107C41', weight: 6 }} />
      <Polyline positions={ongoingPath} pathOptions={{ color: '#E8A72B', weight: 6, dashArray: '10, 10' }} />
      <Polyline positions={remainingPath} pathOptions={{ color: '#AAAAAA', weight: 6, dashArray: '5, 10' }} />

      {stops.map((stop, index) => {
        const isSelected = selectedStopId === stop.id;
        const isDriverHere = stop.status === 'ongoing';

        return (
            <StopMarker 
                key={stop.id}
                stop={stop}
                index={index}
                isDriverHere={isDriverHere}
                isSelected={isSelected}
                isLast={index === stops.length - 1}
                dispatch={dispatch}
            />
        );
      })}

      <MapLegend />
    </>
  );
};

export default MapRouteLayer;
