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
  // Route 5 Stops (Killeen East)
  { id: 'st-5-1', lat: 31.1150, lng: -97.7100, address: 'E Central Texas Expy, Killeen, TX', type: 'warehouse', name: 'Warehouse' },
  { id: 'st-5-2', lat: 31.1200, lng: -97.7000, address: 'W.S. Young Dr, Killeen, TX', type: 'delivery', name: 'Name' },
  { id: 'st-5-3', lat: 31.1250, lng: -97.6900, address: 'E Rancier Ave, Killeen, TX', type: 'delivery', name: 'Name' },

  // Route 6 Stops (Killeen West)
  { id: 'st-6-1', lat: 31.1100, lng: -97.7600, address: 'W Veterans Memorial Blvd, Killeen, TX', type: 'warehouse', name: 'Warehouse' },
  { id: 'st-6-2', lat: 31.1050, lng: -97.7700, address: 'S Fort Hood St, Killeen, TX', type: 'delivery', name: 'Name' },
  { id: 'st-6-3', lat: 31.1000, lng: -97.7800, address: 'W Stan Schlueter Loop, Killeen, TX', type: 'delivery', name: 'Name' },

  // Route 7 Stops (Harker Heights South)
  { id: 'st-7-1', lat: 31.0700, lng: -97.6500, address: 'FM 2410 Rd, Harker Heights, TX', type: 'warehouse', name: 'Warehouse' },
  { id: 'st-7-2', lat: 31.0650, lng: -97.6400, address: 'Stillhouse Lake Rd, Harker Heights, TX', type: 'delivery', name: 'Name' },
  { id: 'st-7-3', lat: 31.0600, lng: -97.6300, address: 'Mountain Lion Rd, Harker Heights, TX', type: 'delivery', name: 'Name' },

  // Route 8 Stops (Nolanville)
  { id: 'st-8-1', lat: 31.0900, lng: -97.6000, address: 'Main St, Nolanville, TX', type: 'warehouse', name: 'Warehouse' },
  { id: 'st-8-2', lat: 31.0850, lng: -97.5900, address: 'Old Nolanville Rd, Nolanville, TX', type: 'delivery', name: 'Name' },
  { id: 'st-8-3', lat: 31.0800, lng: -97.5800, address: 'Paddy Hamilton Rd, Nolanville, TX', type: 'delivery', name: 'Name' },

  // Route 9 Stops (Copperas Cove)
  { id: 'st-9-1', lat: 31.1200, lng: -97.9000, address: 'E Bus 190, Copperas Cove, TX', type: 'warehouse', name: 'Warehouse' },
  { id: 'st-9-2', lat: 31.1250, lng: -97.9100, address: 'S 1st St, Copperas Cove, TX', type: 'delivery', name: 'Name' },
  { id: 'st-9-3', lat: 31.1300, lng: -97.9200, address: 'N Main St, Copperas Cove, TX', type: 'delivery', name: 'Name' },

  // Route 10 Stops (Kempner)
  { id: 'st-10-1', lat: 31.0800, lng: -97.9500, address: 'US-190, Kempner, TX', type: 'warehouse', name: 'Warehouse' },
  { id: 'st-10-2', lat: 31.0750, lng: -97.9600, address: 'FM 2313, Kempner, TX', type: 'delivery', name: 'Name' },
  { id: 'st-10-3', lat: 31.0700, lng: -97.9700, address: 'CR 3300, Kempner, TX', type: 'delivery', name: 'Name' },

  // Route 11 Stops (Belton)
  { id: 'st-11-1', lat: 31.0600, lng: -97.4600, address: 'N Main St, Belton, TX', type: 'warehouse', name: 'Warehouse' },
  { id: 'st-11-2', lat: 31.0550, lng: -97.4700, address: 'W 2nd Ave, Belton, TX', type: 'delivery', name: 'Name' },
  { id: 'st-11-3', lat: 31.0500, lng: -97.4800, address: 'S Loop 121, Belton, TX', type: 'delivery', name: 'Name' },

  // Route 12 Stops (Temple)
  { id: 'st-12-1', lat: 31.1000, lng: -97.3400, address: 'S 31st St, Temple, TX', type: 'warehouse', name: 'Warehouse' },
  { id: 'st-12-2', lat: 31.0950, lng: -97.3500, address: 'W Adams Ave, Temple, TX', type: 'delivery', name: 'Name' },
  { id: 'st-12-3', lat: 31.0900, lng: -97.3600, address: 'Airport Rd, Temple, TX', type: 'delivery', name: 'Name' },
  
  // Route 13 Stops (Salado)
  { id: 'st-13-1', lat: 30.9500, lng: -97.5300, address: 'N Main St, Salado, TX', type: 'warehouse', name: 'Warehouse' },
  { id: 'st-13-2', lat: 30.9450, lng: -97.5400, address: 'Royal St, Salado, TX', type: 'delivery', name: 'Name' },
  { id: 'st-13-3', lat: 30.9400, lng: -97.5500, address: 'Thomas Arnold Rd, Salado, TX', type: 'delivery', name: 'Name' },

  // Route 14 Stops (Jarrell)
  { id: 'st-14-1', lat: 30.8200, lng: -97.6000, address: 'N 5th St, Jarrell, TX', type: 'warehouse', name: 'Warehouse' },
  { id: 'st-14-2', lat: 30.8150, lng: -97.6100, address: 'CR 305, Jarrell, TX', type: 'delivery', name: 'Name' },
  { id: 'st-14-3', lat: 30.8100, lng: -97.6200, address: 'Ronald Reagan Blvd, Jarrell, TX', type: 'delivery', name: 'Name' },
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
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
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
      riskOfDelay: true, 
      missingPod: true, 
      driver: {
        name: 'Ariya SJ',
        company: 'Leo Green Logistic - Edmonton',
        id: 'dr-2',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
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
      missingPod: true, 
      statusCoded: true, 
      driver: {
        name: 'Mike Smith',
        company: 'Leo Green Logistic - Edmonton',
        id: 'dr-3',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
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
      missingPod: true, 
      statusCoded: true, 
      driver: {
        name: 'Ada SJ',
        company: 'Leo Green Logistic - Edmonton',
        id: 'dr-4',
        avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
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
    },
    // New Routes
    {
      id: 'RT-5566778899',
      type: 'Final-Mile',
      status: 'Ongoing',
      driver: { name: 'John Doe', company: 'Fast Logistics', id: 'dr-5', avatar: 'https://randomuser.me/api/portraits/men/60.jpg' },
      stats: { stops: 8, orders: 15, distance: '85 km', completed: 2, remaining: 6 },
      color: '#00BCD4', // Cyan
      stops: stopsData.slice(17, 20).map((s, i) => ({ ...s, status: i < 1 ? 'completed' : 'pending', window: '09:00 AM - 11:00 AM', parcels: 3, customer: `Customer ${s.id}` }))
    },
    {
      id: 'RT-6677889900',
      type: 'Mid-Mile',
      status: 'Risk of Delay',
      alert: 'Risk of Delay',
      riskOfDelay: true,
      driver: { name: 'Jane Smith', company: 'Quick Ship', id: 'dr-6', avatar: 'https://randomuser.me/api/portraits/men/61.jpg' },
      stats: { stops: 5, orders: 10, distance: '150 km', completed: 1, remaining: 4 },
      color: '#FF9800', // Orange
      stops: stopsData.slice(20, 23).map((s, i) => ({ ...s, status: 'pending', window: '10:00 AM - 12:00 PM', parcels: 5, customer: `Customer ${s.id}` }))
    },
    {
      id: 'RT-7788990011',
      type: 'Final-Mile',
      status: 'Completed',
      driver: { name: 'Bob Brown', company: 'Safe Delivery', id: 'dr-7', avatar: 'https://randomuser.me/api/portraits/men/62.jpg' },
      stats: { stops: 10, orders: 20, distance: '95 km', completed: 10, remaining: 0 },
      color: '#4CAF50', // Green
      stops: stopsData.slice(23, 26).map((s, i) => ({ ...s, status: 'completed', window: '08:00 AM - 10:00 AM', parcels: 2, customer: `Customer ${s.id}` }))
    },
    {
      id: 'RT-8899001122',
      type: 'Final-Mile',
      status: 'Missing POD',
      alert: 'Missing POD',
      missingPod: true,
      statusCoded: true,
      driver: { name: 'Alice Green', company: 'Eco Trans', id: 'dr-8', avatar: 'https://randomuser.me/api/portraits/men/63.jpg' },
      stats: { stops: 12, orders: 25, distance: '110 km', completed: 8, remaining: 4 },
      color: '#F44336', // Red
      stops: stopsData.slice(26, 29).map((s, i) => ({ ...s, status: i < 2 ? 'completed' : 'pending', window: '01:00 PM - 03:00 PM', parcels: 4, customer: `Customer ${s.id}` }))
    },
    {
      id: 'RT-9900112233',
      type: 'Mid-Mile',
      status: 'Ongoing',
      driver: { name: 'Charlie Black', company: 'Night Moves', id: 'dr-9', avatar: 'https://randomuser.me/api/portraits/men/64.jpg' },
      stats: { stops: 4, orders: 8, distance: '200 km', completed: 1, remaining: 3 },
      color: '#673AB7', // Deep Purple
      stops: stopsData.slice(29, 32).map((s, i) => ({ ...s, status: 'pending', window: '11:00 AM - 01:00 PM', parcels: 6, customer: `Customer ${s.id}` }))
    },
    {
      id: 'RT-0011223344',
      type: 'Final-Mile',
      status: 'Ongoing',
      driver: { name: 'David White', company: 'Day Break', id: 'dr-10', avatar: 'https://randomuser.me/api/portraits/men/65.jpg' },
      stats: { stops: 9, orders: 18, distance: '105 km', completed: 3, remaining: 6 },
      color: '#3F51B5', // Indigo
      stops: stopsData.slice(32, 35).map((s, i) => ({ ...s, status: i < 1 ? 'completed' : 'pending', window: '02:00 PM - 04:00 PM', parcels: 3, customer: `Customer ${s.id}` }))
    },
    {
      id: 'RT-1122334455',
      type: 'Final-Mile',
      status: 'Risk of Delay',
      alert: 'Risk of Delay',
      riskOfDelay: true,
      driver: { name: 'Eva Blue', company: 'Sky High', id: 'dr-11', avatar: 'https://randomuser.me/api/portraits/men/66.jpg' },
      stats: { stops: 7, orders: 14, distance: '90 km', completed: 2, remaining: 5 },
      color: '#009688', // Teal
      stops: stopsData.slice(35, 38).map((s, i) => ({ ...s, status: 'pending', window: '09:30 AM - 11:30 AM', parcels: 4, customer: `Customer ${s.id}` }))
    },
    {
      id: 'RT-2233445566',
      type: 'Mid-Mile',
      status: 'Completed',
      driver: { name: 'Frank Red', company: 'Hot Shot', id: 'dr-12', avatar: 'https://randomuser.me/api/portraits/men/67.jpg' },
      stats: { stops: 6, orders: 12, distance: '130 km', completed: 6, remaining: 0 },
      color: '#795548', // Brown
      stops: stopsData.slice(38, 41).map((s, i) => ({ ...s, status: 'completed', window: '07:00 AM - 09:00 AM', parcels: 5, customer: `Customer ${s.id}` }))
    },
    {
      id: 'RT-3344556677',
      type: 'Final-Mile',
      status: 'Missing POD',
      alert: 'Missing POD',
      missingPod: true,
      statusCoded: true,
      driver: { name: 'Grace Yellow', company: 'Sun Ray', id: 'dr-13', avatar: 'https://randomuser.me/api/portraits/men/68.jpg' },
      stats: { stops: 11, orders: 22, distance: '115 km', completed: 7, remaining: 4 },
      color: '#E91E63', // Pink
      stops: stopsData.slice(41, 44).map((s, i) => ({ ...s, status: i < 2 ? 'completed' : 'pending', window: '12:00 PM - 02:00 PM', parcels: 3, customer: `Customer ${s.id}` }))
    },
    {
      id: 'RT-4455667788',
      type: 'Final-Mile',
      status: 'Ongoing',
      driver: { name: 'Henry Gold', company: 'Rich Haul', id: 'dr-14', avatar: 'https://randomuser.me/api/portraits/men/69.jpg' },
      stats: { stops: 8, orders: 16, distance: '100 km', completed: 4, remaining: 4 },
      color: '#607D8B', // Blue Grey
      stops: stopsData.slice(44, 47).map((s, i) => ({ ...s, status: i < 1 ? 'completed' : 'pending', window: '03:00 PM - 05:00 PM', parcels: 4, customer: `Customer ${s.id}` }))
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
