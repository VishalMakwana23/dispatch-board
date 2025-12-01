import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import HomeIcon from '@mui/icons-material/Home'; // Using Home as Warehouse icon proxy if needed, or Store
import StoreIcon from '@mui/icons-material/Store';
import { mapPoints } from '../../mock/mapPoints';

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

const createCustomIcon = (point) => {
  if (point.type === 'warehouse') {
    return L.divIcon({
      className: 'custom-icon',
      html: `<div style="background-color: black; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; color: white; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
               <span style="font-size: 16px;">🏠</span> 
             </div>`, // Using emoji as simple icon, or could use SVG
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

const MapView = () => {
  const center = [31.1201, -97.7423]; // Centered on mock points

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <MapContainer 
        center={center} 
        zoom={12} 
        style={{ height: '100%', width: '100%', background: '#f0f0f0' }} 
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {mapPoints.map((point) => (
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
      </MapContainer>

      {/* Floating Controls Top Right */}
      <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end' }}>
        <Paper sx={{ display: 'flex', alignItems: 'center', p: 1, borderRadius: 2, bgcolor: '#1B3E38', color: 'white', cursor: 'pointer' }}>
           <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
           <Typography variant="body2" sx={{ fontWeight: 600 }}>Nov 18, 2025</Typography>
           <Typography variant="caption" sx={{ display: 'block', ml: 1, color: '#aaa' }}>12:00 AM - 11:59 PM</Typography>
        </Paper>

        <Paper sx={{ width: 120, borderRadius: 2, overflow: 'hidden' }}>
           <Box sx={{ p: 1, textAlign: 'center', cursor: 'pointer', '&:hover': { bgcolor: '#f5f5f5' } }}>
             <Typography variant="body2" fontWeight="600">Market</Typography>
           </Box>
           <Box sx={{ p: 1, textAlign: 'center', cursor: 'pointer', borderTop: '1px solid #eee', '&:hover': { bgcolor: '#f5f5f5' } }}>
             <Typography variant="body2" fontWeight="600">Traffic</Typography>
           </Box>
        </Paper>
      </Box>

      {/* Zoom Controls Bottom Right */}
      <Box sx={{ position: 'absolute', bottom: 120, right: 20, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 1 }}>
         <Paper sx={{ display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
            <IconButton size="small"><AddIcon /></IconButton>
            <IconButton size="small"><RemoveIcon /></IconButton>
         </Paper>
         <Paper sx={{ borderRadius: '50%', p: 0.5, bgcolor: 'black', color: 'white' }}>
            <IconButton size="small" sx={{ color: 'white' }}><StoreIcon /></IconButton>
         </Paper>
      </Box>
    </Box>
  );
};

export default MapView;
