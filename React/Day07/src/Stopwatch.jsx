import { useState } from "react";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [intervalId, setintervalId] = useState(null);

  console.log("Render");
  function handleStart() {
    if (intervalId != null) {
      return;
    }
    const id = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    setintervalId(id);
  }

  function handleStop() {
    clearInterval(intervalId);
    setintervalId(null);
  }

  function handleReset() {
    clearInterval(intervalId);
    setintervalId(null);
    setTime(0);
  }
  return (
    <>
      <h1>StopWatch:{time}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
}

export default Stopwatch;
