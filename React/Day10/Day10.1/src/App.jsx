import { useState } from "react";
import Counter from "./Counter";

function App() {
  const [timer, setTimer] = useState(["first", "second", "third"]);
  return (
    <>
      {timer.map((value) => (
        <Counter name={value} />
      ))}
    </>
  );
}

export default App;
