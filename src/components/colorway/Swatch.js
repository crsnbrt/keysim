import React from "react";
import Button from "../elements/Button";
import styles from "./Swatch.module.scss";
import ColorPicker from "../elements/ColorPicker";

export default function Swatch(props) {
  const handleChange = (value, key) => {
    let newSwatch = { ...props.swatch };
    newSwatch[key] = value.hex;
    props.handler(props.name, newSwatch);
  };

  const selectSwatchKeyboard = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      props.setSwatch(props.name);
    }
  };

  const isRequired =
    props.name === "base" || props.name === "mods" || props.name === "accent";

  const isActive = props.name === props.active;

  return (
    <li
      className={`${styles.swatch} ${isActive ? styles.active : ""}`}
      tabIndex="0"
      onKeyDown={selectSwatchKeyboard}
      onClick={() => {
        props.setSwatch(props.name);
      }}
    >
      <div className={styles.info}>
        <label>{props.name}</label>
        {!isRequired && (
          <Button
            isText={true}
            title="Remove Swatch"
            handler={() => {
              props.remove(props.name);
            }}
          />
        )}
      </div>

      <div className={styles.colors}>
        <div className={styles.color}>
          <ColorPicker
            isSwatch={true}
            label="Background"
            color={props.swatch.background}
            handler={(color) => {
              handleChange(color, "background");
            }}
          />
        </div>

        <div className={styles.color}>
          <ColorPicker
            isSwatch={true}
            label="Legend"
            color={props.swatch.color}
            handler={(color) => {
              handleChange(color, "color");
            }}
          />
        </div>

        {(props.name === "base" || props.name.match("swatch-")) && (
          <div className={styles.color}>
            <ColorPicker
              isSwatch={true}
              label="Sublegend"
              color={props.swatch.subColor ?? props.swatch.color}
              handler={(color) => {
                handleChange(color, "subColor");
              }}
            />
          </div>
        )}
      </div>
    </li>
  );
}
