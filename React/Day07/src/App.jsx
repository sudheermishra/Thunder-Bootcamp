import { useRef, useState } from "react";

function App() {
  const [time, setTime] = useState(0);
  const intervalIdRef = useRef(null);

  console.log("Render");
  function handleStart() {
    if (intervalIdRef.current != null) {
      return;
    }
    const id = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    intervalIdRef.current = id;
  }

  function handleStop() {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
  }

  function handleReset() {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
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

export default App;
