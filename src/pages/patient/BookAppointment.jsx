import React, { useState } from "react";
import {
  getDoctors,
  getPatients
} from "../../data/storage";
import { useAppointments } from "../../data/useHospitalData";

export default function BookAppointment() {
  const { add } = useAppointments();

  const user = JSON.parse(
    localStorage.getItem("citycareUser") || "null"
  );

  const doctors = getDoctors();
  const patients = getPatients();

  const patient = patients.find(
    (item) =>
      item.id === user?.id ||
      item.id === user?.patientId ||
      item.username === user?.username ||
      item.email === user?.email ||
      item.name === user?.name
  );

  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [language, setLanguage] = useState("English");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleBooking(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    const selectedDoctor = doctors.find(
      (doctor) => doctor.id === doctorId
    );

    if (!selectedDoctor) {
      setError("Please select a doctor.");
      return;
    }

    if (!user) {
      setError("Please log in as a patient first.");
      return;
    }

    if (!date || !time) {
      setError("Please select an appointment date and time.");
      return;
    }

    if (date < new Date().toISOString().slice(0, 10)) {
      setError("Please select today or a future date.");
      return;
    }

    const appointment = {
      patientId:
        patient?.id ||
        user.patientId ||
        user.id ||
        user.username,

      patientName:
        patient?.name ||
        user.name ||
        user.username ||
        "Patient",

      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorDepartment: selectedDoctor.department || "",

      date,
      time,
      language,
      reason,

      patientUsername: user.username || ""
    };

    add(appointment);

    setMessage(
      "Appointment booked successfully! You can check its status in My Appointments."
    );

    setDoctorId("");
    setDate("");
    setTime("");
    setLanguage("English");
    setReason("");
  }

  return (
    <div className="page-container">

      <div
        style={{
          borderRadius: "14px",
          overflow: "hidden",
          marginBottom: "25px",
          position: "relative",
          minHeight: "190px"
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=85"
          alt="Hospital interior"
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
            display: "block"
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(20, 65, 90, 0.55)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "25px",
            color: "white"
          }}
        >
          <h1 style={{ color: "white" }}>
            Book Your Appointment
          </h1>
          <p>
            Choose a doctor and a convenient appointment time.
          </p>
        </div>
      </div>

      <div className="form-card">
        <h2>Appointment Details</h2>

        <form
          className="portal-form"
          onSubmit={handleBooking}
        >
          <label>Select Doctor</label>

          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            <option value="">Choose a doctor</option>

            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.department}
              </option>
            ))}
          </select>

          <label>Appointment Date</label>

          <input
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label>Appointment Time</label>

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <label>Preferred Language</label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Telugu</option>
          </select>

          <label>Reason for Appointment</label>

          <textarea
            placeholder="Enter a short reason (use fictional demo details)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />

          {error && (
            <p className="error-message">{error}</p>
          )}

          {message && (
            <p className="success-message">{message}</p>
          )}

          <button type="submit">
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}