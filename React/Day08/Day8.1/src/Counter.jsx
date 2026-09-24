import { useState } from "react";

function Counter({ count, setCount }) {
  return (
    <>
      <h1>Count:{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}

export default Counter;
