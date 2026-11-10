import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (username === "mmkr" && password === "mmkr4555") {
      const admin = {
        role: "admin",
        name: "Administrator"
      };

      localStorage.setItem("citycareUser", JSON.stringify(admin));

      navigate("/admin");
    } else {
      setError("Invalid username or password!");
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <h1>Admin Login</h1>
        <p>CityCare Hospital Management System</p>

        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn">
          Login
        </button>

        <Link to="/">Back to Home</Link>
      </form>
    </div>
  );
}