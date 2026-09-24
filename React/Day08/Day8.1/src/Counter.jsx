import { useContext } from "react";
import { CountContext } from "./App.jsx";

function Counter() {
  const { count, setCount } = useContext(CountContext);
  return (
    <>
      <h1>Count:{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}

export default Counter;
