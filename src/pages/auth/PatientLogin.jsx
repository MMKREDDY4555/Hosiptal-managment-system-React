import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function PatientLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const accounts = JSON.parse(
      localStorage.getItem("citycareAccounts") || "[]"
    );

    const patient = accounts.find(
      (account) =>
        account.username === username &&
        account.password === password &&
        account.role === "patient"
    );

    if (patient) {
      localStorage.setItem(
        "citycareUser",
        JSON.stringify({
          role: "patient",
          name: patient.name,
          username: patient.username
        })
      );

      navigate("/patient");
    } else {
      setError("Invalid login details. Please register first.");
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <h1>Patient Login</h1>
        <p>Welcome to CityCare Hospital!</p>

        <label>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn">
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/patient-register">Register here</Link>
        </p>

        <Link to="/">Back to Home</Link>
      </form>
    </div>
  );
}