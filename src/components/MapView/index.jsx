import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import StoreIcon from '@mui/icons-material/Store';
// import { mapPoints } from '../../mock/mapPoints'; // Deprecated
// import { markets } from '../../mock/markets'; // No longer needed for dynamic generation

// Components
import MarketPolygon from './MarketPolygon';
import MarketMarkers from './MarketMarkers';
import DefaultMarkers from './DefaultMarkers';
import MapRouteLayer from '../MapRouteLayer';
import { killeenData } from '../../mock/killeenData';
import warehouseIcon from '../../assets/werehouse.svg';

// Utils
import { calculateConvexHull, calculateCenter, expandPolygon } from '../../utils/geoUtils';

// Fix Leaflet default icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map view transitions
const MapController = ({ marketMode, selectedMarket, selectedRoutes }) => {
  const map = useMap();

  useEffect(() => {
    if (marketMode && selectedMarket) {
      // Fit bounds to the market polygon
      const polygon = selectedMarket.polygon;
      if (polygon && polygon.length > 0) {
        map.flyToBounds(polygon, {
          padding: [50, 50],
          duration: 1.5 // Smooth transition
        });
      }
    } else if (selectedRoutes && selectedRoutes.length > 0) {
      // Fit bounds to all selected routes
      const allPoints = [];
      selectedRoutes.forEach(route => {
        if (route.stops) {
          route.stops.forEach(stop => allPoints.push([stop.lat, stop.lng]));
        }
      });

      if (allPoints.length > 0) {
        const bounds = L.latLngBounds(allPoints);
        map.flyToBounds(bounds, {
          padding: [50, 50],
          duration: 1.5
        });
      }
    } else {
      // Reset to default view (approximate center of all points)
      // For now, hardcoded to the initial center or we could calculate bounds of mapPoints
      map.flyTo([31.1201, -97.7423], 12, {
        duration: 1.5
      });
    }
  }, [marketMode, selectedMarket, selectedRoutes, map]);

  return null;
};

