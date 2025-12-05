import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSettingsOpen: false,
  isProfileOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openSettings: (state) => {
      state.isSettingsOpen = true;
      state.isProfileOpen = false;
    },
    closeSettings: (state) => {
      state.isSettingsOpen = false;
    },
    toggleSettings: (state) => {
      state.isSettingsOpen = !state.isSettingsOpen;
      if (state.isSettingsOpen) state.isProfileOpen = false;
    },
    openProfile: (state) => {
      state.isProfileOpen = true;
      state.isSettingsOpen = false;
    },
    closeProfile: (state) => {
      state.isProfileOpen = false;
    },
    toggleProfile: (state) => {
      state.isProfileOpen = !state.isProfileOpen;
      if (state.isProfileOpen) state.isSettingsOpen = false;
    },
    closeAll: (state) => {
      state.isSettingsOpen = false;
      state.isProfileOpen = false;
    },
    selectStop: (state, action) => {
      state.selectedStopId = action.payload;
    },
    clearSelectedStop: (state, action) => {
      if (action.payload) {
        if (state.selectedStopId === action.payload) {
            state.selectedStopId = null;
        }
      } else {
        state.selectedStopId = null;
      }
    },
  },
});

export const {
  openSettings,
  closeSettings,
  toggleSettings,
  openProfile,
  closeProfile,
  toggleProfile,
  closeAll,
  selectStop,
  clearSelectedStop,
} = uiSlice.actions;

export default uiSlice.reducer;
