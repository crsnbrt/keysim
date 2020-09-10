import React, { useState, useRef, useEffect } from "react";
import styles from "./Tooltip.module.scss";
import { ReactComponent as QuestionIcon } from "../../assets/icons/icon_question.svg";

export default function Tooltip(props) {
  const [open, setOpen] = useState(false);
  const node = useRef();

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) return;
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div
      className={styles.tooltip}
      ref={node}
      aria-label={props.label}
      role="tooltip"
      aria-hidden={open ? "false" : "true"}
      tabIndex={open ? 0 : -1}
    >
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className={styles.inner}
      >
        <QuestionIcon />
      </div>
      {open && <div className={styles.message}>{props.message}</div>}
    </div>
  );
}
