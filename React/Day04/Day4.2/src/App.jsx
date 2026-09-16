import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [user, setUser] = useState([]);
  const [count, setCount] = useState(10);

  useEffect(() => {
    async function gitHub() {
      // const response = await fetch("https://api.github.com/users");
      const response = await fetch(
        `https://api.github.com/users?per_page= ${count}`,
      );

      const data = await response.json();
      console.log(data);
      setUser(data);
    }
    gitHub();
  }, [count]);

  return (
    <>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(e.target.value)}></input>
      <div>
        {user.map((u) => (
          <img src={u.avatar_url} height={"150px"} width={"150px"}></img>
        ))}
      </div>
    </>
  );
}

export default App;
