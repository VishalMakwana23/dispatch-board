import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import scenarioReducer from './slices/scenarioSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    scenario: scenarioReducer,
  },
});
