import React, { useEffect, useState } from "react";
import {
  getDoctors,
  saveDoctors
} from "../../data/storage";
import { LANGUAGES } from "../../data/demoData";

const emptyDoctor = {
  name: "",
  username: "",
  password: "",
  department: "",
  qualification: "",
  experience: "",
  phone: "",
  email: "",
  language: ["English"],
  fee: 500,
  available: true
};

function Doctors() {
  const [doctors, setDoctors] = useState(getDoctors);
  const [form, setForm] = useState(emptyDoctor);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const refresh = () => setDoctors(getDoctors());
    window.addEventListener("citycare-update", refresh);
    return () => window.removeEventListener("citycare-update", refresh);
  }, []);

  function saveDoctor(e) {
    e.preventDefault();

    let updated;

    if (editingId) {
      updated = doctors.map((doctor) =>
        doctor.id === editingId ? { ...doctor, ...form } : doctor
      );
    } else {
      const newDoctor = {
        ...form,
        id: `D${Date.now()}`,
        color: "#087F75"
      };
      updated = [newDoctor, ...doctors];
    }

    saveDoctors(updated);
    setDoctors(updated);
    setForm(emptyDoctor);
    setEditingId(null);
  }

  function editDoctor(doctor) {
    setForm({ ...doctor });
    setEditingId(doctor.id);
  }

  function removeDoctor(id) {
    if (!window.confirm("Remove this doctor from the doctor list?")) return;

    const updated = doctors.filter((doctor) => doctor.id !== id);
    saveDoctors(updated);
    setDoctors(updated);
  }

  function toggleLanguage(language) {
    setForm((old) => ({
      ...old,
      language: old.language.includes(language)
        ? old.language.filter((item) => item !== language)
        : [...old.language, language]
    }));
  }

  return (
    <div className="portal-page admin-theme">
      <h2>Doctor Management</h2>
      <p>Total doctors: {doctors.length}</p>

      <form className="portal-form" onSubmit={saveDoctor}>
        <h3>{editingId ? "Edit Doctor" : "Add New Doctor"}</h3>

        <label>Doctor Name</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label>Username for Doctor Login</label>
        <input
          required
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <label>Demo Password</label>
        <input
          required
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <label>Department</label>
        <input
          required
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />

        <label>Qualification</label>
        <input
          value={form.qualification}
          onChange={(e) => setForm({ ...form, qualification: e.target.value })}
        />

        <label>Experience</label>
        <input
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
        />

        <label>Mobile Number</label>
        <input
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <label>Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label>Consultation Fee</label>
        <input
          type="number"
          min="0"
          value={form.fee}
          onChange={(e) => setForm({ ...form, fee: Number(e.target.value) })}
        />

        <label>Languages Spoken</label>
        {LANGUAGES.map((language) => (
          <label key={language}>
            <input
              type="checkbox"
              checked={form.language.includes(language)}
              onChange={() => toggleLanguage(language)}
            />
            {language}
          </label>
        ))}

        <button type="submit">
          {editingId ? "Save Doctor Changes" : "Add Doctor"}
        </button>

        {editingId && (
          <button
            type="button"
            className="danger-button"
            onClick={() => {
              setEditingId(null);
              setForm(emptyDoctor);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h3>Hospital Doctors</h3>

      {doctors.map((doctor) => (
        <div className="appointment-card" key={doctor.id}>
          <h3>{doctor.name}</h3>
          <p>Doctor ID: {doctor.id}</p>
          <p>Department: {doctor.department}</p>
          <p>Qualification: {doctor.qualification}</p>
          <p>Experience: {doctor.experience}</p>
          <p>Mobile: {doctor.phone}</p>
          <p>Email: {doctor.email}</p>
          <p>Languages: {doctor.language?.join(", ")}</p>
          <p>Fee: ₹{doctor.fee}</p>

          <button onClick={() => editDoctor(doctor)}>Edit</button>
          <button
            className="danger-button"
            onClick={() => removeDoctor(doctor.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Doctors;