import { useEffect, useState } from "react";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
      console.log("  cleanup function called");
    };
  }, [isRunning]);

  function handleStart() {
    console.log("holl");
    setIsRunning(true);
  }

  function handleStop() {
    console.log("holl");
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setTime(0);
  }

  return (
    <div>
      <h1>{time}</h1>

      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Stopwatch;
