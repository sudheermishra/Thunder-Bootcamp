const element = (
  <>
    <h1>Hello </h1>
    <h2>Coder Army</h2>
  </>
);

// React component: function
// nnumber, string, array: Inko display kar deta hai
// true, false, null, ismein error nahi dega, leking kuch display nahi karayega
// object: Error de dega

function App() {
  // code likh do
  const isLoggedIn = false;
  return (
    <h1>Hello Coder Army {isLoggedIn ? <h2>Log Out</h2> : <h2>Log in</h2>}</h1>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(App());
