import React, { useRef, useEffect } from "react";
import { CustomPicker } from "react-color";
import { EditableInput } from "react-color/lib/components/common";
import { Hue, Saturation } from "react-color/lib/components/common";
import colorCodes from "../../config/colors/gmk";
import pickerStyes from "./ColorPicker.module.scss";
import ColorUtil from "../../util/color";

export const MyPicker = ({ hex, hsl, hsv, onChange, onClose }) => {
  const node = useRef();
  const styles = {
    hue: {
      height: 10,
      position: "relative",
      marginBottom: 15,
      marginTop: 15,
    },
    hex: {
      input: {
        border: "1px solid transparent",
        margin: "0 0 1em 0",
        fontSize: "18px",
        borderRadius: "5px",
        padding: "0.5em 0.5em",
        background: "#202024",
        width: "100%",
        color: "#e0e0e3",
      },
    },
    input: {
      height: 34,
      paddingLeft: 10,
      border: `1px solid ${hex}`,
    },
    saturation: {
      width: "100%",
      minWidth: "230px",
      paddingBottom: "75%",
      position: "relative",
      overflow: "hidden",
    },
    swatches: {
      display: "flex",
      flexWrap: "wrap",
    },
  };

  useEffect(() => {
    setTimeout(() => {
      if (node.current) node.current.querySelector("input").focus();
    }, 50);
    return onClose;
  }, []);

  const swatches = Object.keys(colorCodes).map((code) => {
    return (
      <li
        key={code}
        tabIndex="0"
        aria-label={"color " + code}
        className={pickerStyes.colorSwatch}
        onClick={() => {
          onChange(colorCodes[code]);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange(colorCodes[code]);
          }
        }}
        style={{
          background: `${colorCodes[code]}`,
        }}
      >
        {code}
      </li>
    );
  });

  return (
    <div className={pickerStyes.dialogContainer} ref={node}>
      <div style={styles.saturation}>
        <Saturation
          style={styles.Saturation}
          hsl={hsl}
          hsv={hsv}
          onChange={onChange}
        />
      </div>

      <div style={styles.hue}>
        <Hue hsl={hsl} onChange={onChange} />
      </div>

      <EditableInput
        style={styles.hex}
        value={hex}
        onChange={(color) => {
          if (ColorUtil.isValidColorString(color)) {
            onChange(color);
          }
        }}
      />

      <div style={{ display: "flex" }}>
        <ul aria-label="list of gmk colors" style={styles.swatches}>
          {swatches}
        </ul>
      </div>
    </div>
  );
};

export default CustomPicker(MyPicker);
