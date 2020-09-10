import React, { useEffect, useRef } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import threeApp from "../three/index";
import Permalink from "../components/sidebar/Permalink";

export default function Home() {
  const rootEl = useRef(null);

  useEffect(() => {
    threeApp(rootEl.current);
  }, []);

  return (
    <>
      <Sidebar />
      <div
        id="canvas-wrapper"
        ref={rootEl}
        role="region"
        aria-label="3d scene of keyboard"
      ></div>
      <Permalink />
    </>
  );
}
