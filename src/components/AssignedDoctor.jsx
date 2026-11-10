import React, { useEffect, useState } from "react";
import { getPatients, getDoctors } from "../data/storage";

function AssignedDoctor() {
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

  const user = JSON.parse(
    localStorage.getItem("citycareUser") || "{}"
  );

  const patientId = user.id || user.patientId;

  const patient = patients.find(
    (item) => String(item.id) === String(patientId)
  );

  const doctor = doctors.find(
    (item) => item.id === patient?.assignedDoctorId
  );

  return (
    <div className="appointment-card">
      <h3>My Assigned Doctor</h3>

      {doctor ? (
        <>
          <p>Name: {doctor.name}</p>
          <p>Department: {doctor.department}</p>
          <p>Qualification: {doctor.qualification}</p>
          <p>Experience: {doctor.experience}</p>
          <p>Languages: {doctor.language?.join(", ")}</p>
          <p>Contact: {doctor.phone}</p>
        </>
      ) : (
        <p>You do not have a doctor assigned yet.</p>
      )}
    </div>
  );
}

export default AssignedDoctor;