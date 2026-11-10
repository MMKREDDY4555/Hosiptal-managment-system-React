import { NavLink } from "react-router-dom";

export default function AdminTabs() {
  return (
    <div className="tabs">
      <NavLink to="/admin" end>Dashboard</NavLink>
      <NavLink to="/admin/doctors">Doctors</NavLink>
      <NavLink to="/admin/patients">Patients</NavLink>
      <NavLink to="/admin/appointments">Appointments</NavLink>
      <NavLink to="/admin/staff">Staff</NavLink>
      <NavLink to="/admin/resources">Resources</NavLink>
    </div>
  );
}