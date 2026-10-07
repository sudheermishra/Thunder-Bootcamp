import { useStore } from "../store";

function Header() {
  const userName = useStore((state) => state.user);
  const setUsername = useStore((state) => state.setUser);
  return (
    <>
      <h2>I am the header</h2>
      <h3>Display the username: {userName}</h3>
      <button onClick={setUsername}>Change</button>
    </>
  );
}

export default Header;
