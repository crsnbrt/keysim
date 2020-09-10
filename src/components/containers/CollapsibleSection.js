import React, { useState } from "react";
import styles from "./CollapsibleSection.module.scss";
import { ReactComponent as Plus } from "../../assets/icons/icon_plus.svg";
import { ReactComponent as Minus } from "../../assets/icons/icon_minus.svg";

export default function CollapsibleSection(props) {
  const [open, setOpen] = useState(props.open || false);

  const toggleKeyboard = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(!open);
    }
  };

  return (
    <section className={styles.section} aria-label={"Section " + props.title}>
      <header
        tabIndex="0"
        onKeyDown={toggleKeyboard}
        onClick={() => {
          if (props.forceOpen) return;
          setOpen(!open);
        }}
      >
        {props.title}
        {!props.forceOpen && (
          <>
            {!open && <Plus style={{ width: "20px" }} />}
            {open && <Minus style={{ width: "20px" }} />}
          </>
        )}
      </header>
      {open && props.children}
    </section>
  );
}
