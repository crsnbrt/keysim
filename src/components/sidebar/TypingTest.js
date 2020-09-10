import React, { useState, useEffect } from "react";
import styles from "./TestingPane.module.scss";
import { wordsPerMinTest } from "wpmtest";
import CollapsibleSection from "../containers/CollapsibleSection";
import Button from "../elements/Button";

const minutes = 1;
var timer;

const wpmTest = new wordsPerMinTest(() => {}, minutes, {});

export default function TypingTest() {
  const [wpm, setWpm] = useState("---");
  const [count, setCount] = useState(1000 * 60 * minutes);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [currentText, setCurrentText] = useState(wpmTest.curDisplayText);

  useEffect(() => {
    wpmTest.stopwatch.onDone(() => {
      clearInterval(timer);
      setFinished(true);
      setCount(0); //just in case sometimes rounds up to 1
      setCurrentText("complete");
      setWpm(Math.round(wpmTest.averageWPM));
    });
  }, []);

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
    setFinished(false);
    clearInterval(timer);
    wpmTest.restartTest();
    setCurrentText(wpmTest.curDisplayText);
    setCount(1000 * 60 * minutes);
  };

  const handleKeypress = (e) => {
    if (finished) return;
    if (!started) start();
    wpmTest.checkKeyChar(e.key);
    setCurrentText(wpmTest.curDisplayText);
  };

  const isSpaceFirst = () => {
    return currentText.charAt(0) === " ";
  };

  return (
    <CollapsibleSection title="Typing Speed Test" open={true}>
      <div className={styles.wpmContainer}>
        <h3>
          WPM: <span className={styles.wpmNumber}>{wpm}</span>
        </h3>
        <Button title="Reset" handler={reset} />
      </div>
      <div>
        <div className={styles.timer}>
          <p>Time Remaining: {count / 1000}s</p>
          <p>The timer will start when you start typing.</p>
        </div>
        <div tabIndex="0" className={styles.words} onKeyDown={handleKeypress}>
          <span
            className={!isSpaceFirst() && !finished ? styles.charAccent : null}
          >
            {currentText}
          </span>
        </div>
      </div>
    </CollapsibleSection>
  );
}
