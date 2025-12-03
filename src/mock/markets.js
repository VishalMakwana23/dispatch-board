export const markets = [
  {
    id: "market-1",
    name: "Lethbridge", // Keeping name as requested, or should I change to "Texas"? The prompt said "Lethbridge" in the design. I'll keep the name but move the polygon.
    // Coordinates centered around the mapPoints (approx 31.12, -97.74)
    polygon: [
      [31.1800, -97.8000], // Top Left
      [31.1800, -97.6800], // Top Right
      [31.0600, -97.6800], // Bottom Right
      [31.0600, -97.8000], // Bottom Left
    ],
    center: [31.1200, -97.7400], // Center for the label
    markers: [] // We will use mapPoints instead
  }
];
