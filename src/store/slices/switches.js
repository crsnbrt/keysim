import { createSlice } from "@reduxjs/toolkit";
import initial_settings from "../../config/settings_user_default.json";

export const switchesSlice = createSlice({
  name: "switches",
  initialState: initial_settings.switches,
  reducers: {
    setBodyColor: (state, action) => {
      state.bodyColor = action.payload;
    },
    setStemColor: (state, action) => {
      state.stemColor = action.payload;
    },
    setSoundProfile: (state, action) => {
      state.soundProfile = action.payload;
    },
  },
});

export const {
  setBodyColor,
  setStemColor,
  setSoundProfile,
} = switchesSlice.actions;

export const selectBodyColor = (state) => state.switches.bodyColor;
export const selectStemColor = (state) => state.switches.stemColor;
export const selectSoundProfile = (state) => state.switches.soundProfile;

export default switchesSlice.reducer;
