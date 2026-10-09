import React, { useState } from "react";
import { Navigate } from "react-router";

function Home() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  if (status == "loading") {
    return <p className="p-8">Checking Your Session...</p>;
  }

  if (status === "logged-out") {
    return <Navigate to="/signup" replace></Navigate>;
  }

  if (status === "error") {
    return <p className="p-8">Could not check your session. Please refresh.</p>;
  }
  return <></>;
}

export default Home;
