import { useState } from "react";

function App() {
  let [count, setCount] = useState(0);

  function handleClick() {
    count = count + 1;
    setCount(count);
  }
  return (
    <>
      <p>Counter:{count}</p>
      <button onClick={handleClick}>Increase</button>
    </>
  );
}

export default App;
