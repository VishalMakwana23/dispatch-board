export const mockDrivers = [
  {
    id: "DRV1",
    name: "Darrell Steward",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "active",
    permitExpiry: "2023-11-12",
    company: "Leo Green Logistic · Edmonton",
    assignments: [
      { routeId: "123445677886544", status: "Ongoing" },
      { routeId: "23435656767676767", status: "Planned" }
    ],
    // Simulating a route in Killeen/Temple area matching the screenshot map
    routeColor: '#1A3C34', // Dark Green
    routePolyline: [
      [31.1201, -97.7423], // Start
      [31.1220, -97.7410],
      [31.1250, -97.7400],
      [31.1280, -97.7380], // Stop 2
      [31.1300, -97.7350],
      [31.1310, -97.7320],
      [31.1320, -97.7280], // Stop 3
      [31.1340, -97.7240], // Driver is here (approx)
      [31.1350, -97.7200], // Stop 4
      [31.1330, -97.7150],
      [31.1300, -97.7100], // Stop 5
      [31.1280, -97.7080],
      [31.1250, -97.7050], // Stop 6
      [31.1220, -97.7020],
      [31.1200, -97.7000], // Stop 7
    ],
    stops: [
        { 
          id: '1', 
          lat: 31.1201, 
          lng: -97.7423, 
          status: 'completed', 
          name: 'Warehouse', 
          address: '123 Main St, Killeen, TX', 
          type: 'warehouse',
          time: '10:30 AM',
          etaWindow: '10:30 AM - 12:30 PM',
          orders: 2,
          parcels: 1
        },
        { 
          id: '2', 
          lat: 31.1280, 
          lng: -97.7380, 
          status: 'completed', 
          name: 'Name', 
          address: '450 Veteran Memorial Blvd, Killeen, TX', 
          time: '10:45 AM',
          etaWindow: '10:30 AM - 12:30 PM',
          orders: 1,
          parcels: 1
        },
        { 
          id: '3', 
          lat: 31.1320, 
          lng: -97.7280, 
          status: 'completed', 
          name: 'John Doe', 
          address: '800 W Central Texas Expy, Killeen, TX', 
          time: '11:00 AM',
          etaWindow: '10:30 AM - 12:30 PM',
          orders: 1,
          parcels: 1
        },
        { 
          id: '4', 
          lat: 31.1350, 
          lng: -97.7200, 
          status: 'ongoing', 
          name: 'Name', 
          address: '200 E Rancier Ave, Killeen, TX', 
          time: '11:15 AM',
          etaWindow: '10:30 AM - 12:30 PM',
          orders: 3,
          parcels: 3,
          isDriverHere: true
        },
        { 
          id: '5', 
          lat: 31.1380, 
          lng: -97.7150, 
          status: 'pending', 
          name: 'Name', 
          address: '1001 E Veterans Memorial Blvd, Killeen, TX', 
          time: '11:30 AM',
          etaWindow: '10:30 AM - 12:30 PM',
          orders: 3,
          parcels: 5
        },
         { 
          id: '6', 
          lat: 31.1250, 
          lng: -97.7050, 
          status: 'pending', 
          name: 'Alice', 
          address: '345 South Fort Hood St, Killeen, TX', 
          time: '11:45 AM',
          etaWindow: '10:30 AM - 12:30 PM',
          orders: 1,
          parcels: 2
        },
         { 
          id: '7', 
          lat: 31.1200, 
          lng: -97.7000, 
          status: 'pending', 
          name: 'Final Destination', 
          address: '567 East Veterans Memorial Blvd', 
          time: '12:00 PM',
          etaWindow: '11:30 AM - 1:30 PM',
          orders: 4,
          parcels: 6,
          status: 'pending'
        }
    ],
    stats: {
        totalDistance: '125KM',
        startTime: '11:20 AM (Local time)',
        endTime: '-',
        duration: '-',
        loginLocation: '611-210 Royal St East Calgary',
        logoutLocation: '-',
        vehicleType: 'Sedan',
        stopCount: 7
    }
  }
];
