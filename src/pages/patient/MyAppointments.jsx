import React from "react";
import { getPatients } from "../../data/storage";
import { useAppointments } from "../../data/useHospitalData";

export default function MyAppointments() {
  const { appointments } = useAppointments();

  const user = JSON.parse(
    localStorage.getItem("citycareUser") || "null"
  );

  const patients = getPatients();

  const patient = patients.find(
    (item) =>
      item.id === user?.id ||
      item.id === user?.patientId ||
      item.username === user?.username ||
      item.email === user?.email ||
      item.name === user?.name
  );

  const patientId =
    patient?.id ||
    user?.patientId ||
    user?.id;

  const myAppointments = appointments.filter(
    (appointment) =>
      appointment.patientId === patientId ||
      (
        user?.username &&
        appointment.patientUsername === user.username
      )
  );

  return (
    <div className="page-container">
      <h1>My Appointments</h1>
      <p>View your appointment bookings and their current status.</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <h2>{myAppointments.length}</h2>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <h2>
            {
              myAppointments.filter(
                (item) => item.status === "Pending"
              ).length
            }
          </h2>
        </div>

        <div className="stat-card">
          <h3>Approved</h3>
          <h2>
            {
              myAppointments.filter(
                (item) => item.status === "Approved"
              ).length
            }
          </h2>
        </div>
      </div>

      {myAppointments.length === 0 ? (
        <div className="empty-state">
          You have no appointments yet. Book an appointment to see it here.
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Date</th>
                <th>Time</th>
                <th>Language</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {myAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.doctorName}</td>
                  <td>{appointment.doctorDepartment || "-"}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.language}</td>
                  <td>{appointment.reason}</td>
                  <td>
                    <span
                      className={`status ${appointment.status?.toLowerCase()}`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}