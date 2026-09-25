import { CartContextProvider } from "./App";
import { useContext } from "react";

function CartValue() {
  const { totalPrice, totalItem } = useContext(CartContextProvider);
  return (
    <>
      <h1>Total item added: {totalItem}</h1>
      <h2>Total Price: {totalPrice}</h2>
    </>
  );
}

export default CartValue;
