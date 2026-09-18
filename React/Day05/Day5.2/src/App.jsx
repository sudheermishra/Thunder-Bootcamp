import { useState } from "react";
import Sum from "./sum";
import { useMemo } from "react";
function App() {
  const [count, setCount] = useState(100);
  const [number, setNumber] = useState(10000);

  const prime = useMemo(() => {
    let totalPrime = 0;

    if (number > 1) totalPrime++;

    for (let i = 3; i <= number; i++) {
      totalPrime++;
      for (let j = 2; j < i; j++) {
        if (i % j == 0) {
          totalPrime--;
          break;
        }
      }
    }
  }, [number]);

  return (
    <>
      <h1>count:{count}</h1>
      <button onClick={() => setCount(count + 1)}> Incremenet</button>
      <h2>Number is: {number}</h2>
      <button onClick={() => setNumber(number + 10000)}>
        Increment Number
      </button>
      <h3>Total Prime number: {prime}</h3>

      <Sum number={count} />
    </>
  );
}

export default App;
