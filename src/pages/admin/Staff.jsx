import React, { useEffect, useState } from "react";
import {
  getStaff,
  addStaff,
  updateStaff,
  deleteStaff
} from "../../data/storage";

const blank = {
  name: "",
  role: "",
  department: "",
  phone: "",
  shift: "Morning",
  attendance: "Present"
};

function Staff() {
  const [staff, setStaff] = useState(getStaff);
  const [form, setForm] = useState(blank);

  useEffect(() => {
    const refresh = () => setStaff(getStaff());
    window.addEventListener("citycare-update", refresh);
    return () => window.removeEventListener("citycare-update", refresh);
  }, []);

  function submit(e) {
    e.preventDefault();
    addStaff(form);
    setStaff(getStaff());
    setForm(blank);
  }

  function attendance(id, value) {
    updateStaff(id, { attendance: value });
    setStaff(getStaff());
  }

  function remove(id) {
    if (!window.confirm("Remove this staff member?")) return;
    deleteStaff(id);
    setStaff(getStaff());
  }

  const present = staff.filter((item) => item.attendance === "Present").length;
  const absent = staff.filter((item) => item.attendance === "Absent").length;

  return (
    <div className="portal-page admin-theme">
      <h2>Staff Management</h2>

      <div className="appointment-card">
        <h3>Total Staff: {staff.length}</h3>
        <p>Present today: {present}</p>
        <p>Absent today: {absent}</p>
      </div>

      <form className="portal-form" onSubmit={submit}>
        <h3>Add Staff Member</h3>

        <label>Full Name</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label>Role</label>
        <input
          required
          placeholder="Nurse, Receptionist, Technician..."
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />

        <label>Department</label>
        <input
          required
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />

        <label>Mobile Number</label>
        <input
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <label>Shift</label>
        <select
          value={form.shift}
          onChange={(e) => setForm({ ...form, shift: e.target.value })}
        >
          <option>Morning</option>
          <option>Evening</option>
          <option>Night</option>
        </select>

        <button type="submit">Add Staff Member</button>
      </form>

      <h3>Staff Attendance and Details</h3>

      {staff.map((member) => (
        <div className="appointment-card" key={member.id}>
          <h3>{member.name}</h3>
          <p>Role: {member.role}</p>
          <p>Department: {member.department}</p>
          <p>Mobile: {member.phone}</p>
          <p>Shift: {member.shift}</p>

          <label>Attendance: </label>
          <select
            value={member.attendance || "Present"}
            onChange={(e) => attendance(member.id, e.target.value)}
          >
            <option>Present</option>
            <option>Absent</option>
            <option>On Leave</option>
          </select>

          <button
            className="danger-button"
            onClick={() => remove(member.id)}
          >
            Remove Staff
          </button>
        </div>
      ))}
    </div>
  );
}

export default Staff;