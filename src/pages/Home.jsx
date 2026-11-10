import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="container home-page">
      <h1>Welcome to CityCare Hospital</h1>
      <p>Hospital Management System</p>
      <p>Manage appointments, doctors, patients, staff and hospital resources.</p>

      <div className="home-cards">
        <div className="card">
          <h2>Admin Portal</h2>
          <p>Manage doctors, patients, staff, resources and payments.</p>
          <Link className="btn" to="/admin">Open Admin</Link>
        </div>

        <div className="card">
          <h2>Doctor Portal</h2>
          <p>View appointments, update patient records and manage requests.</p>
          <Link className="btn" to="/doctor">Open Doctor</Link>
        </div>

        <div className="card">
          <h2>Patient Portal</h2>
          <p>Find doctors, book appointments and view payment status.</p>
          <Link className="btn" to="/patient">Open Patient</Link>
        </div>
      </div>
    </main>
  );
}