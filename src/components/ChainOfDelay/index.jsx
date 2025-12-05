import React, { useState } from 'react';
import ChainOfDelayAlert from './ChainOfDelayAlert';
import ChainOfDelayModal from './ChainOfDelayModal';
import SuccessToast from './SuccessToast';

// Mock Data
const MOCK_MAIN_ROUTE = {
  id: "MMKLIW2930439484",
  driver: "Amy Doe",
  pinTime: "2025-12-15T11:00:00",
  delayMinutes: 30
};

const MOCK_AFFECTED_ROUTES = [
  { id: "MM2839DJDFI1939030", driver: "Kate DD", pinTime: "2025-12-15T16:00:00" },
  { id: "FM283DJLA0QO012934455", driver: "Claire KK", pinTime: "2025-12-12T06:00:00" }
];

const STATUS_CODES = [
  "Unavailable",
  "Canceled by Client",
  "Vehicle Breakdown",
  "Incorrect Address",
  "Weather Issue"
];

const ChainOfDelayContainer = ({ isCollapsed }) => {
  // State Management
  const [bigAlertVisible, setBigAlertVisible] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(false);
  
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [selectedAffectedRoutes, setSelectedAffectedRoutes] = useState([]);
  const [selectedStatusCode, setSelectedStatusCode] = useState(null);
  const [comment, setComment] = useState("");

  // Handlers
  const handleCloseBigAlert = () => {
    setBigAlertVisible(false);
    setButtonVisible(true);
  };

  const handleOpenModal = () => {
    setActionModalOpen(true);
  };

  const handleCloseModal = () => {
    setActionModalOpen(false);
  };

  const handleReview = () => {
    console.log("Review clicked - Highlight routes on map");
    // Mock behavior
  };

  const handleConfirmStatus = () => {
    console.log("Confirmed Status:", {
      selectedAffectedRoutes,
      selectedStatusCode,
      comment
    });
    setActionModalOpen(false);
    setBigAlertVisible(false);
    setButtonVisible(false);
    
    // Show Toast
    setToastMessage("Routes updated successfully!");
    setToastOpen(true);

    // Reset state
    setSelectedAffectedRoutes([]);
    setSelectedStatusCode(null);
    setComment("");
  };

  const handleConfirmSendNotifications = (recipients) => {
    console.log("Sending Notifications to:", recipients);
    setActionModalOpen(false);
    setBigAlertVisible(false);
    setButtonVisible(false);

    setToastMessage("Notifications sent successfully!");
    setToastOpen(true);
  };

  const handleConfirmCustomerMessage = (message, channel) => {
    console.log("Sending Customer Message:", { message, channel });
    setActionModalOpen(false);
    setBigAlertVisible(false);
    setButtonVisible(false);

    setToastMessage("Routes updated and message was sent successfully!");
    setToastOpen(true);
  };

  return (
    <>
      <ChainOfDelayAlert
        bigAlertVisible={bigAlertVisible}
        buttonVisible={buttonVisible}
        onCloseBigAlert={handleCloseBigAlert}
        onOpenModal={handleOpenModal}
        onReview={handleReview}
        route={MOCK_MAIN_ROUTE}
        isCollapsed={isCollapsed}
      />

      <ChainOfDelayModal
        open={actionModalOpen}
        onClose={handleCloseModal}
        mainRoute={MOCK_MAIN_ROUTE}
        affectedRoutes={MOCK_AFFECTED_ROUTES}
        statusCodes={STATUS_CODES}
        selectedAffectedRoutes={selectedAffectedRoutes}
        setSelectedAffectedRoutes={setSelectedAffectedRoutes}
        selectedStatusCode={selectedStatusCode}
        setSelectedStatusCode={setSelectedStatusCode}
        comment={comment}
        setComment={setComment}
        onConfirm={handleConfirmStatus}
        onSendNotifications={() => {}} // Handled internally by modal step change
        onConfirmSendNotifications={handleConfirmSendNotifications}
        onConfirmCustomerMessage={handleConfirmCustomerMessage}
      />

      <SuccessToast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message={toastMessage}
      />
    </>
  );
};

export default ChainOfDelayContainer;
