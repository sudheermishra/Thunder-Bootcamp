import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [show, setShow] = useState(true);

  // jab phli baar useEeffect chalega toh toh callback fucntion ko nhi chalayega woh usko yaad krke rakhega
  // jab second time state change hogi tab woh phle return function ko excute krega
  // and fir upper se useeffect run hoga and wapis se setInterval nayi id na bana de isliye wahi se return kra diya
  useEffect(() => {
    if (!show) {
      return;
    }
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      console.log("hllo");
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [show]);

  return (
    <>
      <button onClick={() => setShow(!show)}>{show ? "show" : "hide"}</button>
      {show && <h1>Current Time:{time}</h1>}
    </>
  );
}

export default App;
