export const mockDrivers = [
  {
    id: "DRV1",
    name: "Darrell Steward",
    avatar: "https://i.pravatar.cc/150?u=DRV1",
    status: "active",
    permitExpiry: "2023-12-01",
    company: "Leo Green Logistic · Edmonton",
    assignments: [
      { routeId: "CAZA12345667889654", status: "Ongoing" },
      { routeId: "23435656767676767", status: "Planned" }
    ],
    // Simulating a route in Killeen/Temple area matching the screenshot map
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
        { id: 1, lat: 31.1201, lng: -97.7423, status: 'completed', address: 'Start Point' },
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
    avatar: "https://i.pravatar.cc/150?u=DRV2",
    status: "active",
    permitExpiry: "2023-10-30",
    company: "Leo Green Logistic · Edmonton",
    assignments: [
      { routeId: "23435656767676767", status: "Ongoing" },
      { routeId: "23435656767676767", status: "Planned" },
      { routeId: "23435656767676767", status: "Planned" }
    ],
    routePolyline: [
        [31.1000, -97.7500],
        [31.1050, -97.7450],
        [31.1100, -97.7400]
    ],
    stops: [],
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
    avatar: "https://i.pravatar.cc/150?u=DRV3",
    status: "active",
    permitExpiry: "2023-11-15",
    company: "Leo Green Logistic · Edmonton",
    assignments: [
      { routeId: "23435656767676767", status: "Ongoing" },
      { routeId: "23435656767676767", status: "Planned" },
      { routeId: "23435656767676767", status: "Planned" }
    ],
    routePolyline: [],
    stops: [],
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
    avatar: "https://i.pravatar.cc/150?u=DRV4",
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
    avatar: "https://i.pravatar.cc/150?u=DRV5",
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
