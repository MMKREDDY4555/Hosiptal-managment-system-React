import React, { useEffect, useState } from "react";
import {
  getPatients,
  getDoctors,
  updatePatient
} from "../../data/storage";

function Patients() {
  const [patients, setPatients] = useState(getPatients());
  const [doctors, setDoctors] = useState(getDoctors());

  useEffect(() => {
    const refresh = () => {
      setPatients(getPatients());
      setDoctors(getDoctors());
    };

    window.addEventListener("citycare-update", refresh);
    return () => window.removeEventListener("citycare-update", refresh);
  }, []);

  function assignDoctor(patientId, doctorId) {
    const doctor = doctors.find((item) => item.id === doctorId);

    updatePatient(patientId, {
      assignedDoctorId: doctor ? doctor.id : "",
      assignedDoctorName: doctor ? doctor.name : ""
    });

    setPatients(getPatients());
  }

  return (
    <div className="portal-page admin-theme">
      <h2>Patient Management</h2>
      <p>Total registered patients: {patients.length}</p>

      {patients.map((patient) => (
        <div className="appointment-card" key={patient.id}>
          <h3>{patient.name}</h3>
          <p>Patient ID: {patient.id}</p>
          <p>Age: {patient.age ?? "Not provided"}</p>
          <p>Gender: {patient.gender || "Not provided"}</p>
          <p>Mobile: {patient.phone || "Not provided"}</p>
          <p>Email: {patient.email || "Not provided"}</p>
          <p>City: {patient.city || "Not provided"}</p>
          <p>Preferred language: {patient.language || "English"}</p>

          <label>Assign Doctor</label>
          <select
            value={patient.assignedDoctorId || ""}
            onChange={(e) => assignDoctor(patient.id, e.target.value)}
          >
            <option value="">Not assigned</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} — {doctor.department}
              </option>
            ))}
          </select>

          <p>
            Currently assigned to:{" "}
            <strong>{patient.assignedDoctorName || "No doctor assigned"}</strong>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Patients;