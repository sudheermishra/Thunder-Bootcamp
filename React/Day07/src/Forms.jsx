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
