import React from "react";

import styles from "./TestingPane.module.scss";
import ToggleField from "../elements/ToggleField";
import { useSelector, useDispatch } from "react-redux";
import * as settingsActions from "../../store/slices/settings";
import CollapsibleSection from "../containers/CollapsibleSection";
import TypingTest from "./TypingTest";

export default function TestingPane() {
  const dispatch = useDispatch();
  const testing = useSelector(settingsActions.selectTesting);
  return (
    <>
      <CollapsibleSection title="Key Tester" open={true}>
        <div className={styles.pane}>
          <ToggleField
            value={testing}
            label={"Highlighting"}
            help={
              "Highlight pressed keys, note: not all keys can be detected by a browser"
            }
            handler={() => dispatch(settingsActions.toggleTestingMode())}
          />
        </div>
      </CollapsibleSection>
      <TypingTest />
    </>
  );
}
