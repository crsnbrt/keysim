import { configureStore } from "@reduxjs/toolkit";
import { saveState } from "./localStorage";
import initSubscriber from "redux-subscriber";
import settingsReducer from "./slices/settings";
import switchesReducer from "./slices/switches";
import colorwaysReducer from "./slices/colorways";
import caseReducer from "./slices/case";
import keysReducer from "./slices/keys";
import { initial_settings } from "./startup";

const ENABLE_LOCAL_STORAGE = true;

const store = configureStore({
  reducer: {
    keys: keysReducer,
    case: caseReducer,
    settings: settingsReducer,
    switches: switchesReducer,
    colorways: colorwaysReducer,
  },
  preloadedState: initial_settings,
});

if (ENABLE_LOCAL_STORAGE) {
  store.subscribe(() => {
    let state = store.getState();
    saveState({
      settings: state.colorways.custom,
      active: state.colorways.active,
    });
  });
}

initSubscriber(store);

export default store;
