import { useState } from "react";
import Counter from "./Counter.jsx";
import Header from "./Header.jsx";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Header count={count} />
      <Counter count={count} setCount={setCount} />
    </>
  );
}

export default App;
