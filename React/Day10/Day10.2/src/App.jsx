import { useState } from "react";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Customer from "./Customer";

function App() {
  const [page, setPage] = useState("Home");

  return (
    <>
      <button onClick={() => setPage("Home")}>Home</button>
      <button onClick={() => setPage("About")}>About</button>
      <button onClick={() => setPage("Contact")}>Contact</button>
      <button onClick={() => setPage("Customer")}>Customer</button>
      {page == "Home" && <Home></Home>}
      {page == "About" && <About></About>}
      {page == "Contact" && <Contact></Contact>}
      {page == "Customer" && <Customer></Customer>}
    </>
  );
}

export default App;
