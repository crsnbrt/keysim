import { createSlice } from "@reduxjs/toolkit";
import initial_settings from "../../config/settings_user_default.json";

export const colorwaysSlice = createSlice({
  name: "colorways",
  initialState: initial_settings.colorways,
  reducers: {
    setColorway: (state, action) => {
      state.active = action.payload;
    },
    addCustomColorway: (state, action) => {
      state.custom = [...state.custom, action.payload];
    },
    removeCustomColorway: (state, action) => {
      state.custom = state.custom.filter((c) => c.id !== action.payload);
    },
    toggleEditing: (state) => {
      state.editing = !state.editing;
    },
    setActiveSwatch: (state, action) => {
      state.activeSwatch = action.payload;
    },
    updateCustomColorway: (state, action) => {
      state.custom = state.custom.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
  },
});

export const {
  setColorway,
  addCustomColorway,
  removeCustomColorway,
  updateCustomColorway,
  addSwatch,
  removeSwatch,
  updateSwatchBackground,
  toggleEditing,
  setActiveSwatch,
} = colorwaysSlice.actions;

export const selectColorway = (state) => state.colorways.active;
export const selectColorways = (state) => state.colorways.custom;
export const selectEditing = (state) => state.colorways.editing;
export const selectActiveSwatch = (state) => state.colorways.activeSwatch;

export default colorwaysSlice.reducer;
