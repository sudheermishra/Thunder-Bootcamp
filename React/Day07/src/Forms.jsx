// on every key stroke  yeh function render / component render hoga so we can use useRef
// sir initial time p create hota h as a object leta and object ki value change hone p render nhi hota

// import { useState } from "react";

// function Forms() {
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   console.log("Render");
//   function handleSubmit(e) {
//     e.preventDefault();
//     console.log(name);
//     console.log(age);
//     console.log(email);
//     console.log(password);
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}></input>
//         <input
//           type="number"
//           value={age}
//           onChange={(e) => setAge(e.target.value)}></input>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}></input>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}></input>
//         <button type="submit">Submit</button>
//       </form>
//     </>
//   );
// }

// export default Forms;

import { useState, useRef } from "react";

function Forms() {
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  console.log("Render");
  function handleSubmit(e) {
    e.preventDefault();
    console.log(nameRef.current.value);
    console.log(ageRef.current.value);
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={nameRef}></input>
        <input type="number" ref={ageRef}></input>
        <input type="email" ref={emailRef}></input>
        <input type="password" ref={passwordRef}></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Forms;
