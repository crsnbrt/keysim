import React, { useState } from "react";
import styles from "./SearchField.module.scss";

import { ReactComponent as SearchIcon } from "../../assets/icons/icon_search.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/icon_x.svg";

export default function SearchField(props) {
  const [value, setValue] = useState("");

  const handelChange = (e) => {
    setValue(e.target.value);
    props.filter(e.target.value);
  };

  return (
    <div className={styles.search} role="search">
      <div
        className={styles.icon}
        onClick={() => {
          setValue("");
          props.filter("");
        }}
      >
        {value ? <CloseIcon /> : <SearchIcon />}{" "}
      </div>
      <input
        aria-label="Colorway Search"
        type="search"
        placeholder="Search"
        value={value}
        onChange={handelChange}
      />
    </div>
  );
}