// Zoom Control Component
const ZoomControl = () => {
  const map = useMap();
  
  return (
    <Box sx={{ position: 'absolute', bottom: 24, right: 24, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 1 }}>
         <Paper sx={{ display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
            <IconButton size="small" onClick={() => map.zoomIn()}><AddIcon /></IconButton>
            <IconButton size="small" onClick={() => map.zoomOut()}><RemoveIcon /></IconButton>
         </Paper>
         {/* Store Icon Removed as per request */}
    </Box>
  );
};

const MapView = ({ panels, selectedRoutes, marketMode, onMarketToggle }) => {
  // Local state for marketMode removed - lifted to parent
  
  // Dynamically calculate market data based on killeenData routes
  const dynamicMarket = useMemo(() => {
    // Collect all stops from all routes
    const allStops = [];
    killeenData.routes.forEach(route => {
        if (route.stops) {
            route.stops.forEach(stop => {
                allStops.push({
                    lat: stop.lat,
                    lng: stop.lng,
                    id: stop.id,
                    type: stop.type,
                    value: stop.orders || 1, // Default to 1 if undefined
                    color: stop.color || route.color || 'grey' // Use stop color, fallback to route color
                });
            });
        }
    });

    if (allStops.length === 0) return null;

    const hull = calculateConvexHull(allStops);
    const center = calculateCenter(allStops);
    // Expand the polygon slightly so points aren't on the edge
    const expandedHull = expandPolygon(hull, center, 1.3); 

    return {
        id: 'dynamic-killeen',
        name: 'Killeen',
        polygon: expandedHull,
        center: center,
        markers: allStops // Pass actual stops to markers if needed, or stick to a simplified view
    };
  }, []); // killeenData is imported, so it's stable. In real app, it would be a dependency.

  const [selectedMarket, setSelectedMarket] = useState(dynamicMarket);

  // Update selected market if dynamic market changes (e.g. data update)
  useEffect(() => {
      setSelectedMarket(dynamicMarket);
  }, [dynamicMarket]);

  const center = [31.1201, -97.7423]; // Centered on mock points

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <MapContainer 
        center={center} 
        zoom={12} 
        style={{ height: '100%', width: '100%', background: '#f0f0f0' }} 
        zoomControl={false}
      >
        <MapController marketMode={marketMode} selectedMarket={selectedMarket} selectedRoutes={selectedRoutes} />
        <ZoomControl />
        
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {/* Render Route Warehouses (Default View) */}
        {!marketMode && (!selectedRoutes || selectedRoutes.length === 0) && (!panels || panels.length === 0) && (
          <>
             {killeenData.routes.map(route => {
                 const warehouse = route.stops.find(s => s.type === 'warehouse') || route.stops[0];
                 if (!warehouse) return null;
                 
                 return (
                     <Marker
                        key={route.id}
                        position={[warehouse.lat, warehouse.lng]}
                        icon={L.divIcon({
                            className: 'global-warehouse-icon',
                            html: `<div style="background-color: black; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.5); cursor: pointer;">
                                     <img src="${warehouseIcon}" alt="Warehouse" style="width: 22px; height: 22px; filter: brightness(0) invert(1);" />
                                   </div>`,
                            iconSize: [40, 40],
                            iconAnchor: [20, 20]
                        })}
                     >
                        <Popup>
                            <strong>Route {route.id}</strong><br />
                            {route.driver?.name}
                        </Popup>
                     </Marker>
                 );
             })}
          </>
        )}

        {/* Market Overlay Layers */}
        {marketMode && selectedMarket && (
          <>
            <MarketPolygon market={selectedMarket} />
            <MarketMarkers markers={selectedMarket.markers} />
          </>
        )}

        {/* Render Selected Routes */}
        {selectedRoutes && selectedRoutes.map(route => (
          <MapRouteLayer key={route.id} route={route} />
        ))}
        
        {/* Legacy panels support if needed, but we are moving to selectedRoutes */}
        {panels && panels.map(panel => (
          <MapRouteLayer key={panel.routeId} route={panel.data} />
        ))}
      </MapContainer>

      {/* Floating Controls Top Right */}
      <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: 'flex-end' }}>
        {/* Date/Time Control */}
        <Paper 
          elevation={3}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            p: 1.5, 
            borderRadius: 2, 
            bgcolor: '#1B3E38', 
            color: 'white', 
            cursor: 'pointer',
            minWidth: 180
          }}
        >
           <CalendarTodayIcon sx={{ mr: 1.5, fontSize: 24 }} />
           <Box>
             <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>Nov 18, 2025</Typography>
             <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255,255,255,0.7)', lineHeight: 1.2 }}>12 AM - 11:59 PM</Typography>
           </Box>
        </Paper>

        {/* Market Button */}
        <Paper 
          elevation={3}
          onClick={onMarketToggle}
          sx={{ 
            width: 140, 
            borderRadius: 2, 
            overflow: 'hidden', 
            bgcolor: marketMode ? '#e0e0e0' : 'white', // Visual feedback for active state
            transition: 'all 0.2s',
            '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 },
            border: marketMode ? '2px solid #1B3E38' : 'none'
          }}
        >
           <Box sx={{ p: 1.5, textAlign: 'center', cursor: 'pointer', '&:hover': { bgcolor: '#f5f5f5' } }}>
             <Typography variant="body1" fontWeight="600" color="#1B3E38">Market</Typography>
           </Box>
        </Paper>

        {/* Traffic Button */}
        <Paper 
          elevation={3}
          sx={{ 
            width: 140, 
            borderRadius: 2, 
            overflow: 'hidden', 
            bgcolor: 'white',
            transition: 'all 0.2s',
            '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 }
          }}
        >
           <Box sx={{ p: 1.5, textAlign: 'center', cursor: 'pointer', '&:hover': { bgcolor: '#f5f5f5' } }}>
             <Typography variant="body1" fontWeight="600" color="#1B3E38">Traffic</Typography>
           </Box>
        </Paper>
      </Box>

      {/* Zoom Controls Removed from here and moved inside MapContainer */}
    </Box>
  );
};

export default MapView;
