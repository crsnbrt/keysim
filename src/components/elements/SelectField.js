import React, { useState, useRef, useEffect } from "react";
import styles from "./SelectField.module.scss";
import { ReactComponent as SelectIcon } from "../../assets/icons/icon_select.svg";
import { ReactComponent as CheckIcon } from "../../assets/icons/icon_check.svg";
import _uniqueId from "lodash/uniqueId";

export default function Select(props) {
  const [labelId] = useState(_uniqueId("select-field-"));
  const [open, setOpen] = useState(false);
  const node = useRef();

  const selectHandler = (e) => {
    setOpen(false);
    props.handler(e.target.dataset.val);
  };

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) return;
    setOpen(false);
  };

  const handelKeyboardOpen = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(!open);
    }
    if (e.key === "ArrowDown") {
      setOpen(true);
    }
    if (e.key === "ArrowUp") {
      setOpen(false);
    }
  };

  const selectItemKeyboard = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      setOpen(false);
      props.handler(e.target.dataset.val);
    }
  };

  const selectedLabel = props.options.find((x) => props.selected === x.value)
    ?.label;
  const selectedLabelSecondary = props.options.find(
    (x) => props.selected === x.value
  )?.secondaryLabel;
  const selectedIcon =
    props.options.find((x) => props.selected === x.value)?.img || "";
  const optionList = props.options.map((op) => {
    return (
      <div
        data-val={op.value}
        className={
          selectedLabel === op.label ? styles.optionSelected : styles.option
        }
        key={op.label}
        onClick={selectHandler}
        onKeyDown={selectItemKeyboard}
        tabIndex="0"
        role="option"
        aria-selected={selectedLabel === op.label}
      >
        {op.img && (
          <div className={styles.icon}>
            <img alt={"icon " + op.label} src={op.img} />
          </div>
        )}
        <span>
          {op.label}{" "}
          <span className={styles.secondary}>{op.secondaryLabel}</span>
        </span>
        {selectedLabel === op.label && <CheckIcon />}
      </div>
    );
  });

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

  let dropdown = open ? <div className={styles.options}>{optionList}</div> : "";

  return (
    <div className={styles.field} ref={node}>
      <label id={labelId}>{props.label}</label>
      <div
        tabIndex="0"
        className={styles.select}
        onKeyDown={handelKeyboardOpen}
        aria-expanded={open ? "true" : "false"}
        aria-labelledby={labelId}
        role="listbox"
      >
        <div
          className={`${open ? styles.selectedOpen : styles.selected}`}
          aria-selected="true"
          role="option"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {selectedIcon && (
            <div className={styles.icon}>
              <img alt={"icon " + selectedLabel} src={selectedIcon} />
            </div>
          )}
          <span>
            {selectedLabel}{" "}
            <span className={styles.secondary}>{selectedLabelSecondary}</span>
          </span>
          <SelectIcon />
        </div>
        {dropdown}
      </div>
    </div>
  );
}
