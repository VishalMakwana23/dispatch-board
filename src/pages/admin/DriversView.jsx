import React, { useState } from 'react';
import { Box } from '@mui/material';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import DriversPanel from '../../components/drivers/DriversPanel';
import DriverDetailsPopup from '../../components/drivers/DriverDetailsPopup';
import DriverMapLayer from '../../components/drivers/DriverMapLayer';

const DriversView = ({ activeView, setActiveView, isCollapsed }) => {
  const [selectedDriver, setSelectedDriver] = useState(null);

  const handleDriverSelect = (driver) => {
    setSelectedDriver(driver);
  };

  const center = [31.1201, -97.7423]; // Default center

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      {/* Left Panel */}
      <DriversPanel 
        activeView={activeView || 'drivers'} 
        setActiveView={setActiveView}
        onDriverSelect={handleDriverSelect}
        selectedDriverId={selectedDriver?.id}
        isCollapsed={isCollapsed}
      />

      {/* Right Map Area */}
      <Box sx={{ 
        flexGrow: 1, 
        height: '100%', 
        position: 'relative',
        marginLeft: '350px', // Width of DriversPanel
        transition: 'margin-left 0.3s ease'
      }}>
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
            
            <DriverMapLayer driver={selectedDriver} />
        </MapContainer>

        {/* Bottom Popup */}
        {selectedDriver && (
            <DriverDetailsPopup 
                driver={selectedDriver} 
                onClose={() => setSelectedDriver(null)} 
            />
        )}
      </Box>
    </Box>
  );
};

export default DriversView;
