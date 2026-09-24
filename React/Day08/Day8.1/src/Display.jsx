import { useContext } from "react";
import { CountContext } from "./App.jsx";

function Display() {
  const { count } = useContext(CountContext);
  return (
    <>
      <h1>Display:{count}</h1>
    </>
  );
}

export default Display;
