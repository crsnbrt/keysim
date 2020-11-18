import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ColorUtil from "./util/color";
import Home from "./pages/Home";
import "./App.scss";

import * as colorwaysActions from "./store/slices/colorways";
import * as settingsActions from "./store/slices/settings";

export default function App() {
  const colorway_id = useSelector(colorwaysActions.selectColorway);
  const sceneAutoColor = useSelector(settingsActions.selectSceneAutoColor);
  const sceneColor = useSelector(settingsActions.selectSceneColor);
  const highContrast = useSelector(settingsActions.selectHighContrast);

  const getAccent = () => {
    return ColorUtil.getUiAccent(colorway_id);
  };

  const getSceneColor = () => {
    return sceneAutoColor ? ColorUtil.getAccent(colorway_id) : sceneColor;
  };

  const uiColors = {
    "--main": "#202024",
    "--dark-1": "#202024",
    "--dark-2": "#202024",
    "--light-1": "#38383f",
    "--light-2": "#9c9ca7",
    "--light-3": "#e0e0e3",
    "--accent": getAccent(),
    "--sceneColor": getSceneColor(),
    "--accent-transparent": ColorUtil.getTransparentColor(getAccent()),
    "--compliment": ColorUtil.getUiCompliment(colorway_id),
    "--accent-text": ColorUtil.getUiAccentText(colorway_id),
  };

  const uiColorsHC = {
    "--main": "#000000",
    "--dark-1": "#202024",
    "--dark-2": "#202024",
    "--light-1": "#202024",
    "--light-2": "#cccccc",
    "--light-3": "#ffffff",
    "--accent": getAccent(),
    "--sceneColor": getSceneColor(),
    "--accent-transparent": ColorUtil.getTransparentColor(getAccent()),
    "--compliment": ColorUtil.getUiCompliment(colorway_id),
    "--accent-text": "#000000",
  };

  return (
    <div className="App" style={highContrast ? uiColorsHC : uiColors}>
      <Router>
        <Home />
        <Switch>
          <Route path="/"></Route>
        </Switch>
      </Router>
    </div>
  );
}
