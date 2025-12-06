import React, { useEffect } from 'react';
import { Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import './OrderMapLayer.css'; 
import mckIcon from '../../assets/mck.png';
import staplesIcon from '../../assets/staples.png';

// 1. Order Icon with Vendor Logic
const createOrderIcon = (order) => {
    // Determine Color based on Vendor
    let markerColor = '#4B5563'; // Default Grey
    if (order.vendor === 'STAPLES') markerColor = '#CC0000'; // Red
    if (order.vendor === 'MCKESSON') markerColor = '#005596'; // Blue

    return L.divIcon({
        className: 'custom-order-icon',
        html: `
            <div class="order-marker">
               <svg width="30" height="36" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 0C6.71573 0 0 6.71573 0 15C0 25.5 15 36 15 36C15 36 30 25.5 30 15C30 6.71573 23.2843 0 15 0Z" fill="${markerColor}"/>
                    <circle cx="15" cy="15" r="6" fill="white"/>
                </svg>
            </div>
        `,
        iconSize: [30, 36],
        iconAnchor: [15, 36],
        popupAnchor: [0, -36],
    });
};

// 2. Driver Icon (Yellow Truck - Image 2 Style)
const createDriverIcon = (driver) => {
    // Style: Yellow/Orange Circle with White Truck
    // Background: #E8A72B
    // Border: White
    
    return L.divIcon({
        className: 'custom-driver-icon',
        html: `
            <div style="
                background-color: #E8A72B; 
                width: 40px; 
                height: 40px; 
                border-radius: 50%; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                border: 3px solid white; 
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            ">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 3H3V17H1V3ZM4 17V3H13V8H16L19 12V17H17C17 18.66 15.66 20 14 20C12.34 20 11 18.66 11 17H7C7 18.66 5.66 20 4 20C2.34 20 1 18.66 1 17H4ZM14 18C14.55 18 15 17.55 15 17C15 16.45 14.55 16 14 16C13.45 16 13 16.45 13 17C13 17.55 13.45 18 14 18ZM4 18C4.55 18 5 17.55 5 17C5 16.45 4.55 16 4 16C3.45 16 3 16.45 3 17C3 17.55 3.45 18 4 18ZM13 10V12H17.5L16 10H13Z" fill="white"/>
                </svg>
            </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    });
};


// 3. Selected Order Icons
const createSelectedOrderIcon = (type) => {
    if (type === 'pickup') {
         return L.divIcon({
            className: 'selected-pin-icon',
            html: `
                <div class="selected-marker pickup fa-bounce">
                    <svg width="50" height="60" viewBox="0 0 50 60" fill="none">
                        <path d="M25 0C11.1929 0 0 11.1929 0 25C0 42.5 25 60 25 60C25 60 50 42.5 50 25C50 11.1929 38.8071 0 25 0Z" fill="#FF6300"/>
                        <circle cx="25" cy="25" r="10" fill="white"/>
                        <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-size="12" font-weight="bold" fill="#FF6300">P</text>
                    </svg>
                </div>
            `,
            iconSize: [50, 60],
            iconAnchor: [25, 60],
            popupAnchor: [0, -60]
        });
    } else {
        return L.divIcon({
            className: 'selected-pin-icon',
            html: `
                <div class="selected-marker delivery">
                    <svg width="40" height="48" viewBox="0 0 50 60" fill="none">
                        <path d="M25 0C11.1929 0 0 11.1929 0 25C0 42.5 25 60 25 60C25 60 50 42.5 50 25C50 11.1929 38.8071 0 25 0Z" fill="#333"/>
                        <circle cx="25" cy="25" r="10" fill="white"/>
                        <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">D</text>
                    </svg>
                </div>
            `,
            iconSize: [40, 48],
            iconAnchor: [20, 48],
             popupAnchor: [0, -48]
        });
    }
};

const OrderMapLayer = ({ orders, selectedOrder, drivers, onSelectOrder }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedOrder) {
      const bounds = L.latLngBounds([
        [selectedOrder.pickup.lat, selectedOrder.pickup.lng],
        [selectedOrder.delivery.lat, selectedOrder.delivery.lng]
      ]);
      map.fitBounds(bounds, { padding: [100, 100], maxZoom: 15, duration: 1.5, animate: true });
    } else {
         // Auto fit to all markers
         const points = [];
         if (orders) orders.forEach(o => points.push([o.pickup.lat, o.pickup.lng]));
         if (drivers) drivers
            .filter(d => d.status === 'active' || d.status === 'ongoing')
            .forEach(d => {
                let lat = d.location?.lat || d.stops?.[0]?.lat;
                let lng = d.location?.lng || d.stops?.[0]?.lng;
                if(lat && lng) points.push([lat, lng]);
            });
            
         if (points.length > 0) {
            const bounds = L.latLngBounds(points);
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13, duration: 1.5, animate: true });
         }
    }
  }, [selectedOrder, orders, drivers, map]);

  // RENDER SELECTED ORDER STATE
  if (selectedOrder) {
    return (
      <>
        {/* Connection Line */}
        <Polyline 
            positions={[
                [selectedOrder.pickup.lat, selectedOrder.pickup.lng],
                [selectedOrder.delivery.lat, selectedOrder.delivery.lng]
            ]}
            pathOptions={{ color: '#FF6300', dashArray: '10, 10', weight: 3, opacity: 0.7 }}
        />

        {/* Pickup */}
        <Marker 
          position={[selectedOrder.pickup.lat, selectedOrder.pickup.lng]} 
          icon={createSelectedOrderIcon('pickup')}
          zIndexOffset={1000}
        >
          <Popup><strong>Pickup</strong><br/>{selectedOrder.pickup.address}</Popup>
        </Marker>

        {/* Delivery */}
        <Marker 
          position={[selectedOrder.delivery.lat, selectedOrder.delivery.lng]} 
          icon={createSelectedOrderIcon('delivery')}
          zIndexOffset={900}
        >
          <Popup><strong>Delivery</strong><br/>{selectedOrder.delivery.address}</Popup>
        </Marker>

        {/* 3. Active Drivers (Visible even when focused) */}
        {drivers && drivers
          .filter(d => d.status === 'active' || d.status === 'ongoing')
          .map(driver => {
               const lat = driver.location?.lat || driver.stops?.[0]?.lat;
               const lng = driver.location?.lng || driver.stops?.[0]?.lng;
               if (!lat || !lng) return null;
               return (
                  <Marker
                      key={driver.id}
                      position={[lat, lng]}
                      icon={createDriverIcon(driver)}
                      zIndexOffset={700}
                  >
                      <Popup>
                          <div style={{textAlign: 'center'}}>
                              <strong>{driver.name}</strong><br/>
                              <span style={{fontSize: '0.85em', color: '#666'}}>{driver.vehicle || 'Truck'}</span>
                          </div>
                      </Popup>
                  </Marker>
               );
          })
        }
      </>
    );
  }

  // RENDER BASE STATE (Unassigned Orders + Drivers)
  return (
    <>
      {/* 2. Single Unassigned Orders (Vendor Specific Icons) */}
      {orders.map(order => (
        <Marker
          key={order.id}
          position={[order.pickup.lat, order.pickup.lng]}
          icon={createOrderIcon(order)}
          eventHandlers={{
            click: () => onSelectOrder && onSelectOrder(order)
          }}
        >
           <Popup maxWidth={200}>
               <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px', gap: '8px' }}>
                   {order.vendor === 'MCKESSON' && <img src={mckIcon} alt="McKesson" style={{ height: '16px' }} />}
                   {order.vendor === 'STAPLES' && <img src={staplesIcon} alt="Staples" style={{ height: '18px' }} />}
                   <strong>{order.id}</strong>
               </div>
               {order.items} Items • {order.weight}
               <div style={{marginTop: '5px', fontSize: '0.9em', color: '#666'}}>
                   Click to select
               </div>
           </Popup>
        </Marker>
      ))}

      {/* 3. Active Drivers */}
      {drivers && drivers
        .filter(d => d.status === 'active' || d.status === 'ongoing')
        .map(driver => {
             // Location fallback
             const lat = driver.location?.lat || driver.stops?.[0]?.lat;
             const lng = driver.location?.lng || driver.stops?.[0]?.lng;
             if (!lat || !lng) return null;

             return (
                <Marker
                    key={driver.id}
                    position={[lat, lng]}
                    icon={createDriverIcon(driver)}
                    zIndexOffset={700}
                >
                    <Popup>
                        <div style={{textAlign: 'center'}}>
                            <strong>{driver.name}</strong><br/>
                            <span style={{fontSize: '0.85em', color: '#666'}}>{driver.vehicle || 'Truck'}</span>
                        </div>
                    </Popup>
                </Marker>
             );
        })
      }
    </>
  );
};

export default OrderMapLayer;
