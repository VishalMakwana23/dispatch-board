import { calculateDistance } from '../utils/mockUtils';

// Central coordinates for Killeen, TX area
const KILLEEN_CENTER = { lat: 31.1171, lng: -97.7278 };

// Realistic stops in Killeen/Harker Heights area
const stopsData = [
  // Route 1 Stops (Killeen North)
  { id: 'st-1-1', lat: 31.1350, lng: -97.7650, address: '123 Main St, Killeen, TX', type: 'warehouse', name: 'Warehouse' },
  { id: 'st-1-2', lat: 31.1420, lng: -97.7580, address: '450 Veteran Memorial Blvd, Killeen, TX', type: 'delivery', name: 'Name' },
  { id: 'st-1-3', lat: 31.1380, lng: -97.7450, address: '800 W Central Texas Expy, Killeen, TX', type: 'delivery', name: 'John Doe' },
  { id: 'st-1-4', lat: 31.1300, lng: -97.7400, address: '200 E Rancier Ave, Killeen, TX', type: 'pickup', name: 'Name' },
  { id: 'st-1-5', lat: 31.1250, lng: -97.7350, address: '1001 E Veterans Memorial Blvd, Killeen, TX', type: 'delivery', name: 'Name' },
  
  // Route 2 Stops (Harker Heights)
  { id: 'st-2-1', lat: 31.0850, lng: -97.6600, address: '201 E Central Texas Expy, Harker Heights, TX', type: 'warehouse', name: 'Warehouse' },
  { id: 'st-2-2', lat: 31.0920, lng: -97.6550, address: '300 Indian Trail, Harker Heights, TX', type: 'delivery', name: 'Name' },
  { id: 'st-2-3', lat: 31.0980, lng: -97.6480, address: "600 Miller's Crossing, Harker Heights, TX", type: 'delivery', name: 'John Doe' },
  { id: 'st-2-4', lat: 31.1050, lng: -97.6400, address: '900 FM 2410 Rd, Harker Heights, TX', type: 'delivery', name: 'Name' },
  
  // Route 3 Stops (Fort Hood / West Killeen)
  { id: 'st-3-1', lat: 31.1300, lng: -97.7800, address: 'T.J. Mills Blvd, Fort Hood, TX', type: 'warehouse', name: 'Warehouse' },
  { id: 'st-3-2', lat: 31.1250, lng: -97.7900, address: '761st Tank Battalion Ave, Fort Hood, TX', type: 'delivery', name: 'Name' },
  { id: 'st-3-3', lat: 31.1150, lng: -97.7950, address: 'Clarke Rd, Fort Hood, TX', type: 'delivery', name: 'Name' },
  { id: 'st-3-4', lat: 31.1050, lng: -97.7850, address: 'Clear Creek Rd, Killeen, TX', type: 'pickup', name: 'Name' },
  
  // Route 4 Stops (South Killeen)
  { id: 'st-4-1', lat: 31.0900, lng: -97.7300, address: 'Stan Schlueter Loop, Killeen, TX', type: 'warehouse', name: 'Warehouse' },
  { id: 'st-4-2', lat: 31.0850, lng: -97.7200, address: 'Bunny Trail, Killeen, TX', type: 'delivery', name: 'Name' },
  { id: 'st-4-3', lat: 31.0750, lng: -97.7100, address: 'Stagecoach Rd, Killeen, TX', type: 'delivery', name: 'Name' },
  { id: 'st-4-4', lat: 31.0650, lng: -97.7000, address: 'Trimmier Rd, Killeen, TX', type: 'delivery', name: 'Name' },
];

export const killeenData = {
  routes: [
    {
      id: '123445677886544',
      type: 'Final-Mile',
      status: 'Ongoing',
      driver: {
        name: 'Johnson Doe',
        company: 'Leo Green Logistic - Edmonton',
        id: 'dr-1',
        avatar: 'https://i.pravatar.cc/150?u=johnson',
      },
      stats: {
        stops: 12,
        orders: 12,
        distance: '112 km',
        completed: 3,
        remaining: 9,
      },
      color: '#1976D2', // Blue
      stops: stopsData.slice(0, 5).map((s, i) => ({
        ...s,
        status: i < 2 ? 'completed' : (i === 2 ? 'ongoing' : 'pending'),
        window: '10:30 AM - 12:30 PM',
        parcels: Math.floor(Math.random() * 5) + 1,
        customer: `Customer ${s.id}`
      }))
    },
    {
      id: '890283847784833',
      type: 'Mid-Mile',
      status: 'Ongoing',
      alert: 'Risk of Delay',
      riskOfDelay: true, // Added flag
      missingPod: true, // Added flag for both chips
      driver: {
        name: 'Ariya SJ',
        company: 'Leo Green Logistic - Edmonton',
        id: 'dr-2',
        avatar: 'https://i.pravatar.cc/150?u=ariya',
      },
      stats: {
        stops: 6,
        orders: 6,
        distance: '123 km',
        completed: 2,
        remaining: 4,
      },
      color: '#2E7D32', // Green
      stops: stopsData.slice(5, 9).map((s, i) => ({
        ...s,
        status: i < 1 ? 'completed' : (i === 1 ? 'ongoing' : 'pending'),
        window: '12:30 PM - 02:30 PM',
        parcels: Math.floor(Math.random() * 10) + 1,
        customer: `Customer ${s.id}`
      }))
    },
    {
      id: 'QO3W19103336544',
      type: 'Final-Mile',
      status: 'Status Coded',
      alert: 'Missing POD',
      missingPod: true, // Added flag
      statusCoded: true, // Added flag
      driver: {
        name: 'Mike Smith',
        company: 'Leo Green Logistic - Edmonton',
        id: 'dr-3',
        avatar: 'https://i.pravatar.cc/150?u=mike',
      },
      stats: {
        stops: 7,
        orders: 7,
        distance: '234 km',
        completed: 5,
        remaining: 2,
      },
      color: '#ED6C02', // Orange
      stops: stopsData.slice(9, 13).map((s, i) => ({
        ...s,
        status: i < 3 ? 'completed' : 'pending',
        window: '02:00 PM - 04:00 PM',
        parcels: Math.floor(Math.random() * 3) + 1,
        customer: `Customer ${s.id}`
      }))
    },
    {
      id: 'QOAIRFF677886544',
      type: 'Final-Mile',
      status: 'Status Coded',
      alert: 'Missing POD',
      missingPod: true, // Added flag
      statusCoded: true, // Added flag
      driver: {
        name: 'Ada SJ',
        company: 'Leo Green Logistic - Edmonton',
        id: 'dr-4',
        avatar: 'https://i.pravatar.cc/150?u=ada',
      },
      stats: {
        stops: 12,
        orders: 12,
        distance: '234 km',
        completed: 4,
        remaining: 8,
      },
      color: '#9C27B0', // Purple
      stops: stopsData.slice(13, 17).map((s, i) => ({
        ...s,
        status: 'pending',
        window: '08:00 AM - 10:00 AM',
        parcels: Math.floor(Math.random() * 8) + 1,
        customer: `Customer ${s.id}`
      }))
    }
  ],
  unassigned: [
    {
      id: 'ua-1',
      lat: 31.1100,
      lng: -97.7200,
      address: 'Unassigned Loc 1',
      parcels: 2,
      weight: '5kg'
    },
    {
      id: 'ua-2',
      lat: 31.1200,
      lng: -97.7500,
      address: 'Unassigned Loc 2',
      parcels: 1,
      weight: '2kg'
    }
  ]
};
