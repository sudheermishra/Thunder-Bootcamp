import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function gitHub() {
      const response = await fetch("https://api.github.com/users");
      const data = await response.json();
      console.log(data);
      setUser(data);
    }
    gitHub();
  }, []);

  return (
    <>
      <div>
        {user.map((u) => (
          <img src={u.avatar_url} height={"150px"} width={"150px"}></img>
        ))}
      </div>
    </>
  );
}

export default App;
