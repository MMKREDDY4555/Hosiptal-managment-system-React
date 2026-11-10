import React, { useEffect, useState } from "react";
import { getPatients } from "../../data/storage";
import { useAppointments } from "../../data/useHospitalData";

function DoctorPatients() {
  const { appointments } = useAppointments();
  const [patients, setPatients] = useState(getPatients());

  useEffect(() => {
    const refresh = () => setPatients(getPatients());

    window.addEventListener("citycare-update", refresh);
    return () => window.removeEventListener("citycare-update", refresh);
  }, []);

  const user = JSON.parse(
    localStorage.getItem("citycareUser") || "{}"
  );

  const doctorId = user.id || user.doctorId;

  const assignedPatients = patients.filter(
    (patient) =>
      String(patient.assignedDoctorId) === String(doctorId)
  );

  const appointmentPatientIds = appointments
    .filter((item) => String(item.doctorId) === String(doctorId))
    .map((item) => String(item.patientId));

  const appointmentPatients = patients.filter(
    (patient) => appointmentPatientIds.includes(String(patient.id))
  );

  const combinedPatients = [
    ...new Map(
      [...assignedPatients, ...appointmentPatients].map((patient) => [
        String(patient.id),
        patient
      ])
    ).values()
  ];

  return (
    <div className="portal-page doctor-theme">
      <h2>My Patients</h2>

      <div className="appointment-card">
        <h3>Total Assigned Patients: {combinedPatients.length}</h3>
      </div>

      {combinedPatients.length === 0 ? (
        <p>No patients are assigned to your account yet.</p>
      ) : (
        combinedPatients.map((patient) => {
          const patientAppointments = appointments.filter(
            (item) =>
              String(item.patientId) === String(patient.id) &&
              String(item.doctorId) === String(doctorId)
          );

          return (
            <div className="appointment-card" key={patient.id}>
              <h3>{patient.name}</h3>
              <p>Patient ID: {patient.id}</p>
              <p>Age: {patient.age ?? "Not provided"}</p>
              <p>Gender: {patient.gender || "Not provided"}</p>
              <p>Mobile: {patient.phone || "Not provided"}</p>
              <p>Email: {patient.email || "Not provided"}</p>
              <p>City: {patient.city || "Not provided"}</p>
              <p>Language: {patient.language || "English"}</p>

              <p>
                Assignment:{" "}
                {String(patient.assignedDoctorId) === String(doctorId)
                  ? "Assigned by Admin"
                  : "Appointment"}
              </p>

              <h4>Appointments with you</h4>

              {patientAppointments.length === 0 ? (
                <p>No appointment booked yet.</p>
              ) : (
                patientAppointments.map((item) => (
                  <p key={item.id}>
                    {item.date} at {item.time} — {item.status}
                  </p>
                ))
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default DoctorPatients;