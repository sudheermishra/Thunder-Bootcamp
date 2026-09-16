import { useState } from "react";
import Sum from "./Sum";

function App() {
  let [count, setCount] = useState(0);
  return (
    <>
      <h1>Count:{count}</h1>
      <button onClick={() => setCount(count + 1)}> Increment</button>
      <button onClick={() => setCount(count - 1)}> Decrement</button>
      <Sum number={count} />
    </>
  );
}

export default App;
