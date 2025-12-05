import React, { useState, useMemo } from 'react';
import { Box, Typography, IconButton, TextField, InputAdornment, Menu, MenuItem, Radio, Badge } from '@mui/material';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HistoryIcon from '@mui/icons-material/History';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import OrderCard from '../../components/UnassignedOrders/OrderCard';
import RouteRecommendationPopup from '../../components/UnassignedOrders/RouteRecommendationPopup';
import AssignConfirmationPopup from '../../components/UnassignedOrders/AssignConfirmationPopup';
import OrderMapLayer from '../../components/UnassignedOrders/OrderMapLayer';
import RoutePreviewLayer from '../../components/UnassignedOrders/RoutePreviewLayer';
import SuccessToast from '../../components/UnassignedOrders/SuccessToast';
import ViewSwitcher from '../../components/ViewSwitcher';
import FilterPopup from '../../components/RoutesPanel/FilterPopup';

import { MOCK_UNASSIGNED_ORDERS, MOCK_CLUSTERS } from '../../data/mockUnassignedOrders';

const generateRecommendations = (orderId) => {
  const suffix = orderId.slice(-4);
  return [
    {
      routeId: `CAZA${suffix}89654`,
      driver: "Amy Doe",
      distance: "12km",
      statusColor: '#0B8A41'
    },
    {
      routeId: `LJKC${suffix}347547`,
      driver: "Avy KK",
      distance: "8km",
      statusColor: '#0B8A41'
    },
    {
      routeId: `ABCA${suffix}005210`,
      driver: "William AAA",
      distance: "6km",
      statusColor: '#B0B0B0'
    }
  ];
};

