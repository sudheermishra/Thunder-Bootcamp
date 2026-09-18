import { useState } from "react";
import Sum from "./sum";
function App() {
  const [count, setCount] = useState(100);
  return (
    <>
      <h1>count:{count}</h1>
      <button onClick={() => setCount(count + 1)}> Incremenet</button>
      <Sum number={100} />
    </>
  );
}

export default App;
