import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getDoctors } from "../../data/storage";

export default function DoctorLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      // 1. Get doctors added by the admin
      const doctors = getDoctors() || [];

      // 2. Get accounts created through registration
      const accounts = JSON.parse(
        localStorage.getItem("citycareAccounts") || "[]"
      );

      // 3. Search admin-created doctors
      const adminDoctor = doctors.find((item) =>
        item.username?.trim().toLowerCase() ===
          username.trim().toLowerCase() &&
        item.password === password
      );

      // 4. Search registered doctor accounts
      const registeredDoctor = accounts.find((item) =>
        item.username?.trim().toLowerCase() ===
          username.trim().toLowerCase() &&
        item.password === password &&
        item.role?.toLowerCase() === "doctor"
      );

      // 5. Use whichever matching account was found
      const doctor = adminDoctor || registeredDoctor;

      if (!doctor) {
        setError("Invalid username or password. Please check your registration details.");
        return;
      }

      // 6. Save doctor login session
      localStorage.setItem(
        "citycareUser",
        JSON.stringify({
          id: doctor.id || doctor.doctorId || doctor.username,
          name: doctor.name || doctor.fullName || username,
          role: "doctor",
          department: doctor.department || "",
          language: doctor.languages || doctor.language || []
        })
      );

      // 7. Navigate to doctor dashboard
      navigate("/doctor");

    } catch (error) {
      console.error("Doctor login error:", error);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="auth-container doctor-theme doctor-login-background">
      <div className="auth-card doctor-login-card">

        <div className="doctor-login-heading">
          <h2>Doctor Login</h2>
          <p>Welcome back! Login to access your dashboard.</p>
        </div>

        <form className="portal-form" onSubmit={handleLogin}>

          <label htmlFor="doctor-username">Username</label>
          <input
            id="doctor-username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="doctor-password">Password</label>
          <input
            id="doctor-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="error-message">{error}</p>
          )}

          <button type="submit" className="doctor-login-button">
            Login
          </button>

        </form>

        <p className="register-link">
          New doctor?{" "}
          <Link to="/register/doctor">Register Here</Link>
        </p>

        <p className="doctor-login-footer">
          CityCare Hospital Management System
        </p>

      </div>
    </div>
  );
}