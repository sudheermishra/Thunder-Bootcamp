import { useState } from "react";
import Counter from "./Counter.jsx";
import Header from "./Header.jsx";
import { createContext } from "react";

// global state le create context me
// provider bana diya
// jha consume krna h wha useContext hook se consume kr lenge
export const CountContext = createContext();
function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <CountContext value={{ count, setCount }}>
        <h1>I'm the App</h1>
        <Header />
        <Counter />
      </CountContext>
    </>
  );
}

export default App;
