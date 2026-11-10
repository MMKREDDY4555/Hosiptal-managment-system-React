import React from "react";
import { useAppointments } from "../../data/useHospitalData";

export default function DoctorAppointments() {
  const { appointments, update } = useAppointments();

  const user = JSON.parse(
    localStorage.getItem("citycareUser") || "null"
  );

  const myAppointments = appointments.filter(
    (appointment) =>
      appointment.doctorId === user?.id ||
      (
        appointment.doctorName &&
        appointment.doctorName === user?.name
      )
  );

  function changeStatus(id, status) {
    update(id, { status });
  }

  return (
    <div className="page-container">
      <h1>Doctor Appointments</h1>
      <p>View and manage appointments assigned to you.</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Appointments</h3>
          <h2>{myAppointments.length}</h2>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <h2>
            {myAppointments.filter(
              (item) => item.status === "Pending"
            ).length}
          </h2>
        </div>

        <div className="stat-card">
          <h3>Approved</h3>
          <h2>
            {myAppointments.filter(
              (item) => item.status === "Approved"
            ).length}
          </h2>
        </div>
      </div>

      {myAppointments.length === 0 ? (
        <div className="empty-state">
          No appointments have been assigned to you yet.
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Patient</th>
                <th>Date</th>
                <th>Time</th>
                <th>Language</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {myAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.patientName}</td>
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

                  <td>
                    {appointment.status === "Pending" ? (
                      <div className="button-group">
                        <button
                          className="success-button"
                          onClick={() =>
                            changeStatus(
                              appointment.id,
                              "Approved"
                            )
                          }
                        >
                          Accept
                        </button>

                        <button
                          className="danger-button"
                          onClick={() =>
                            changeStatus(
                              appointment.id,
                              "Rejected"
                            )
                          }
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span>Updated</span>
                    )}
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