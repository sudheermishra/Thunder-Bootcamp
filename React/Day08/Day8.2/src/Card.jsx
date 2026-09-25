import { useState } from "react";
import { useContext } from "react";
import { CartContextProvider } from "./App";

function Card({ item }) {
  const [added, setAdded] = useState(false);
  const { setTotalPrice, setTotalItem } = useContext(CartContextProvider);

  function RemoveItem() {
    setAdded(false);
    setTotalItem((prev) => prev - 1);
    setTotalPrice((prev) => prev - item.price);
  }

  function AddItem() {
    setAdded(true);
    setTotalItem((prev) => prev + 1);
    setTotalPrice((prev) => prev + item.price);
  }
  return (
    <>
      <div>
        <h1>name: {item.name}</h1>
        <h2>price: {item.price}</h2>
        {added ? (
          <button onClick={RemoveItem}>Remove</button>
        ) : (
          <button onClick={AddItem}>Add</button>
        )}
      </div>
    </>
  );
}

export default Card;
