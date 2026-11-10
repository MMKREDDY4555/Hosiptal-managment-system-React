
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">CityCare Hospital</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/login/admin">Admin Login</Link>
        <Link to="/login/doctor">Doctor Login</Link>
        <Link to="/login/patient">Patient Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
