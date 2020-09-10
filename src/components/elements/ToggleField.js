import React from "react";
import Toggle from "react-toggle";
import "./ToggleField.scss";

export default function ToggleField(props) {
  return (
    <div className="fieldCheck">
      <label>
        <Toggle
          defaultChecked={props.value}
          icons={false}
          onChange={props.handler}
        />
        <div className="fieldInfo">
          <span>{props.label}</span>
          <div className="fieldHelp">{props.help}</div>
        </div>
      </label>
    </div>
  );
}
