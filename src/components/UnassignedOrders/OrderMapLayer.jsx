import React, { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Custom Icons
const createIcon = (color, size, isLarge = false) => {
  if (isLarge) {
    // Large Orange Pin with White Icon inside
    // Using SVG for better quality
    return L.divIcon({
      className: 'custom-pin-icon',
      html: `
        <div style="position: relative; width: 50px; height: 60px;">
          <svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 0C11.1929 0 0 11.1929 0 25C0 42.5 25 60 25 60C25 60 50 42.5 50 25C50 11.1929 38.8071 0 25 0Z" fill="#FF8A34"/>
            <circle cx="25" cy="25" r="12" stroke="white" stroke-width="2.5" fill="none"/>
            <circle cx="25" cy="25" r="4" fill="white"/>
          </svg>
        </div>
      `,
      iconSize: [50, 60],
      iconAnchor: [25, 60], // Tip of the pin
      popupAnchor: [0, -60],
    });
  } else {
    // Small Dot
    return L.divIcon({
      className: 'custom-dot-icon',
      html: `<div style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      "></div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  }
};

const largePickupIcon = createIcon('#FF8A34', 50, true);
const smallDeliveryIcon = createIcon('#FF8A34', 16, false);
const defaultPickupIcon = createIcon('#0B3B32', 12, false); 

const OrderMapLayer = ({ orders, selectedOrder }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedOrder) {
      const bounds = L.latLngBounds([
        [selectedOrder.pickup.lat, selectedOrder.pickup.lng],
        [selectedOrder.delivery.lat, selectedOrder.delivery.lng]
      ]);
      map.fitBounds(bounds, { padding: [100, 100], maxZoom: 15 });
    }
  }, [selectedOrder, map]);

  if (selectedOrder) {
    return (
      <>
        {/* Selected Order Pickup */}
        <Marker 
          position={[selectedOrder.pickup.lat, selectedOrder.pickup.lng]} 
          icon={largePickupIcon}
          zIndexOffset={1000}
        >
          <Popup>
            <strong>Pickup: Order {selectedOrder.id}</strong>
          </Popup>
        </Marker>

        {/* Selected Order Delivery */}
        <Marker 
          position={[selectedOrder.delivery.lat, selectedOrder.delivery.lng]} 
          icon={smallDeliveryIcon}
        >
          <Popup>Delivery</Popup>
        </Marker>
      </>
    );
  }

  // If no order selected, show all pickups as small dots
  return (
    <>
      {orders.map(order => (
        <Marker
          key={order.id}
          position={[order.pickup.lat, order.pickup.lng]}
          icon={defaultPickupIcon}
        >
           <Popup>Order {order.id}</Popup>
        </Marker>
      ))}
    </>
  );
};

export default OrderMapLayer;
