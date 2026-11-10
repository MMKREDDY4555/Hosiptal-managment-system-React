import { NavLink } from "react-router-dom";

export default function DoctorTabs() {
  return (
    <div className="tabs">
      <NavLink to="/doctor" end>Dashboard</NavLink>
      <NavLink to="/doctor/profile">My Profile</NavLink>
      <NavLink to="/doctor/patients">Patients</NavLink>
      <NavLink to="/doctor/appointments">Appointments</NavLink>
      <NavLink to="/doctor/records">Medical Records</NavLink>
    </div>
  );
}