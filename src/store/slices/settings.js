import { createSlice } from "@reduxjs/toolkit";
import initial_settings from "../../config/settings_user_default.json";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initial_settings.settings,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    toggleTestingMode: (state) => {
      state.testing = !state.testing;
    },
    toggleMute: (state) => {
      state.mute = !state.mute;
    },
    toggleDebug: (state) => {
      state.debug = !state.debug;
    },
    setGlowColor: (state, action) => {
      state.glowColor = action.payload;
    },
    setSceneColor: (state, action) => {
      state.sceneColor = action.payload;
    },
    toggleSceneAutoColor: (state) => {
      state.sceneAutoColor = !state.sceneAutoColor;
    },
    toggleHighContrast: (state) => {
      state.highContrast = !state.highContrast;
    },
    setSceneAutoColor: (state, action) => {
      state.sceneAutoColor = action.payload;
    },
    togglePaintWithKeys: (state) => {
      state.paintWithKeys = !state.paintWithKeys;
    },
  },
});

export const {
  setMode,
  toggleMute,
  toggleDebug,
  setGlowColor,
  setSceneColor,
  toggleHighContrast,
  toggleTestingMode,
  togglePaintWithKeys,
  toggleSceneAutoColor,
  setSceneAutoColor,
} = settingsSlice.actions;

export const selectMode = (state) => state.settings.mode;
export const selectMute = (state) => state.settings.mute;
export const selectDebug = (state) => state.settings.debug;
export const selectTesting = (state) => state.settings.testing;
export const selectHighContrast = (state) => state.settings.highContrast;
export const selectPaintWithKeys = (state) => state.settings.paintWithKeys;
export const selectGlowColor = (state) => state.settings.glowColor;
export const selectSceneColor = (state) => state.settings.sceneColor;
export const selectSceneAutoColor = (state) => state.settings.sceneAutoColor;

export default settingsSlice.reducer;
