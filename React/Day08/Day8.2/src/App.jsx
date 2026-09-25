import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { createContext, useState } from "react";

export const CartContextProvider = createContext();
function App() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  return (
    <>
      <CartContextProvider
        value={{ totalItem, totalPrice, setTotalItem, setTotalPrice }}>
        <Header />
        <Body />
        <Footer />
      </CartContextProvider>
    </>
  );
}

export default App;
