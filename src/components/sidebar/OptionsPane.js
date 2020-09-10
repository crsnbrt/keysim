import React from "react";
import ColorwayList from "../colorway/ColorwayList";
import BoardOptions from "./BoardOptions";
import About from "./About";

export default function OptionsPane(props) {
  return (
    <>
      <BoardOptions />
      <ColorwayList setTab={props.setTab} />
      <About />
    </>
  );
}
