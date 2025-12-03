// Calculate the center (centroid) of a set of points
export const calculateCenter = (points) => {
  if (!points || points.length === 0) return [0, 0];

  let latSum = 0;
  let lngSum = 0;

  points.forEach(p => {
    latSum += p.lat;
    lngSum += p.lng;
  });

  return [latSum / points.length, lngSum / points.length];
};

// Calculate Convex Hull using Monotone Chain algorithm
// Returns array of [lat, lng]
export const calculateConvexHull = (points) => {
  if (!points || points.length < 3) {
    return points.map(p => [p.lat, p.lng]);
  }

  // Sort points by lat, then lng
  const sortedPoints = [...points].sort((a, b) => {
    return a.lat === b.lat ? a.lng - b.lng : a.lat - b.lat;
  });

  const crossProduct = (o, a, b) => {
    return (a.lat - o.lat) * (b.lng - o.lng) - (a.lng - o.lng) * (b.lat - o.lat);
  };

  const lower = [];
  for (let point of sortedPoints) {
    while (lower.length >= 2 && crossProduct(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
      lower.pop();
    }
    lower.push(point);
  }

  const upper = [];
  for (let i = sortedPoints.length - 1; i >= 0; i--) {
    const point = sortedPoints[i];
    while (upper.length >= 2 && crossProduct(upper[upper.length - 2], upper[upper.length - 1], point) <= 0) {
      upper.pop();
    }
    upper.push(point);
  }

  // Concatenate lower and upper to get the hull
  // Remove the last point of each list because it's repeated at the beginning of the other
  lower.pop();
  upper.pop();

  const hull = [...lower, ...upper];

  // Convert to [lat, lng] array
  return hull.map(p => [p.lat, p.lng]);
};

// Add a buffer to the polygon to make it slightly larger than the points
// Simple expansion from center
export const expandPolygon = (polygon, center, factor = 1.2) => {
    return polygon.map(point => {
        const lat = center[0] + (point[0] - center[0]) * factor;
        const lng = center[1] + (point[1] - center[1]) * factor;
        return [lat, lng];
    });
};
