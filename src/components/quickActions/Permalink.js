import React, { useState, useRef } from "react";
import { getPermalink } from "../../store/qs";
import { ReactComponent as LinkIcon } from "../../assets/icons/icon_link.svg";
import styles from "./action.module.scss";

export default function PermalinkButton() {
  const node = useRef(null);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("copy permalink to this keyboard");

  const copyPermalink = () => {
    node.current.select();
    document.execCommand("copy");
    setMessage("permalink copied");
    setTimeout(() => {
      setMessage("copy permalink to this keyboard");
    }, 1000);
  };

  return (
    <div
      id="permalink"
      role="button"
      aria-label={message}
      onClick={copyPermalink}
      className={styles.action}
      onMouseEnter={() => {
        setVisible(true);
      }}
      onMouseLeave={() => {
        setVisible(false);
      }}
    >
      <input
        type="text"
        readOnly
        value={getPermalink()}
        aria-label="permalink field"
        ref={node}
        style={{
          cursor: "pointer",
          position: "absolute",
          pointerEvents: "none",
          opacity: "0",
        }}
      />
      <LinkIcon />
      {visible && (
        <div role="tooltip" className={styles.tooltip}>
          {message}
        </div>
      )}
    </div>
  );
}
