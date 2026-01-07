import { createSlice } from '@reduxjs/toolkit';
import sedanImg from '../../assets/vehicles/sedan.png';
import minivanImg from '../../assets/vehicles/mini van.png';
import cargovanImg from '../../assets/vehicles/cargo van.png';
import sprinterImg from '../../assets/vehicles/sprinter.png';
import oneTonImg from '../../assets/vehicles/1 ton.png';
import fiveTonImg from '../../assets/vehicles/5 ton.png';
import transportImg from '../../assets/vehicles/transport.png';
import { killeenData } from '../../mock/killeenData';

const initialDraftState = {
    // Step 1 Data
    markets: [],
    cities: [],
    linhaulModel: 'exclusive',
    startDate: '2023-12-03',
    endDate: '2023-12-12',
    weeklyHours: {
        day_1: { start: '6:00am', end: '7:00am' },
        day_2: { start: '8:00am', end: '9:00am' },
        day_3: { start: '10:00am', end: '11:00am' },
        day_4: { start: '12:00pm', end: '1:00pm' },
        day_5: { start: '2:00pm', end: '3:00pm' },
    },
    // Step 2 Data
    selectedVehicles: {}, // { 'sedan': { quantity: 1 } }
    vehicleConsiderations: [],
    driverSchedule: {
        serviceHours: 10,
        weeklyHours: {
            day_1: { start: '6:00am', end: '7:00am' },
            day_2: { start: '8:00am', end: '9:00am' },
            day_3: { start: '10:00am', end: '11:00am' },
            day_4: { start: '12:00pm', end: '1:00pm' },
            day_5: { start: '2:00pm', end: '3:00pm' },
        }
    },
    driverEligibility: [],
    driverConsiderations: {
        maxStops: 5,
        maxDistance: 5
    },
    // Step 3 Data
    midFinalMileModel: 'exclusive',
    stopTimeProfiles: [],
    stopsPriority: 'preference_1',
    dynamicOverflow: '20%',
    preDepartureCutoff: '20%',
    operationalConstraints: {
        maxDwell: 5,
        maxStops: 5,
        maxDistance: 5
    },
    slaSchedule: {
        startDate: null,
        endDate: null,
        weeklyHours: {
            day_1: { start: '6:00am', end: '7:00am' },
            day_2: { start: '8:00am', end: '9:00am' },
            day_3: { start: '10:00am', end: '11:00am' },
            day_4: { start: '12:00pm', end: '1:00pm' },
            day_5: { start: '2:00pm', end: '3:00pm' },
        },
        stopLevel: { start: '6:00am', end: '7:00am' }
    },
    // Step 4 Data
    optimizationObjective: 'reduce_distance',
    scenarioVariables: {
        traffic: true,
        weather: true,
        roadRestrictions: true,
        construction: true
    },
    // Step 5 Data
    routeDataFile: null
};

