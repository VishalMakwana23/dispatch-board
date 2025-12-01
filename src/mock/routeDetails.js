export const routeDetailsMock = {
  "123445677886544": {
    id: "123445677886544",
    coordinates: [
      { lat: 31.1201, lng: -97.7423 }, // Warehouse
      { lat: 31.1250, lng: -97.7380 },
      { lat: 31.1300, lng: -97.7350 },
      { lat: 31.1350, lng: -97.7300 }, // Stop 2
      { lat: 31.1400, lng: -97.7250 },
      { lat: 31.1450, lng: -97.7200 }, // Stop 3
      { lat: 31.1500, lng: -97.7150 },
      { lat: 31.1550, lng: -97.7100 }, // Stop 4
      { lat: 31.1600, lng: -97.7050 },
      { lat: 31.1650, lng: -97.7000 }, // Stop 5
      { lat: 31.1700, lng: -97.6950 }, // Stop 6
      { lat: 31.1750, lng: -97.6900 }, // Stop 7
      { lat: 31.1800, lng: -97.6850 }, // Stop 8 (Last Location)
    ],
    stops: [
      {
        id: 1,
        type: "Warehouse",
        name: "Warehouse",
        address: "123 Main St, City AB W9E2S",
        time: "10:30 AM PDT 2025/11/18",
        timeWindow: "Pln: 12:30 PM PDT 2025/11/18",
        orders: "12 Orders",
        parcels: "113 Parcels",
        status: "loaded",
        color: "green",
        isWarehouse: true,
        lat: 31.1201, lng: -97.7423
      },
      {
        id: 2,
        name: "Name",
        address: "123 Main St, City AB W9E2S",
        time: "12:30 PM PDT 2025/11/18",
        timeWindow: "Pln: 12:30 PM PDT 2025/11/18",
        orders: "2 Orders",
        parcels: "15 Items",
        status: "completed",
        color: "green",
        lat: 31.1350, lng: -97.7300
      },
      {
        id: 3,
        name: "John Doe",
        address: "123 Main St, City AB W9E2S",
        time: "12:30 PM PDT 2025/11/18",
        timeWindow: "Pln: 12:30 PM PDT 2025/11/18",
        orders: "2 Orders",
        parcels: "15 Items",
        status: "missing_pod",
        badges: ["Missing POD"],
        color: "red",
        lat: 31.1450, lng: -97.7200
      },
      {
        id: 4,
        name: "Name",
        address: "123 Main St, City AB W9E2S",
        time: "12:30 PM PDT 2025/11/18",
        timeWindow: "Pln: 12:30 PM PDT 2025/11/18",
        orders: "2 Orders",
        parcels: "15 Items",
        status: "completed",
        color: "green",
        lat: 31.1550, lng: -97.7100
      },
      {
        id: 5,
        name: "Name",
        address: "123 Main St, City AB W9E2S",
        time: "12:30 PM PDT 2025/11/18",
        timeWindow: "Pln: 12:30 PM PDT 2025/11/18",
        orders: "2 Orders",
        parcels: "15 Items",
        status: "customer_unavailable",
        badges: ["Customer Unavailable"],
        color: "yellow", // Risk/Warning
        lat: 31.1650, lng: -97.7000
      },
      {
        id: 6,
        name: "John Doe",
        address: "123 Main St, City AB W9E2S",
        time: "Est: 12:30 PM PDT 2025/11/18",
        timeWindow: "Pln: 12:30 PM PDT 2025/11/18",
        orders: "2 Orders",
        parcels: "15 Items",
        status: "risk_of_delay",
        badges: ["Risk of Delay"],
        color: "red", // Or orange/yellow depending on exact requirement. Screenshot shows red badge for Risk of Delay on list, but map might be different. User said "Yellow -> risk". Let's use Yellow for map, Red for badge if needed. But user said "Yellow -> risk" for map.
        // Let's stick to the user's map colors: Green, Yellow, Red, Grey, Orange.
        // "Risk of Delay" usually implies Yellow.
        lat: 31.1700, lng: -97.6950
      },
      {
        id: 7,
        name: "Name",
        address: "123 Main St, City AB W9E2S",
        time: "12:30 PM PDT 2025/11/18",
        timeWindow: "Pln: 12:30 PM PDT 2025/11/18",
        orders: "2 Orders",
        parcels: "15 Items",
        status: "upcoming",
        color: "grey", // Upcoming
        lat: 31.1750, lng: -97.6900
      },
       {
        id: 8,
        name: "John Doe",
        address: "123 Main St, City AB W9E2S",
        time: "12:30 PM PDT 2025/11/18",
        timeWindow: "Pln: 12:30 PM PDT 2025/11/18",
        orders: "2 Orders",
        parcels: "15 Items",
        status: "last_location",
        badges: ["Risk of Delay"],
        color: "orange", // Last/Final location
        lat: 31.1800, lng: -97.6850
      }
    ]
  }
};
