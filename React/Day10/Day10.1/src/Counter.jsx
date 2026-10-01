import { useState } from "react";

function Counter({ name }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>your name is {name}</h1>
      <h1>Counter:{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}

export default Counter;