const scenarioSlice = createSlice({
    name: 'scenario',
    initialState: {
        viewMode: 'list', // 'list', 'wizard', 'results'
        currentStep: 1,
        draft: initialDraftState,
        results: [],
    },
    reducers: {
        startScenarioCreation: (state) => {
            state.viewMode = 'wizard';
            state.currentStep = 1;
            state.draft = { ...initialDraftState, selectedVehicles: {} }; // Clean slate
            // Do NOT clear results here, so we can restore them if user cancels
        },
        updateDraftData: (state, action) => {
            const { field, value } = action.payload;
            state.draft[field] = value;
        },
        setStep: (state, action) => {
            state.currentStep = action.payload;
        },
        cancelCreation: (state) => {
            // If we have results, go back to results view, otherwise list
            if (state.results && state.results.length > 0) {
                state.viewMode = 'results';
            } else {
                state.viewMode = 'list';
            }
            state.draft = initialDraftState;
            state.currentStep = 1;
        },
        generateResults: (state) => {
            state.viewMode = 'results';

            // 1. Get User Inputs
            const { selectedVehicles, startDate, linhaulModel, operationalConstraints } = state.draft;

            // Format Date
            const formattedDate = startDate ? new Date(startDate).toLocaleDateString('en-US', {
                month: '2-digit', day: '2-digit', year: 'numeric'
            }) : '12/03/2026';

            // Vehicle Image Mapping
            const vehicleImages = {
                'sedan': sedanImg,
                'minivan': minivanImg,
                'cargovan': cargovanImg,
                'sprinter': sprinterImg,
                '1ton': oneTonImg,
                '5ton': fiveTonImg,
                'transport': transportImg
            };

            const vehicleNames = {
                'sedan': 'Sedan',
                'minivan': 'MiniVan',
                'cargovan': 'Cargo Van',
                'sprinter': 'Sprinter',
                '1ton': '1 Ton',
                '5ton': '5 Ton',
                'transport': 'Transport'
            };

            const generatedRoutes = [];
            let routeIndex = 0;

            // 2. Iterate through selected vehicles and generate routes
            if (Object.keys(selectedVehicles).length > 0) {
                Object.entries(selectedVehicles).forEach(([vehicleId, details]) => {
                    const quantity = details.quantity || 1;

                    for (let i = 0; i < quantity; i++) {
                        // Generate distinct ID
                        const routeId = `RT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

                        // Pick a route path from mock data (cycling through available ones)
                        const mockRouteTemplate = killeenData.routes[routeIndex % killeenData.routes.length];
                        const routeStops = mockRouteTemplate.stops; // Use the geodata from mock

                        // Generate Stats (respecting max constraints if reasonable, else randomish)
                        const maxStops = operationalConstraints?.maxStops ? parseInt(operationalConstraints.maxStops) : 10;
                        const maxDist = operationalConstraints?.maxDistance ? parseInt(operationalConstraints.maxDistance) : 150;

                        const actualStops = Math.min(routeStops.length, Math.floor(Math.random() * maxStops) + 1);
                        const slicedStops = routeStops.slice(0, actualStops);
                        const totalDistance = Math.floor(Math.random() * maxDist) + 20; // Min 20km

                        generatedRoutes.push({
                            id: routeId,
                            type: 'Final Mile',
                            stops: slicedStops,
                            orders: Math.floor(actualStops * 1.5),
                            distance: `${totalDistance} km`,
                            driverName: `Driver ${Math.floor(Math.random() * 1000)}`,
                            serviceProvider: 'Ziing Logistics',
                            date: formattedDate,
                            startTime: '08:00 AM',
                            endTime: `${formattedDate} 06:00 PM`,
                            badges: [
                                linhaulModel === 'exclusive' ? 'Exclusive' : 'Co-load',
                                vehicleNames[vehicleId] || 'Vehicle',
                                'Pharma Products'
                            ],
                            image: vehicleImages[vehicleId] || transportImg,
                            color: ['#1976D2', '#2E7D32', '#ED6C02', '#9C27B0'][Math.floor(Math.random() * 4)] // Blue, Green, Orange, Purple
                        });

                        routeIndex++;
                    }
                });
            } else {
                // Fallback if no vehicles selected - Generate 1 Default Route
                generatedRoutes.push({
                    id: 'DEF-001',
                    type: 'Final Mile',
                    stops: killeenData.routes[0].stops,
                    orders: 10,
                    distance: '50 km',
                    driverName: 'Default Driver',
                    serviceProvider: 'Ziing',
                    date: formattedDate,
                    startTime: '08:00 AM',
                    endTime: `${formattedDate} 06:00 PM`,
                    badges: ['Standard', 'Sedan'],
                    image: sedanImg,
                    color: '#2E7D32'
                });
            }

            state.results = [...(state.results || []), ...generatedRoutes];
        },
        backToPlanning: (state) => {
            state.viewMode = 'list';
            state.results = null;
        }
    }
});

export const {
    startScenarioCreation,
    updateDraftData,
    setStep,
    cancelCreation,
    generateResults,
    backToPlanning
} = scenarioSlice.actions;

export default scenarioSlice.reducer;
