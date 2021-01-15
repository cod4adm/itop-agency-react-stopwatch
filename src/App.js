import React, {useState} from 'react';
import {interval} from "rxjs";
import {map} from 'rxjs/operators';

import './App.css';

import Display from "./Components/DisplayComponent";
import Button from "./Components/ButtonComponent";

const sequence$ = interval(1000);
let timerSub;

function App() {
  const [timer, setTimer] = useState(0);
  const [timeStamp, setTimeStamp] = useState(0);
  const [timerStatus, setTimerStatus] = useState(0);
  const seconds = timer % 60;
  const minutes = Math.floor(timer / 60) % 60;
  const hours = Math.floor(timer / 3600) % 6;

  const start = () => {
    if (timerStatus === 0) {
      timerSub = sequence$.subscribe((value) => {
        setTimer(value);
      })
      setTimerStatus(1);
    }
    if (timerStatus === 2) {
      timerSub = sequence$
        .pipe(map((lastTime) => lastTime + timer))
        .subscribe((value) => {
          setTimer(value);
        })
      setTimerStatus(1);
    }
  }

  const stop = () => {
    timerSub.unsubscribe();
    setTimer(0);
    setTimerStatus(0);
  }

  const reset = () => {
    timerSub.unsubscribe();
    setTimer(0);
    timerSub = sequence$.subscribe((value) => {
      setTimer(value);
    })
  }

  const wait = (event) => {
    if (timeStamp === 0) {
      setTimeStamp(event.timeStamp)
    }
    if (timeStamp !== 0) {
      const res = event.timeStamp - timeStamp;
      setTimeStamp(0);
      if (res <= 300) {
        timerSub.unsubscribe();
        setTimerStatus(2);
      }
    }
  }

  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <Display
            seconds={seconds}
            minutes={minutes}
            hours={hours}
          />
          <Button
            start={start}
            stop={stop}
            reset={reset}
            wait={wait}
            timerStatus={timerStatus}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
