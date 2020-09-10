import { createSlice } from "@reduxjs/toolkit";
import initial_settings from "../../config/settings_user_default.json";

export const keysSlice = createSlice({
  name: "keys",
  initialState: initial_settings.keys,
  reducers: {
    toggleVisible: (state) => {
      state.visible = !state.visible;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setLegendPrimaryStyle: (state, action) => {
      state.legendPrimaryStyle = action.payload;
    },
    setLegendSecondaryStyle: (state, action) => {
      state.legendSecondaryStyle = action.payload;
    },
  },
});

export const {
  toggleVisible,
  setProfile,
  setLegendPrimaryStyle,
  setLegendSecondaryStyle,
} = keysSlice.actions;

export const selectVisible = (state) => state.keys.visible;
export const selectProfile = (state) => state.keys.profile;
export const selectLegendPrimaryStyle = (state) =>
  state.keys.legendPrimaryStyle;
export const selectLegendSecondaryStyle = (state) =>
  state.keys.legendSecondaryStyle;

export default keysSlice.reducer;
