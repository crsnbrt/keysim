import React, { useState, useRef, useEffect } from "react";
import styles from "./ColorPicker.module.scss";
import MyPicker from "./CustomColorPicker";
import Portal from "../containers/Portal";

export default function ColorPicker(props) {
  const [pos] = useState({});
  const [open, setOpen] = useState(false);
  const trigger = useRef();
  const dialog = useRef();

  const togglePicker = (e) => {
    setOpen(!open);
  };

  const handleClickOutside = (e) => {
    if (dialog.current.contains(e.target) || trigger.current.contains(e.target))
      return;
    setOpen(false);
  };

  const handelKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      togglePicker();
    }
  };

  const handelEscapeKey = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handelEscapeKey);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handelEscapeKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handelEscapeKey);
    };
  }, [open]);

  return (
    <div style={{ position: "relative" }}>
      <div
        tabIndex="0"
        ref={trigger}
        role="button"
        aria-label={"Toggle color picker for " + props.label}
        onKeyDown={handelKeyDown}
        className={props.isSwatch ? styles.cardSwatch : styles.card}
        onClick={togglePicker}
      >
        <div
          className={styles.swatch}
          style={{
            backgroundColor: props.color,
          }}
        ></div>
        <div className={styles.details} aria-label="selected color hex value">
          {props.label || props.color}
        </div>
      </div>
      {open && (
        <Portal>
          <dialog
            ref={dialog}
            open={open}
            className={
              window.innerWidth > 800 ? styles.dialog : styles.dialogInline
            }
          >
            <MyPicker
              pos={pos}
              color={props.color}
              onChangeComplete={props.handler}
              onClose={() => {
                trigger.current.focus();
              }}
            />
          </dialog>
        </Portal>
      )}
    </div>
  );
}
