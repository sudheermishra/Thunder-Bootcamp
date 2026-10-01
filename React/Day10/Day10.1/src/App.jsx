import { useState } from "react";
import Counter from "./Counter";

function App() {
  const [timer, setTimer] = useState(["first", "second", "third"]);
  return (
    <>
      <h1>This is our Counter Table</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
        {timer.map((value, index) => (
          <Counter key={value} name={value}></Counter>
        ))}
      </div>
    </>
  );
}

export default App;
