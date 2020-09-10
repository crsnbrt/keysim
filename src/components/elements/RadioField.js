import React from "react";
import styles from "./RadioField.module.scss";
import _uniqueId from "lodash/uniqueId";

export default function Select(props) {
  const options = props.options.map((op) => {
    let optionId = _uniqueId("radio-option-");

    return (
      <React.Fragment key={op.label}>
        <input
          id={optionId}
          checked={props.selected === op.value}
          onChange={() => {
            props.handler(op.value);
          }}
          type="radio"
          name={props.name}
          value={op.value}
        />
        <label htmlFor={optionId} key={op.label} className={styles.radioItem}>
          <span>{op.label}</span>
        </label>
      </React.Fragment>
    );
  });

  return (
    <fieldset className={styles.radioField}>
      <legend>{props.label}</legend>
      <div className={styles.radioList}>{options}</div>
    </fieldset>
  );
}
