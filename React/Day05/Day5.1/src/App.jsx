import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      console.log("hllo");
    }, 1000);
  }, []);

  return (
    <>
      <h1>Current Time:{time}</h1>
    </>
  );
}

export default App;
