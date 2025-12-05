export const mockDrivers = [
  // Driver 1 - Killeen Center
  {
    id: "DRV1",
    name: "Darrell Steward",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "active",
    permitExpiry: "2023-11-12",
    company: "Leo Green Logistic · Edmonton",
    assignments: [
      { routeId: "R101", status: "Ongoing" }
    ],
    routeColor: '#1A3C34', // Dark Green
    routePolyline: [], // Will be auto-generated from stops if needed, or ignored by improved MapRouteLayer
    stops: [
        { id: '1-1', lat: 31.1201, lng: -97.7423, status: 'completed', name: 'Warehouse', address: '123 Main St, Killeen, TX', type: 'warehouse', time: '08:00 AM', etaWindow: '08:00 - 09:00', orders: 2, parcels: 5 },
        { id: '1-2', lat: 31.1280, lng: -97.7380, status: 'completed', name: 'Stop 2', address: '450 Veteran Memorial Blvd', time: '08:30 AM', etaWindow: '08:15 - 09:15', orders: 1, parcels: 2 },
        { id: '1-3', lat: 31.1350, lng: -97.7200, status: 'ongoing', name: 'Stop 3', address: '200 E Rancier Ave', time: '09:00 AM', etaWindow: '08:45 - 09:45', orders: 3, parcels: 4, isDriverHere: true },
        { id: '1-4', lat: 31.1380, lng: -97.7150, status: 'pending', name: 'Stop 4', address: '1001 E Veterans Memorial Blvd', time: '09:30 AM', etaWindow: '09:15 - 10:15', orders: 2, parcels: 3 },
        { id: '1-5', lat: 31.1250, lng: -97.7050, status: 'pending', name: 'Stop 5', address: '345 South Fort Hood St', time: '10:00 AM', etaWindow: '09:45 - 10:45', orders: 1, parcels: 1 }
    ],
    stats: {
        totalDistance: '45KM',
        startTime: '08:00 AM',
        endTime: '-',
        duration: '-',
        loginLocation: '611-210 Royal St',
        logoutLocation: '-',
        vehicleType: 'Sedan',
        stopCount: 5
    }
  },
  // Driver 2 - Harker Heights
  {
    id: "DRV2",
    name: "Wade Warren",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    status: "active",
    permitExpiry: "2023-11-12",
    company: "Swift Transport · Dallas",
    assignments: [
      { routeId: "R102", status: "Ongoing" }
    ],
    routeColor: '#E91E63', // Pink
    stops: [
        { id: '2-1', lat: 31.0835, lng: -97.6596, status: 'completed', name: 'Warehouse B', address: '789 Industrial Blvd', type: 'warehouse', time: '07:30 AM', etaWindow: '07:30 - 08:30', orders: 10, parcels: 20 },
        { id: '2-2', lat: 31.0900, lng: -97.6650, status: 'completed', name: 'Stop 2', address: '201 E Central Texas Expy', time: '08:00 AM', etaWindow: '07:45 - 08:45', orders: 2, parcels: 3 },
        { id: '2-3', lat: 31.0950, lng: -97.6700, status: 'completed', name: 'Stop 3', address: '300 Indian Trail', time: '08:30 AM', etaWindow: '08:15 - 09:15', orders: 1, parcels: 1 },
        { id: '2-4', lat: 31.1000, lng: -97.6750, status: 'ongoing', name: 'Stop 4', address: '400 FM 2410 Rd', time: '09:00 AM', etaWindow: '08:45 - 09:45', orders: 4, parcels: 5, isDriverHere: true },
        { id: '2-5', lat: 31.1050, lng: -97.6800, status: 'pending', name: 'Stop 5', address: '500 Knights Way', time: '09:30 AM', etaWindow: '09:15 - 10:15', orders: 2, parcels: 2 },
        { id: '2-6', lat: 31.1100, lng: -97.6850, status: 'pending', name: 'Stop 6', address: '600 E FM 2410 Rd', time: '10:00 AM', etaWindow: '09:45 - 10:45', orders: 3, parcels: 4 }
    ],
    stats: {
        totalDistance: '62KM',
        startTime: '07:30 AM',
        endTime: '-',
        duration: '-',
        loginLocation: 'Depot B',
        logoutLocation: '-',
        vehicleType: 'Van',
        stopCount: 6
    }
  },
  // Driver 3 - Copperas Cove
  {
    id: "DRV3",
    name: "Esther Howard",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    status: "inactive",
    permitExpiry: "2023-09-11",
    company: "Fast Track · Austin",
    assignments: [],
    routeColor: '#9C27B0', // Purple
    stops: [],
    stats: {
        totalDistance: '0KM',
        startTime: '-',
        endTime: '-',
        duration: '-',
        loginLocation: '-',
        logoutLocation: '-',
        vehicleType: 'Truck',
        stopCount: 0
    }
  },
  // Driver 4 - Fort Hood
  {
    id: "DRV4",
    name: "Cameron Williamson",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    status: "active",
    permitExpiry: "2023-11-12",
    company: "Military Logistics · Killeen",
    assignments: [
      { routeId: "R104", status: "Ongoing" }
    ],
    routeColor: '#3F51B5', // Indigo
    stops: [
        { id: '4-1', lat: 31.1390, lng: -97.7680, status: 'completed', name: 'Base Entrance', address: 'Main Gate', type: 'warehouse', time: '06:00 AM', etaWindow: '06:00 - 07:00', orders: 0, parcels: 50 },
        { id: '4-2', lat: 31.1450, lng: -97.7750, status: 'ongoing', name: 'Barracks 1', address: 'Bldg 101', time: '07:00 AM', etaWindow: '06:45 - 07:45', orders: 15, parcels: 20, isDriverHere: true },
        { id: '4-3', lat: 31.1500, lng: -97.7800, status: 'pending', name: 'Barracks 2', address: 'Bldg 102', time: '08:00 AM', etaWindow: '07:45 - 08:45', orders: 10, parcels: 15 },
        { id: '4-4', lat: 31.1550, lng: -97.7850, status: 'pending', name: 'HQ', address: 'Bldg 200', time: '09:00 AM', etaWindow: '08:45 - 09:45', orders: 5, parcels: 5 }
    ],
    stats: {
        totalDistance: '20KM',
        startTime: '06:00 AM',
        endTime: '-',
        duration: '-',
        loginLocation: 'Main Gate',
        logoutLocation: '-',
        vehicleType: 'Armored Truck',
        stopCount: 4
    }
  },
  // Driver 5 - Nolanville
  {
    id: "DRV5",
    name: "Brooklyn Simmons",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    status: "active",
    permitExpiry: "2023-11-12",
    company: "Valley Services · Temple",
    assignments: [
      { routeId: "R105", status: "Ongoing" }
    ],
    routeColor: '#00BCD4', // Cyan
    stops: [
        { id: '5-1', lat: 31.0910, lng: -97.6050, status: 'completed', name: 'Depot', address: '100 Main St, Nolanville', type: 'warehouse', time: '08:15 AM', etaWindow: '08:15 - 09:15', orders: 1, parcels: 10 },
        { id: '5-2', lat: 31.0950, lng: -97.6100, status: 'completed', name: 'Stop 2', address: '200 Ave H', time: '08:45 AM', etaWindow: '08:30 - 09:30', orders: 1, parcels: 1 },
        { id: '5-3', lat: 31.0980, lng: -97.6150, status: 'ongoing', name: 'Stop 3', address: '300 Old Nolanville Rd', time: '09:15 AM', etaWindow: '09:00 - 10:00', orders: 2, parcels: 2, isDriverHere: true },
        { id: '5-4', lat: 31.1020, lng: -97.6200, status: 'pending', name: 'Stop 4', address: '400 Wildwood Dr', time: '09:45 AM', etaWindow: '09:30 - 10:30', orders: 1, parcels: 1 }
    ],
    stats: {
        totalDistance: '35KM',
        startTime: '08:15 AM',
        endTime: '-',
        duration: '-',
        loginLocation: 'Nolanville',
        logoutLocation: '-',
        vehicleType: 'Car',
        stopCount: 4
    }
  },
  // Driver 6 - Belton
  {
    id: "DRV6",
    name: "Leslie Alexander",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    status: "active",
    permitExpiry: "2023-11-12",
    company: "Lake Transport · Belton",
    assignments: [ { routeId: "R106", status: "Ongoing" } ],
    routeColor: '#4CAF50', // Green
    stops: [
       { id: '6-1', lat: 31.0560, lng: -97.4640, status: 'completed', name: 'Warehouse', address: 'Belton Industrial Park', type: 'warehouse', time: '9:00 AM', etaWindow: '9:00-10:00', orders: 5, parcels: 5},
       { id: '6-2', lat: 31.0600, lng: -97.4700, status: 'completed', name: 'Stop 2', address: 'N Main St', time: '9:30 AM', etaWindow: '9:15-10:15', orders: 2, parcels: 2},
       { id: '6-3', lat: 31.0650, lng: -97.4750, status: 'completed', name: 'Stop 3', address: 'E 6th Ave', time: '10:00 AM', etaWindow: '9:45-10:45', orders: 1, parcels: 1},
        { id: '6-4', lat: 31.0700, lng: -97.4800, status: 'ongoing', name: 'Stop 4', address: 'Sparta Rd', time: '10:30 AM', etaWindow: '10:15-11:15', orders: 3, parcels: 3, isDriverHere: true},
        { id: '6-5', lat: 31.0750, lng: -97.4850, status: 'pending', name: 'Stop 5', address: 'Lake Rd', time: '11:00 AM', etaWindow: '10:45-11:45', orders: 2, parcels: 2},
        { id: '6-6', lat: 31.0800, lng: -97.4900, status: 'pending', name: 'Stop 6', address: 'Park Dr', time: '11:30 AM', etaWindow: '11:15-12:15', orders: 1, parcels: 1}
    ],
    stats: { totalDistance: '50KM', startTime: '09:00 AM', endTime: '-', duration: '-', loginLocation: 'Belton', logoutLocation: '-', vehicleType: 'Van', stopCount: 6 }
  },
  // Driver 7 - Temple South
  {
    id: "DRV7",
    name: "Jenny Wilson",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    status: "active",
    permitExpiry: "2023-11-12",
    company: "Medical Courier · Temple",
    assignments: [ { routeId: "R107", status: "Ongoing" } ],
    routeColor: '#FF9800', // Orange
    stops: [
        { id: '7-1', lat: 31.0850, lng: -97.3500, status: 'completed', name: 'Hospital', address: 'Scott & White', type: 'warehouse', time: '08:00 AM', etaWindow: '08:00-09:00', orders: 10, parcels: 20},
        { id: '7-2', lat: 31.0900, lng: -97.3600, status: 'ongoing', name: 'Clinic A', address: 'SW H K Dodgen Loop', time: '08:45 AM', etaWindow: '08:30-09:30', orders: 2, parcels: 5, isDriverHere: true},
        { id: '7-3', lat: 31.0950, lng: -97.3700, status: 'pending', name: 'Pharmacy', address: 'S 31st St', time: '09:30 AM', etaWindow: '09:15-10:15', orders: 3, parcels: 5}
    ],
    stats: { totalDistance: '25KM', startTime: '08:00 AM', endTime: '-', duration: '-', loginLocation: 'Hospital', logoutLocation: '-', vehicleType: 'S UV', stopCount: 3 }
  },
  // Driver 8 - Temple North
  {
    id: "DRV8",
    name: "Guy Hawkins",
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    status: "unavailable",
    permitExpiry: "2023-11-12",
    company: "Reliable Delivery · Temple",
     assignments: [ { routeId: "R108", status: "Ongoing" } ],
    routeColor: '#F44336', // Red
    stops: [
        { id: '8-1', lat: 31.1100, lng: -97.3400, status: 'completed', name: 'Warehouse', address: 'N General Bruce Dr', type: 'warehouse', time: '07:00 AM', etaWindow: '07:00-08:00', orders: 5, parcels: 10},
        { id: '8-2', lat: 31.1150, lng: -97.3450, status: 'ongoing', name: 'Stop 2', address: 'W Adams Ave', time: '07:45 AM', etaWindow: '07:30-08:30', orders: 1, parcels: 1, isDriverHere: true},
        { id: '8-3', lat: 31.1200, lng: -97.3500, status: 'pending', name: 'Stop 3', address: 'Airport Rd', time: '08:30 AM', etaWindow: '08:15-09:15',  orders: 2, parcels: 2},
        { id: '8-4', lat: 31.1250, lng: -97.3550, status: 'pending', name: 'Stop 4', address: 'H K Dodgen Loop', time: '09:15 AM', etaWindow: '09:00-10:00', orders: 1, parcels: 1}
    ],
    stats: { totalDistance: '40KM', startTime: '07:00 AM', endTime: '-', duration: '-', loginLocation: 'North Temple', logoutLocation: '-', vehicleType: 'Truck', stopCount: 4 }
  },
  // Driver 9 - Salado
  {
    id: "DRV9",
    name: "Robert Fox",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    status: "active",
    permitExpiry: "2023-11-12",
    company: "Rural Route · Salado",
    assignments: [ { routeId: "R109", status: "Ongoing" } ],
    routeColor: '#795548', // Brown
    stops: [
         { id: '9-1', lat: 30.9500, lng: -97.5300, status: 'completed', name: 'Depot', address: 'Main St Salado', type: 'warehouse', time: '10:00 AM', etaWindow: '10:00-11:00', orders: 3, parcels: 3},
         { id: '9-2', lat: 30.9550, lng: -97.5350, status: 'ongoing', name: 'Stop 1', address: 'Royal St', time: '10:30 AM', etaWindow: '10:15-11:15', orders: 1, parcels: 1, isDriverHere: true},
         { id: '9-3', lat: 30.9600, lng: -97.5400, status: 'pending', name: 'Stop 2', address: 'Salado Plaza Dr', time: '11:00 AM', etaWindow: '10:45-11:45', orders: 1, parcels: 1}
    ],
    stats: { totalDistance: '15KM', startTime: '10:00 AM', endTime: '-', duration: '-', loginLocation: 'Salado', logoutLocation: '-', vehicleType: 'Pickup', stopCount: 3 }
  },
  // Driver 10 - Killeen South
  {
    id: "DRV10",
    name: "Jacob Jones",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    status: "active",
    permitExpiry: "2023-11-12",
    company: "Z Express · Killeen",
    assignments: [ { routeId: "R110", status: "Ongoing" } ],
    routeColor: '#607D8B', // Blue Grey
    stops: [
        { id: '10-1', lat: 31.0800, lng: -97.7200, status: 'completed', name: 'Warehouse', address: 'Stan Schlueter Loop', type: 'warehouse', time: '09:00 AM', etaWindow: '09:00-10:00', orders: 4, parcels: 8},
        { id: '10-2', lat: 31.0850, lng: -97.7250, status: 'completed', name: 'Stop 2', address: 'Bunny Trail', time: '09:45 AM', etaWindow: '09:30-10:30', orders: 2, parcels: 3},
        { id: '10-3', lat: 31.0900, lng: -97.7300, status: 'ongoing', name: 'Stop 3', address: 'Clear Creek Rd', time: '10:30 AM', etaWindow: '10:15-11:15', orders: 1, parcels: 1, isDriverHere: true},
        { id: '10-4', lat: 31.0950, lng: -97.7350, status: 'pending', name: 'Stop 4', address: 'W Elms Rd', time: '11:15 AM', etaWindow: '11:00-12:00', orders: 2, parcels: 2},
        { id: '10-5', lat: 31.1000, lng: -97.7400, status: 'pending', name: 'Stop 5', address: 'Willow Springs Rd', time: '12:00 PM', etaWindow: '11:45-12:45', orders: 1, parcels: 1}
    ],
    stats: { totalDistance: '55KM', startTime: '09:00 AM', endTime: '-', duration: '-', loginLocation: 'Killeen South', logoutLocation: '-', vehicleType: 'Sedan', stopCount: 5 }
  },
  // Driver 11 - Kempner
  {
    id: "DRV11",
    name: "Cody Fisher",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    status: "inactive",
    permitExpiry: "2023-11-12",
    company: "West Side Logistics · Kempner",
    assignments: [],
    routeColor: '#9E9E9E', // Grey
    stops: [],
    stats: { totalDistance: '0KM', startTime: '-', endTime: '-', duration: '-', loginLocation: '-', logoutLocation: '-', vehicleType: 'Van', stopCount: 0 }
  },
   // Driver 12 - Florence
  {
    id: "DRV12",
    name: "Kristin Watson",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    status: "active",
    permitExpiry: "2023-11-12",
    company: "Southern Route · Florence",
    assignments: [ { routeId: "R112", status: "Ongoing" } ],
    routeColor: '#CDDC39', // Lime
    stops: [
        { id: '12-1', lat: 30.9000, lng: -97.7900, status: 'completed', name: 'Warehouse', address: 'Main St Florence', type: 'warehouse', time: '08:30 AM', etaWindow: '08:30-09:30', orders: 2, parcels: 2},
        { id: '12-2', lat: 30.9050, lng: -97.7950, status: 'ongoing', name: 'Stop 1', address: 'FM 487', time: '09:00 AM', etaWindow: '08:45-09:45', orders: 1, parcels: 1, isDriverHere: true}
    ],
    stats: { totalDistance: '10KM', startTime: '08:30 AM', endTime: '-', duration: '-', loginLocation: 'Florence', logoutLocation: '-', vehicleType: 'Pickup', stopCount: 2 }
  },
  // Driver 13 - Jarrell
  {
    id: "DRV13",
    name: "Darlene Robertson",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    status: "active",
    permitExpiry: "2023-11-12",
    company: "I-35 Express · Jarrell",
    assignments: [ { routeId: "R113", status: "Ongoing" } ],
    routeColor: '#03A9F4', // Light Blue
    stops: [
         { id: '13-1', lat: 30.8500, lng: -97.6000, status: 'completed', name: 'Hub', address: 'I-35 Frontage Rd', type: 'warehouse', time: '07:30 AM', etaWindow: '07:30-08:30', orders: 8, parcels: 15},
         { id: '13-2', lat: 30.8550, lng: -97.6050, status: 'completed', name: 'Stop 1', address: 'Ronald Reagan Blvd', time: '08:15 AM', etaWindow: '08:00-09:00', orders: 2, parcels: 4},
         { id: '13-3', lat: 30.8600, lng: -97.6100, status: 'ongoing', name: 'Stop 2', address: 'CR 305', time: '09:00 AM', etaWindow: '08:45-09:45', orders: 1, parcels: 1, isDriverHere: true},
         { id: '13-4', lat: 30.8650, lng: -97.6150, status: 'pending', name: 'Stop 3', address: 'CR 307', time: '09:45 AM', etaWindow: '09:30-10:30', orders: 2, parcels: 2}
    ],
    stats: { totalDistance: '30KM', startTime: '07:30 AM', endTime: '-', duration: '-', loginLocation: 'Jarrell', logoutLocation: '-', vehicleType: 'Box Truck', stopCount: 4 }
  },
  // Driver 14 - Little River-Academy
  {
    id: "DRV14",
    name: "Bessie Cooper",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    status: "unavailable",
    permitExpiry: "2023-02-01",
    company: "East Bell · Academy",
    assignments: [ { routeId: "R114", status: "Ongoing" } ],
    routeColor: '#FFC107', // Amber
    stops: [
         { id: '14-1', lat: 30.9800, lng: -97.3500, status: 'completed', name: 'Start', address: 'Hwy 95', type: 'warehouse', time: '08:00 AM', etaWindow: '08:00-09:00', orders: 1, parcels: 1},
         { id: '14-2', lat: 30.9850, lng: -97.3550, status: 'ongoing', name: 'Stop 1', address: 'Main St Academy', time: '08:30 AM', etaWindow: '08:15-09:15', orders: 1, parcels: 2, isDriverHere: true}
    ],
    stats: { totalDistance: '12KM', startTime: '08:00 AM', endTime: '-', duration: '-', loginLocation: 'Academy', logoutLocation: '-', vehicleType: 'Car', stopCount: 2 }
  },

];
