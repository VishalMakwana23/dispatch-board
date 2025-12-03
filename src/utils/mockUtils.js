// Helper to calculate distance between two coordinates in km
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return parseFloat(d.toFixed(1));
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

// Helper to get a random color for routes
export const getRouteColor = (index) => {
  const colors = [
    '#2E7D32', // Green
    '#1976D2', // Blue
    '#ED6C02', // Orange
    '#9C27B0', // Purple
    '#D32F2F', // Red
    '#0288D1', // Light Blue
    '#7B1FA2', // Dark Purple
    '#388E3C', // Dark Green
  ];
  return colors[index % colors.length];
};

// Helper to format timestamps
export const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};
