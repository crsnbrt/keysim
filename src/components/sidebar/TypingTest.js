import React, { useState } from "react";
import styles from "./TestingPane.module.scss";
import { wordsPerMinTest } from "wpmtest";
import CollapsibleSection from "../containers/CollapsibleSection";
import Button from "../elements/Button";

const minutes = 0.15;
var timer;

const wpmTest = new wordsPerMinTest(
  () => {
    // setWpm("Done");
    clearInterval(timer);
  },
  minutes,
  {}
);

export default function TypingTest() {
  const [wpm, setWpm] = useState("---");
  const [count, setCount] = useState(1000 * 60 * minutes);
  const [started, setStarted] = useState(false);
  const [currentText, setCurrentText] = useState(wpmTest.curDisplayText);

  const start = () => {
    wpmTest.startStopWatch();
    setStarted(true);
    timer = setInterval(() => {
      setCount((count) => count - 1000);
    }, 1000);
  };

  const reset = () => {
    setWpm("---");
    setStarted(false);
    clearInterval(timer);
    wpmTest.restartTest();
    setCurrentText(wpmTest.curDisplayText);
    setCount(1000 * 60 * minutes);
  };

  const handleKeypress = (e) => {
    if (!started) start();
    wpmTest.checkKeyChar(e.key);
    setCurrentText(wpmTest.curDisplayText);
    setWpm(Math.round(wpmTest.averageWPM));
  };

  return (
    <CollapsibleSection title="Typing Speed Test" open={true}>
      <div className={styles.wpmContainer}>
        <h3>
          WPM: <span className={styles.wpmNumber}>{wpm}</span>
        </h3>
        <Button title="Reset" handler={reset} />
      </div>
      <div className={styles.words} onKeyDown={handleKeypress}>
        <p>Time Remaining: {count / 1000}s</p>
        <textarea readOnly value={currentText}></textarea>
      </div>
    </CollapsibleSection>
  );
}
