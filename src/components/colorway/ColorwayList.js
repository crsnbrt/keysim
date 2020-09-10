import React, { useState } from "react";
import Colorway from "./Colorway";
import Button from "../elements/Button";
import styles from "./ColorwayList.module.scss";
import { useSelector, useDispatch } from "react-redux";
import COLORWAYS from "../../config/colorways/colorways";
import CollapsibleSection from "../containers/CollapsibleSection";
import SearchField from "../elements/SearchField";
import ColorUtil from "../../util/color";
import {
  setColorway,
  selectColorways,
  addCustomColorway,
} from "../../store/slices/colorways";

import { ReactComponent as PlusIcon } from "../../assets/icons/icon_plus.svg";

export default function ColorwayList(props) {
  const dispatch = useDispatch();
  const customColorways = useSelector(selectColorways);
  const [filter, setFilter] = useState("");

  const filteredColorways = () => {
    return Object.keys(COLORWAYS)
      .sort()
      .filter((cw) => {
        return filter.length
          ? cw.toLowerCase().includes(filter.toLowerCase())
          : true;
      });
  };

  const customColorwayTiles = customColorways.map((s) => (
    <Colorway key={s.id} colorway={s} custom={true} setTab={props.setTab} />
  ));

  const colorwayTiles = filteredColorways().map((s) => (
    <Colorway key={COLORWAYS[s].id} colorway={COLORWAYS[s]} />
  ));

  const addColorway = (e) => {
    let cw = ColorUtil.getColorwayTemplate(customColorways?.length + 1 || 1);
    dispatch(addCustomColorway(cw));
    dispatch(setColorway(cw.id));
  };

  return (
    <CollapsibleSection title="Colorways" open={true}>
      <div>
        <div className={styles.group}>
          <SearchField
            filter={(val) => {
              setFilter(val);
            }}
          />
          <Button
            title="Add"
            icon={<PlusIcon />}
            className={styles.add}
            handler={addColorway}
            tabIndex="0"
          >
            <PlusIcon />
            <span>Add New Colorway</span>
          </Button>
        </div>
        {customColorwayTiles.length ? (
          <div aria-hidden="true" className={styles.listLabel}>
            <span>My Colorways</span>
          </div>
        ) : null}
        <ul className={styles.list} aria-label="my custom colorways list">
          {customColorwayTiles}
        </ul>
        {customColorwayTiles.length ? (
          <div aria-hidden="true" className={styles.listLabel}>
            <span>Community Colorways</span>
          </div>
        ) : null}
        {colorwayTiles.length ? (
          <ul className={styles.list} aria-label="community colorways list">
            {colorwayTiles}
          </ul>
        ) : (
          <p
            style={{
              fontSize: "16px",
              padding: "1em",
              margin: "0",
              width: "100%",
            }}
          >
            No matching colorways
          </p>
        )}{" "}
      </div>
    </CollapsibleSection>
  );
}
