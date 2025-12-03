export const mockDrivers = [
  {
    id: "DRV1",
    name: "Darrell Steward",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "active",
    permitExpiry: "2023-11-12",
    company: "Leo Green Logistic · Edmonton",
    assignments: [
      { routeId: "CAZA12345667889654", status: "Ongoing" },
      { routeId: "23435656767676767", status: "Planned" }
    ],
    // Simulating a route in Killeen/Temple area matching the screenshot map
    routeColor: '#1A3C34', // Dark Green
    routePolyline: [
      [31.1201, -97.7423],
      [31.1220, -97.7410],
      [31.1250, -97.7400],
      [31.1280, -97.7380],
      [31.1300, -97.7350],
      [31.1310, -97.7320],
      [31.1320, -97.7280],
      [31.1340, -97.7240],
      [31.1350, -97.7200],
      [31.1330, -97.7150],
      [31.1300, -97.7100],
      [31.1280, -97.7080],
      [31.1250, -97.7050],
      [31.1220, -97.7020],
      [31.1200, -97.7000],
      [31.1180, -97.6980],
      [31.1150, -97.6950],
      [31.1120, -97.6920],
      [31.1100, -97.6900]
    ],
    stops: [
        { id: 1, lat: 31.1201, lng: -97.7423, status: 'completed', address: 'Start Point', type: 'warehouse' },
        { id: 2, lat: 31.1300, lng: -97.7350, status: 'warning', address: '123 Main St' },
        { id: 3, lat: 31.1350, lng: -97.7200, status: 'failed', address: '456 Oak Ave' },
        { id: 4, lat: 31.1100, lng: -97.6900, status: 'unattempted', address: '789 Pine Ln' }
    ],
    stats: {
        totalDistance: '125KM',
        startTime: '11:20 AM (Local time)',
        endTime: '-',
        duration: '-',
        loginLocation: '611-210 Royal St East Calgary',
        logoutLocation: '-',
        vehicleType: 'Sedan',
        stopCount: 23
    }
  },
  {
    id: "DRV2",
    name: "Jackson SB",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    status: "active",
    permitExpiry: "2023-11-11",
    company: "Leo Green Logistic · Edmonton",
    assignments: [
      { routeId: "23435656767676767", status: "Ongoing" },
      { routeId: "23435656767676767", status: "Planned" },
      { routeId: "23435656767676767", status: "Planned" }
    ],
    routeColor: '#1976D2', // Blue
    routePolyline: [
        [31.0850, -97.6600],
        [31.0880, -97.6580],
        [31.0920, -97.6550],
        [31.0950, -97.6520],
        [31.0980, -97.6480],
        [31.1020, -97.6440],
        [31.1050, -97.6400]
    ],
    stops: [
        { id: 5, lat: 31.0850, lng: -97.6600, status: 'completed', address: 'Warehouse', type: 'warehouse' },
        { id: 6, lat: 31.0920, lng: -97.6550, status: 'completed', address: '300 Indian Trail' },
        { id: 7, lat: 31.0980, lng: -97.6480, status: 'ongoing', address: "600 Miller's Crossing" },
        { id: 8, lat: 31.1050, lng: -97.6400, status: 'pending', address: '900 FM 2410 Rd' }
    ],
    stats: {
        totalDistance: '80KM',
        startTime: '09:00 AM',
        endTime: '-',
        duration: '-',
        loginLocation: 'Edmonton HQ',
        logoutLocation: '-',
        vehicleType: 'Van',
        stopCount: 15
    }
  },
  {
    id: "DRV3",
    name: "Aya Star",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    status: "active",
    permitExpiry: "2023-11-15",
    company: "Leo Green Logistic · Edmonton",
    assignments: [
      { routeId: "23435656767676767", status: "Ongoing" },
      { routeId: "23435656767676767", status: "Planned" },
      { routeId: "23435656767676767", status: "Planned" }
    ],
    routeColor: '#9C27B0', // Purple
    routePolyline: [
        [31.1200, -97.9000],
        [31.1220, -97.9050],
        [31.1250, -97.9100],
        [31.1280, -97.9150],
        [31.1300, -97.9200]
    ],
    stops: [
        { id: 9, lat: 31.1200, lng: -97.9000, status: 'completed', address: 'Depot', type: 'warehouse' },
        { id: 10, lat: 31.1250, lng: -97.9100, status: 'issue', address: 'S 1st St' },
        { id: 11, lat: 31.1300, lng: -97.9200, status: 'pending', address: 'N Main St' }
    ],
    stats: {
        totalDistance: '100KM',
        startTime: '10:00 AM',
        endTime: '-',
        duration: '-',
        loginLocation: 'Calgary Hub',
        logoutLocation: '-',
        vehicleType: 'Car',
        stopCount: 18
    }
  },
  {
    id: "DRV4",
    name: "Claire KP",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    status: "inactive",
    permitExpiry: "Missing TDC",
    company: "Leo Green Logistic · Edmonton",
    assignments: [
      { routeId: "23435656767676767", status: "Ongoing" },
      { routeId: "23435656767676767", status: "Planned" },
      { routeId: "23435656767676767", status: "Planned" }
    ],
    routePolyline: [],
    stops: [],
    stats: {
        totalDistance: '0KM',
        startTime: '-',
        endTime: '-',
        duration: '-',
        loginLocation: '-',
        logoutLocation: '-',
        vehicleType: 'Sedan',
        stopCount: 0
    }
  },
  {
    id: "DRV5",
    name: "Larine GH",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    status: "unavailable",
    permitExpiry: "Missing TDC",
    company: "Leo Green Logistic · Edmonton",
    assignments: [],
    routePolyline: [],
    stops: [],
    stats: {
        totalDistance: '0KM',
        startTime: '-',
        endTime: '-',
        duration: '-',
        loginLocation: '-',
        logoutLocation: '-',
        vehicleType: 'Van',
        stopCount: 0
    }
  }
];
