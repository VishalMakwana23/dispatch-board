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
        name: "Sarah Connor",
        address: "450 Veteran Memorial Blvd, Killeen, TX",
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
        address: "800 W Central Texas Expy, Killeen, TX",
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
        name: "Mike Ross",
        address: "200 E Rancier Ave, Killeen, TX",
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
        name: "Harvey Specter",
        address: "1001 E Veterans Memorial Blvd, Killeen, TX",
        time: "12:30 PM PDT 2025/11/18",
        timeWindow: "Pln: 12:30 PM PDT 2025/11/18",
        orders: "2 Orders",
        parcels: "15 Items",
        status: "customer_unavailable",
        badges: ["Customer Unavailable"],
        color: "yellow", 
        lat: 31.1650, lng: -97.7000
      },
      {
        id: 6,
        name: "John Doe",
        address: "200 E Rancier Ave, Killeen, TX",
        time: "Est: 12:30 PM PDT 2025/11/18",
        timeWindow: "Pln: 12:30 PM PDT 2025/11/18",
        orders: "2 Orders",
        parcels: "15 Items",
        status: "risk_of_delay",
        badges: ["Risk of Delay"],
        color: "red", 
        lat: 31.1700, lng: -97.6950
      },
      {
        id: 7,
        name: "Jessica Pearson",
        address: "3003 W Stan Schlueter Loop, Killeen, TX",
        time: "12:30 PM PDT 2025/11/18",
        timeWindow: "Pln: 12:30 PM PDT 2025/11/18",
        orders: "2 Orders",
        parcels: "15 Items",
        status: "upcoming",
        color: "grey", 
        lat: 31.1750, lng: -97.6900
      },
       {
        id: 8,
        name: "Louis Litt",
        address: "567 East Veterans Memorial Blvd",
        time: "12:30 PM PDT 2025/11/18",
        timeWindow: "Pln: 12:30 PM PDT 2025/11/18",
        orders: "2 Orders",
        parcels: "15 Items",
        status: "last_location",
        badges: ["Risk of Delay"],
        color: "orange", 
        lat: 31.1800, lng: -97.6850
      }
    ]
  },
  "890283847r784833": {
    id: "890283847r784833",
    coordinates: [
      { lat: 31.1300, lng: -97.7500 }, 
      { lat: 31.1350, lng: -97.7450 },
      { lat: 31.1400, lng: -97.7400 },
      { lat: 31.1450, lng: -97.7350 },
      { lat: 31.1500, lng: -97.7300 },
    ],
    stops: [
      {
        id: 1,
        type: "Warehouse",
        name: "Warehouse",
        address: "456 Side St, City CD X1Y2Z",
        time: "09:00 AM PDT 2025/11/18",
        timeWindow: "Pln: 10:00 AM PDT 2025/11/18",
        orders: "5 Orders",
        parcels: "50 Parcels",
        status: "loaded",
        color: "green",
        isWarehouse: true,
        lat: 31.1300, lng: -97.7500
      },
      {
        id: 2,
        name: "Alice Smith",
        address: "789 Elm St, City CD X1Y2Z",
        time: "10:30 AM PDT 2025/11/18",
        timeWindow: "Pln: 11:00 AM PDT 2025/11/18",
        orders: "1 Order",
        parcels: "5 Items",
        status: "completed",
        color: "green",
        lat: 31.1400, lng: -97.7400
      },
      {
        id: 3,
        name: "Bob Jones",
        address: "101 Oak St, City CD X1Y2Z",
        time: "11:30 AM PDT 2025/11/18",
        timeWindow: "Pln: 12:00 PM PDT 2025/11/18",
        orders: "2 Orders",
        parcels: "10 Items",
        status: "last_location",
        color: "orange",
        lat: 31.1500, lng: -97.7300
      }
    ]
  },
  "QO3W19103336544": {
    id: "QO3W19103336544",
    coordinates: [
      { lat: 31.1100, lng: -97.7200 }, 
      { lat: 31.1150, lng: -97.7150 },
      { lat: 31.1200, lng: -97.7100 },
      { lat: 31.1250, lng: -97.7050 },
    ],
    stops: [
      {
        id: 1,
        type: "Warehouse",
        name: "Warehouse",
        address: "789 Pine St, City EF A1B2C",
        time: "08:00 AM PDT 2025/11/18",
        timeWindow: "Pln: 09:00 AM PDT 2025/11/18",
        orders: "8 Orders",
        parcels: "80 Parcels",
        status: "loaded",
        color: "green",
        isWarehouse: true,
        lat: 31.1100, lng: -97.7200
      },
      {
        id: 2,
        name: "Charlie Brown",
        address: "202 Maple St, City EF A1B2C",
        time: "09:30 AM PDT 2025/11/18",
        timeWindow: "Pln: 10:00 AM PDT 2025/11/18",
        orders: "3 Orders",
        parcels: "20 Items",
        status: "completed",
        color: "green",
        lat: 31.1200, lng: -97.7100
      },
      {
        id: 3,
        name: "David White",
        address: "303 Birch St, City EF A1B2C",
        time: "10:30 AM PDT 2025/11/18",
        timeWindow: "Pln: 11:00 AM PDT 2025/11/18",
        orders: "1 Order",
        parcels: "5 Items",
        status: "last_location",
        color: "orange",
        lat: 31.1250, lng: -97.7050
      }
    ]
  }
};
