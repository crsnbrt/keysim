import React from "react";
import styles from "./Button.module.scss";

export default function Button(props) {
  return (
    <button
      onClick={props.handler}
      className={props.isText ? styles.btnText : styles.btn}
    >
      {props.icon}
      <span>{props.title}</span>
    </button>
  );
}
