import React from "react";
import styles from "./About.module.scss";
import CollapsibleSection from "../containers/CollapsibleSection";

export default function About() {
  return (
    <CollapsibleSection title="About" open={true}>
      <div className={styles.about}>
        <p>version 1.0</p>
        <p>
          Keyboard Simulator is built using{" "}
          <a
            href="https://threejs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            three js
          </a>
        </p>
        <p>
          If you would like to receive updates on keyboard simulator features or
          changes{" "}
          <a
            href="https://forms.gle/i7kFgQ98yr47Cthx7"
            rel="noopener noreferrer"
            target="_blank"
          >
            sign up here
          </a>
        </p>
        <p>
          Note: precise color values are not always available for community
          colorways and therefore colorways may use approximate values.
        </p>
        <p>
          additional credit:{" "}
          <a
            href="https://freepbr.com/materials/brushed-metal1/"
            rel="noopener noreferrer"
            target="_blank"
          >
            materials
          </a>
        </p>
        <div className={styles.legal}>
          site design &copy;2020 keyboard simulator
        </div>
      </div>
    </CollapsibleSection>
  );
}
