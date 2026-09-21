import { useState } from "react";
import Stopwatch from "./Stopwatch.jsx";

function App() {
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  function handleStart() {
    // setInterval(() => {
    //   setTime(time + 1);
    //   console.log("hllo");
    // }, 1000);
    // agar direct humne setTime ke andar time+1 daala toh setInterval ko web Api handle krti jab first time yeh component render hoga toh 0 hoga and second tim jab wapis re render hoga toh yeh setinterval function apne closure ko yaad krke setInterval ko de dega ab setIntervel kaa callback function web api m jab jab run hoga tab har baar 0 + 1 hi return krega

    // isliye hum setTime((prevState) => prevState + 1) call back function dete hain
    // ab web api  ke pass yeh poora function jayega and yeh sidha js ko yeh function aisa kaa aisa hi return kr dega
    // and react isko fir run kregi prevstate me woh value legi jo abhi time m h and usme + 1 krke de deggi

    // Agar hum direct `setTime(time + 1)` likhte hain,
    // toh problem ye hai ki `setInterval` ke callback function ko
    // jis render ke time par banaya gaya tha, us render ka `time`
    // closure ki wajah se yaad reh sakta hai.
    //
    // Example:
    // Jab handleStart call hua tab `time = 0` tha.
    // Toh callback ke andar `time` ki value 0 capture ho gayi.
    //
    // Ab har 1 second baad callback chalega:
    // `setTime(time + 1)`
    // `setTime(0 + 1)` → 1
    //
    // React re-render hone ke baad bhi interval ke callback ke paas
    // purani `time` value ho sakti hai. Isi ko stale state problem
    // samajh sakte hain.

    // Is problem ko solve karne ke liye hum functional updater use karte hain:
    // `setTime((prevState) => prevState + 1)`
    //
    // Yahan hum direct `time` variable ko use nahi kar rahe.
    // Hum React ko ek function de rahe hain.
    //
    // React jab is state update ko process karega,
    // toh woh is function ko latest state value (`prevState`) dega.
    //
    // Example:
    // First time  → prevState = 0 → 0 + 1 = 1
    // Second time → prevState = 1 → 1 + 1 = 2
    // Third time  → prevState = 2 → 2 + 1 = 3
    //
    // Isliye har baar latest state milti hai aur timer correctly
    // increment hota rehta hai.

    if (intervalId != null) {
      return;
    }
    const intId = setInterval(() => {
      setTime((prevState) => {
        return prevState + 1;
      });
      console.log("hllo");
    }, 1000);
    setIntervalId(intId);
  }

  function handleStop() {
    console.log("holl");
    clearInterval(intervalId);
    setIntervalId(null);
  }

  function handleReset() {
    clearInterval(intervalId);
    setIntervalId(null);
    setTime(0);
  }

  return (
    <>
      <h1>StopWatch: {time}</h1>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <Stopwatch />
    </>
  );
}

export default App;
