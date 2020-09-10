import React, { useState, useRef } from "react";
import { getPermalink } from "../../store/qs";
import { ReactComponent as LinkIcon } from "../../assets/icons/icon_link.svg";

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
      aria-label={message}
      onClick={copyPermalink}
      style={{
        background: "black",
        borderRadius: "50%",
        position: "absolute",
        padding: "1em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "3em",
        height: "3em",
        left: "24rem",
        top: "2rem",
        zIndex: 10,
        cursor: "pointer",
        svg: {
          cursor: "pointer",
        },
      }}
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
          opacity: "0",
        }}
      />
      <LinkIcon />
      {visible && (
        <div
          role="tooltip"
          style={{
            position: "absolute",
            color: "white",
            background: "black",
            padding: "5px",
            fontSize: "12px",
            fontWeight: "bold",
            top: "110%",
            textAlign: "center",
            minWidth: "120px",
            width: "auto",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
