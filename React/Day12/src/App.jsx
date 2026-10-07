export const Countcontext = createContext();
export const Setcountcontext = createContext();
export const Usercontext = createContext();
export const Setusercontext = createContext();

// seperate context create krenge jise yeh changes wale hi re render honge baaki ke nhi

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState("Rohit");

  return (
    <>
      <Countcontext value={count}>
        <Setcountcontext value={setCount}>
          <Usercontext value={user}>
            <Setusercontext value={setUser}>
              <h1>Hello Coder Army: {hell}</h1>
              <Header></Header>
            </Setusercontext>
          </Usercontext>
        </Setcountcontext>
      </Countcontext>
      {/* <Countcontext value={count}><Headers></Headers></Countcontext>
     <Setcountcontext value={setCount}><Headers></Headers></Setcountcontext> */}
    </>
  );
}

export default App;
