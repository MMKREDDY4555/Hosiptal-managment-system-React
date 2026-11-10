import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Register() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleRegister(e) {
    e.preventDefault();

    const accounts = JSON.parse(
      localStorage.getItem("citycareAccounts") || "[]"
    );

    const exists = accounts.some(
      (account) => account.username === username
    );

    if (exists) {
      setError("Username already exists. Please choose another.");
      return;
    }

    const newAccount = {
      name,
      username,
      password,
      role
    };

    accounts.push(newAccount);

    localStorage.setItem(
      "citycareAccounts",
      JSON.stringify(accounts)
    );

    alert("Registration successful! Please login.");

    navigate(
      role === "doctor"
        ? "/doctor-login"
        : "/patient-login"
    );
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleRegister}>
        <h1>{role === "doctor" ? "Doctor" : "Patient"} Registration</h1>

        <label>Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter full name"
          required
        />

        <label>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Create username"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create password"
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn">
          Register
        </button>

        <p>
          Already registered?{" "}
          <Link to={role === "doctor" ? "/doctor-login" : "/patient-login"}>
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}