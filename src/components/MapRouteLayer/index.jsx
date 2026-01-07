import React, { useEffect } from 'react';
import { Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { selectStop, clearSelectedStop } from '../../redux/slices/uiSlice';
import warehouseIcon from '../../assets/werehouse.svg';
import userIcon from '../../assets/Subtract.svg'; // Renamed for consistency
import truckIcon from '../../assets/truck.svg';
import nameIcon from '../../assets/name.svg'; // Added for completed status
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
// Custom Icons
const createStopIcon = (stop, isLastStop) => {
  const color = getStopColor(stop.status);
  const isDriverHere = stop.isDriverHere;
  const isSelected = stop.isSelected;

  let iconHtml = '';
  // Base size - Reduced as requested
  // Selected: 42, Driver/ABC/Warehouse: 32, Standard: 24 (Need slightly bigger than 14 to fit icon 14px)
  // User asked for "icons in every stop".
  let size = isSelected ? 42 : 24;
  let iconSize = [size, size];
  let iconAnchor = [size / 2, size / 2];

  // Helper for icon image
  const getIconImg = (src, filterStyle = '') =>
    `<img src="${src}" style="width: 14px; height: 14px; ${filterStyle} display: block;" />`;

  let innerContent = '';
  let bgColor = color;
  let borderColor = 'white';
  let invertIcon = true;

  const whiteIconFilter = 'filter: brightness(0) invert(1);';
  const blackIconFilter = 'filter: brightness(0);'; // For white backgrounds

  if (stop.isWarehouse) {
    bgColor = '#1A3C34';
    innerContent = getIconImg(warehouseIcon, whiteIconFilter);
  } else if (stop.status === 'last_location') {
    bgColor = color;
    innerContent = getIconImg(userIcon, whiteIconFilter);
  } else if (stop.status === 'completed') {
    bgColor = '#107C41';
    innerContent = getIconImg(nameIcon, whiteIconFilter);
  } else if (stop.status === 'ongoing') {
    bgColor = '#E8A72B';
    innerContent = getIconImg(truckIcon, whiteIconFilter);
  } else if (stop.status === 'upcoming' || stop.status === 'pending') {
    bgColor = 'white';
    borderColor = color; // Colored border, white bg
    invertIcon = false;
    // Force icon to be black so it's visible on white bg
    innerContent = getIconImg(truckIcon, blackIconFilter);
  } else {
    // Fallback
    innerContent = getIconImg(truckIcon, whiteIconFilter);
  }

  // Helper helper
  const hexToRgba = (hex, alpha) => {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
    }
    return `rgba(0,0,0,${alpha})`; // Fallback
  };

  // Pulse animation for selected stop
  const pulseColor = isDriverHere ? '#E8A72B' : (stop.status === 'completed' ? '#107C41' : (stop.status === 'ongoing' ? '#E8A72B' : '#AAAAAA'));

  // Basic pulse ring (opacity fade)
  const pulseAnimation = isSelected ? `
        @keyframes pulse-ring {
            0% { box-shadow: 0 0 0 0 ${hexToRgba(pulseColor, 0.7)}; }
            70% { box-shadow: 0 0 0 10px ${hexToRgba(pulseColor, 0)}; }
            100% { box-shadow: 0 0 0 0 ${hexToRgba(pulseColor, 0)}; }
        }
        animation: pulse-ring 1.5s infinite;
     ` : '';

  // Zoom animation for Driver/Current stop
  const zoomAnimation = `
      @keyframes zoom-in-out {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
      }
  `;

  if (isDriverHere) {
    // Driver Icon (Yellow/Orange Truck) - animated
    // If selected, we might want it to stay big or stick to the zoom. 
    // User asked "make current stop little big and animated like little zom and out"
    // We'll apply the zoom animation.
    iconHtml = `
            <style>${zoomAnimation}</style>
            <div style="width: 100%; height: 100%; animation: zoom-in-out 2s infinite ease-in-out;">
                <div style="background-color: #E8A72B; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.4);">
                   <img src="${truckIcon}" alt="Truck" style="width: 18px; height: 18px; filter: brightness(0) invert(1);" />
                </div>
                ${isSelected ? `<div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; border: 2px solid ${pulseColor}; animation: pulse 1.5s infinite; left: -2px; top: -2px; z-index: -1;"></div>` : ''}
            </div>`;
  } else if (stop.isWarehouse) {
    iconSize = [32, 32];
    iconAnchor = [16, 16];
    iconHtml = `<div style="background-color: #1A3C34; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'}; transition: transform 0.3s ease;">
                  <img src="${warehouseIcon}" alt="Warehouse" style="width: 16px; height: 16px; filter: brightness(0) invert(1);" />
                </div>`;
  } else {
    // Intermediate stops

    iconHtml = `<div style="
            background-color: ${bgColor}; 
            border-radius: 50%; 
            width: 100%; 
            height: 100%; 
            border: 2px solid ${borderColor}; 
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'}; 
            transition: transform 0.3s ease;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        ">
            ${innerContent}
            ${isSelected ? `<div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; border: 2px solid ${pulseColor}; animation: pulse 1.5s infinite; left: -2px; top: -2px;"></div>` : ''}
        </div>`;
  }

  return L.divIcon({
    className: `custom-stop-icon ${isSelected ? 'selected' : ''}`,
    html: iconHtml,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
  });
};

const StopMarker = ({ stop, index, isDriverHere, isSelected, isLast, dispatch, isAdmin }) => {
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
          dispatch(clearSelectedStop(stop.id)); // Potential conflict with sidebar selection
        }
      }}
      zIndexOffset={isSelected ? 1000 : (isDriverHere ? 900 : 0)}
    >
      <Popup offset={[0, -10]}>
        <Box sx={{ minWidth: '200px' }}>
          <Typography variant="subtitle2" fontWeight="bold">{stop.name}</Typography>
          <Typography variant="body2" color="text.secondary">{stop.address}</Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            {!isAdmin && (
              <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                📦 {stop.parcels || 0} items
              </Typography>
            )}
            {!isAdmin && (
              <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                🕒 {stop.etaWindow || '-'}
              </Typography>
            )}
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

const MapRouteLayer = ({ route, isAdmin = false }) => {
  const map = useMap();
  const dispatch = useDispatch();
  const selectedStopId = useSelector(state => state.ui.selectedStopId);

  // Use route.stops directly from the new data structure, filtering invalid coords
  const stops = (route?.stops || []).filter(s =>
    s.lat !== undefined && s.lat !== null && !isNaN(s.lat) &&
    s.lng !== undefined && s.lng !== null && !isNaN(s.lng)
  );

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

  // Segment 4: Highlighted (Match Underlying Color) - From Prev Stop to Selected Stop
  let highlightedPath = [];
  let highlightColor = route.color || '#3F8CFF';

  if (selectedStopId) {
    const selectedIndex = stops.findIndex(s => s.id === selectedStopId);

    if (selectedIndex > 0) { // Can't highlight segment to first stop (no prev stop)
      highlightedPath = allPositions.slice(selectedIndex - 1, selectedIndex + 1);

      // Determine color based on segment status
      if (selectedIndex <= driverStopIndex) {
        highlightColor = '#107C41'; // Green (Completed)
      } else if (selectedIndex === driverStopIndex + 1) {
        highlightColor = '#E8A72B'; // Yellow (Ongoing)
      } else {
        highlightColor = '#AAAAAA'; // Grey (Pending)
      }
    }
  }

  return (
    <>
      {/* Polylines */}
      <Polyline positions={completedPath} pathOptions={{ color: '#107C41', weight: 6 }} />
      <Polyline positions={ongoingPath} pathOptions={{ color: '#E8A72B', weight: 6, dashArray: '10, 10' }} />
      <Polyline positions={remainingPath} pathOptions={{ color: '#AAAAAA', weight: 6, dashArray: '5, 10' }} />
      {/* Highlighted Segment Overlay */}
      {highlightedPath.length > 0 && (
        <Polyline positions={highlightedPath} pathOptions={{ color: highlightColor, weight: 10, opacity: 0.8 }} />
      )}

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
            isAdmin={isAdmin}
          />
        );
      })}

      <MapLegend showPickupDelivery={route?.isUnassignedPreview} />
    </>
  );
};

export default MapRouteLayer;
