import { useState } from "react";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Customer from "./Customer";
import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import Courses from "./Courses";
import Devops from "./Devops";
import Genai from "./Genai";

function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/Contact">Contact</NavLink>
        <NavLink to="/About">About</NavLink>
        <NavLink to="/Customer">Customer</NavLink>
        <NavLink to="/Courses">Courses</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/Contact" element={<Contact></Contact>}></Route>
        <Route path="/Customer" element={<Customer></Customer>}></Route>
        <Route path="/About" element={<About></About>}></Route>
        <Route path="/Courses" element={<Courses></Courses>}>
          <Route path="devops" element={<Devops></Devops>}></Route>
          <Route path="genai" element={<Genai></Genai>}></Route>
          <Route path="*" element={<h1>Page Not Found</h1>}></Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;
