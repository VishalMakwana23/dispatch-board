import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import MapRouteLayer from '../MapRouteLayer'; // Reuse existing component

const RoutePreviewLayer = ({ route, order }) => {
  const map = useMap();

  useEffect(() => {
    if (route && route.stops && route.stops.length > 0) {
      // Calculate bounds for the entire route including new stops
      const points = route.stops.map(s => [s.lat, s.lng]);
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, animate: true, duration: 1 });
    }
  }, [map, route]);

  if (!route) return null;

  return (
    <>
      <MapRouteLayer route={route} />
    </>
  );
};

export default RoutePreviewLayer;
