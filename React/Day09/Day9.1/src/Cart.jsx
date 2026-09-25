import { useState } from "react";

function Cart() {
  const [fruit, setFruit] = useState(["Apple", "Mango", "Banana"]);
  function increment() {
    setFruit([...fruit, "strawberry"]);
  }
  return (
    <>
      <h1>My Food Item:</h1>
      <ul>
        {fruit.map((fru, index) => (
          <li key={index}>{fru}</li>
        ))}
      </ul>

      <button onClick={increment}>Increment</button>
    </>
  );
}

export default Cart;
