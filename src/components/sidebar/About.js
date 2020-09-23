import React from "react";
import styles from "./About.module.scss";
import CollapsibleSection from "../containers/CollapsibleSection";
import { ReactComponent as GithubIcon } from "../../assets/icons/icon_github.svg";

export default function About() {
  return (
    <CollapsibleSection title="About" open={true}>
      <div className={styles.about}>
        <p>
          <a
            href="https://github.com/crsnbrt/keysim"
            rel="noopener noreferrer"
            target="_blank"
            className={styles.github}
          >
            <GithubIcon /> Keyboard Simulator on Github
          </a>
        </p>
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
            material
          </a>
          ,{" "}
          <a
            href="https://hdrihaven.com/hdri/?c=indoor&h=paul_lobe_haus"
            rel="noopener noreferrer"
            target="_blank"
          >
            material
          </a>
        </p>
        <div className={styles.legal}>
          site design &copy;2020 keyboard simulator
        </div>
      </div>
    </CollapsibleSection>
  );
}
