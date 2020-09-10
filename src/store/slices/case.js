import { createSlice } from "@reduxjs/toolkit";
import initial_settings from "../../config/settings_user_default.json";

export const caseSlice = createSlice({
  name: "case",
  initialState: initial_settings.case,
  reducers: {
    toggleAutoColor: (state) => {
      state.autoColor = !state.autoColor;
    },
    setAutoColor: (state, action) => {
      state.autoColor = action.payload;
    },
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
    },
    setSecondaryColor: (state, action) => {
      state.secondaryColor = action.payload;
    },
    setStyle: (state, action) => {
      state.style = action.payload;
    },
    setBezel: (state, action) => {
      state.bezel = action.payload;
    },
    setLayout: (state, action) => {
      state.layout = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setMaterial: (state, action) => {
      state.material = action.payload;
    },
  },
});

//actions
export const {
  toggleAutoColor,
  setPrimaryColor,
  setSecondaryColor,
  setStyle,
  setBezel,
  setLayout,
  setProfile,
  setMaterial,
  setAutoColor,
} = caseSlice.actions;

//case
export const selectAutoColor = (state) => state.case.autoColor;
export const selectPrimaryColor = (state) => state.case.primaryColor;
export const selectSecondaryColor = (state) => state.case.secondaryColor;
export const selectStyle = (state) => state.case.style;
export const selectBezel = (state) => state.case.bezel;
export const selectLayout = (state) => state.case.layout;
export const selectProfile = (state) => state.case.profile;
export const selectMaterial = (state) => state.case.material;

export default caseSlice.reducer;