const UnassignedOrdersView = ({ activeView = 'orders', setActiveView, isCollapsed = true }) => {
  const [orders, setOrders] = useState(MOCK_UNASSIGNED_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [recommendationOpen, setRecommendationOpen] = useState(false);
  
  // New State for Confirmation Flow
  const [confirmingRoute, setConfirmingRoute] = useState(null); // The route object being confirmed
  const [toast, setToast] = useState(null); // { message: string, routeId: string }

  // Filter State
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const filterOpen = Boolean(filterAnchorEl);
  const [activeFilters, setActiveFilters] = useState({
    markets: [],
    clients: []
  });
  const [searchQuery, setSearchQuery] = useState('');

  const currentRecommendations = useMemo(() => {
    if (!selectedOrder) return [];
    return generateRecommendations(selectedOrder.id);
  }, [selectedOrder]);

  const handleOrderClick = (order) => {
    if (selectedOrder?.id === order.id) {
      setRecommendationOpen(true);
      setConfirmingRoute(null); // Reset confirmation if re-clicking
    } else {
      setSelectedOrder(order);
      setRecommendationOpen(true);
      setConfirmingRoute(null);
    }
  };

  // Called when "+" is clicked in Recommendation Popup
  const handleInitiateAssign = (routeId) => {
    const route = currentRecommendations.find(r => r.routeId === routeId);
    setConfirmingRoute(route);
    setRecommendationOpen(false); // Close recommendation popup
  };

  // Called when "Confirm" is clicked in Confirmation Popup
  const handleConfirmAssign = () => {
    if (selectedOrder && confirmingRoute) {
      setOrders(prev => prev.filter(o => o.id !== selectedOrder.id));
      
      // Show Toast
      setToast({
        message: "Order has been successfully added to route-",
        routeId: confirmingRoute.routeId
      });

      setSelectedOrder(null);
      setConfirmingRoute(null);
      setRecommendationOpen(false);
    }
  };

  // Called when "Cancel" is clicked
  const handleCancelAssign = () => {
    setConfirmingRoute(null);
    setRecommendationOpen(true); // Go back to recommendations
  };

  const handleClosePopup = () => {
    setRecommendationOpen(false);
    setSelectedOrder(null);
    setConfirmingRoute(null);
  };

  // Filter Handlers
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
  };

  // Filtering Logic
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
        // Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            if (!order.id.toLowerCase().includes(query) && 
                !order.vendor.toLowerCase().includes(query)) {
                return false;
            }
        }

        // Market Filter (Check if pickup or delivery address contains selected market)
        if (activeFilters.markets.length > 0) {
            const pickupAddress = order.pickup.address.toLowerCase();
            const deliveryAddress = order.delivery.address.toLowerCase();
            const matchesMarket = activeFilters.markets.some(market => 
                pickupAddress.includes(market.toLowerCase()) || 
                deliveryAddress.includes(market.toLowerCase())
            );
            // Note: Mock data has "City, AB". If user selects "Calgary", it won't match "City".
            // However, for demonstration, if user selects "Calgary", we might not find matches in mock data unless we update mock data or assume "City" maps to something.
            // Let's assume strict string matching for now as per requirement.
            if (!matchesMarket) {
                // If no match found, check if address contains "City" and market is "Calgary" (just for testing if needed, but better to stick to strict logic)
                return false;
            }
        }

        // Client Filter
        if (activeFilters.clients.length > 0) {
            if (!activeFilters.clients.includes(order.vendor)) {
                return false;
            }
        }

        return true;
    });
  }, [orders, searchQuery, activeFilters]);

  const activeFilterCount = activeFilters.markets.length + activeFilters.clients.length;

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', overflow: 'hidden', bgcolor: '#F4F5F7', position: 'relative' }}>
      
      {/* LEFT PANEL - Fixed Position */}
      <Box 
        sx={{ 
          width: '350px', 
          position: 'fixed',
          left: isCollapsed ? '65px' : '240px', // Dynamic left based on sidebar state
          top: '64px', // Match Topbar height
          bottom: 0,
          bgcolor: '#fff', 
          borderRight: '1px solid #E0E0E0', 
          display: 'flex', 
          flexDirection: 'column',
          zIndex: 1100, // Match RoutesPanel z-index
          transition: 'left 0.3s ease', // Smooth transition
        }}
      >
        {/* Header / Search */}
        <Box sx={{ p: 2, borderBottom: '1px solid #F0F0F0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <ViewSwitcher activeView={activeView} setActiveView={setActiveView} />

                <IconButton size="small" onClick={handleFilterClick}>
                    <Badge badgeContent={activeFilterCount} color="error" variant="dot" invisible={activeFilterCount === 0}>
                        <FilterListIcon fontSize="small" />
                    </Badge>
                </IconButton>
            </Box>

          <TextField
            fullWidth
            placeholder="Search..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: '8px', bgcolor: '#F9FAFB' }
            }}
          />
          <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block', fontFamily: 'Montserrat' }}>
            {filteredOrders.length} Total unassigned orders
          </Typography>
        </Box>

        {/* List */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, bgcolor: '#F8F9FA' }}>
          {filteredOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              isSelected={selectedOrder?.id === order.id}
              onClick={handleOrderClick}
            />
          ))}
          {filteredOrders.length === 0 && (
            <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 4 }}>
              No unassigned orders found.
            </Typography>
          )}
        </Box>
      </Box>

      {/* RIGHT PANEL - MAP */}
      <Box sx={{ 
          marginLeft: '350px', // Offset for the fixed left panel
          height: '100%', 
          position: 'relative' 
      }}>
        <MapContainer
          center={[31.13234, -97.76455]} // Default center
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          {/* Base Layer: Order Markers */}
          <OrderMapLayer 
            orders={filteredOrders} 
            clusters={MOCK_CLUSTERS}
            selectedOrder={selectedOrder} 
          />

          {/* Preview Layer: Show Route when confirming */}
          {confirmingRoute && selectedOrder && (
            <RoutePreviewLayer 
                route={confirmingRoute} 
                order={selectedOrder} 
            />
          )}
        </MapContainer>

        {/* Popup Overlay: Recommendations */}
        {recommendationOpen && selectedOrder && !confirmingRoute && (
          <RouteRecommendationPopup
            recommendations={currentRecommendations}
            onAssign={handleInitiateAssign}
            onClose={handleClosePopup}
          />
        )}

        {/* Popup Overlay: Confirmation */}
        {confirmingRoute && selectedOrder && (
            <AssignConfirmationPopup
                route={confirmingRoute}
                order={selectedOrder}
                onConfirm={handleConfirmAssign}
                onCancel={handleCancelAssign}
            />
        )}

        {/* Success Toast */}
        {toast && (
          <SuccessToast
            message={toast.message}
            routeId={toast.routeId}
            onClose={() => setToast(null)}
          />
        )}
      </Box>

      {/* Filter Popup */}
      <FilterPopup 
        open={filterOpen}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
        onApply={handleApplyFilters}
        initialFilters={activeFilters}
        type="orders"
      />
    </Box>
  );
};

export default UnassignedOrdersView;
