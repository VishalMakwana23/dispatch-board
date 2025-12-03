import React, { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Custom Icons
const createIcon = (type, count = 0) => {
  if (type === 'cluster') {
    return L.divIcon({
      className: 'custom-cluster-icon',
      html: `<div style="
        background-color: #FF6300;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-family: Montserrat;
        font-size: 16px;
        border: 2px solid white;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      ">${count}</div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  } else if (type === 'pickup-large') {
     // Large Orange Pin with White Icon inside (Selected)
    return L.divIcon({
      className: 'custom-pin-icon',
      html: `
        <div style="position: relative; width: 50px; height: 60px;">
          <svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 0C11.1929 0 0 11.1929 0 25C0 42.5 25 60 25 60C25 60 50 42.5 50 25C50 11.1929 38.8071 0 25 0Z" fill="#FF6300"/>
            <circle cx="25" cy="25" r="12" stroke="white" stroke-width="2.5" fill="none"/>
            <circle cx="25" cy="25" r="4" fill="white"/>
          </svg>
        </div>
      `,
      iconSize: [50, 60],
      iconAnchor: [25, 60],
      popupAnchor: [0, -60],
    });
  } else if (type === 'pickup-single') {
      // Black Pin for single unselected orders
      return L.divIcon({
          className: 'custom-pin-single',
          html: `
            <div style="position: relative; width: 30px; height: 36px;">
              <svg width="30" height="36" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 0C6.71573 0 0 6.71573 0 15C0 25.5 15 36 15 36C15 36 30 25.5 30 15C30 6.71573 23.2843 0 15 0Z" fill="#000000"/>
                <path d="M15 8C11.134 8 8 11.134 8 15C8 18.866 11.134 22 15 22C18.866 22 22 18.866 22 15C22 11.134 18.866 8 15 8ZM15 20C12.2386 20 10 17.7614 10 15C10 12.2386 12.2386 10 15 10C17.7614 10 20 12.2386 20 15C20 17.7614 17.7614 20 15 20Z" fill="white"/>
                <rect x="12" y="13" width="6" height="4" fill="white"/> 
                 <!-- Simple house/building shape approximation -->
                 <path d="M12 14L15 11L18 14V18H12V14Z" fill="white"/>
              </svg>
            </div>
          `,
          iconSize: [30, 36],
          iconAnchor: [15, 36],
          popupAnchor: [0, -36],
        });
  } else {
    // Small Delivery Dot
    return L.divIcon({
      className: 'custom-dot-icon',
      html: `<div style="
        background-color: #FF6300;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      "></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
  }
};

const OrderMapLayer = ({ orders, clusters, selectedOrder }) => {
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
          icon={createIcon('pickup-large')}
          zIndexOffset={1000}
        >
          <Popup>
            <strong>Pickup: Order {selectedOrder.id}</strong>
          </Popup>
        </Marker>

        {/* Selected Order Delivery */}
        <Marker 
          position={[selectedOrder.delivery.lat, selectedOrder.delivery.lng]} 
          icon={createIcon('delivery')}
        >
          <Popup>Delivery</Popup>
        </Marker>
      </>
    );
  }

  return (
    <>
      {/* Clusters */}
      {clusters && clusters.map(cluster => (
        <Marker
            key={cluster.id}
            position={[cluster.lat, cluster.lng]}
            icon={createIcon('cluster', cluster.count)}
            zIndexOffset={900}
        >
             <Popup>{cluster.count} Orders in this area</Popup>
        </Marker>
      ))}

      {/* Single Orders (Mocked as scattered points if not in clusters, or just the orders list) */}
      {/* In a real app, we'd filter out orders that are in clusters. 
          For this mock, we'll just show the orders list as single pins 
          assuming they are the 'unclustered' ones or just explicitly show them. 
          The user wants "exact map like 1st image", which shows both clusters and single pins.
      */}
      {orders.map(order => (
        <Marker
          key={order.id}
          position={[order.pickup.lat, order.pickup.lng]}
          icon={createIcon('pickup-single')}
        >
           <Popup>Order {order.id}</Popup>
        </Marker>
      ))}
    </>
  );
};

export default OrderMapLayer;
