import React from "react";
import { useAppointments } from "../../data/useHospitalData";

export default function Appointments() {
  const { appointments, update } = useAppointments();

  function changeStatus(id, status) {
    update(id, { status });
  }

  const pendingCount = appointments.filter(
    (item) => item.status === "Pending"
  ).length;

  const approvedCount = appointments.filter(
    (item) => item.status === "Approved"
  ).length;

  const rejectedCount = appointments.filter(
    (item) => item.status === "Rejected"
  ).length;

  return (
    <div className="page-container">

      <div
        style={{
          borderRadius: "14px",
          overflow: "hidden",
          marginBottom: "25px",
          position: "relative"
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1400&q=85"
          alt="Hospital reception"
          style={{
            width: "100%",
            height: "210px",
            objectFit: "cover",
            display: "block"
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(15, 50, 85, 0.62)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "25px",
            color: "white"
          }}
        >
          <h1 style={{ color: "white" }}>
            Appointment Management
          </h1>
          <p>
            Review and manage all hospital appointments.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Appointments</h3>
          <h2>{appointments.length}</h2>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <h2>{pendingCount}</h2>
        </div>

        <div className="stat-card">
          <h3>Approved</h3>
          <h2>{approvedCount}</h2>
        </div>

        <div className="stat-card">
          <h3>Rejected</h3>
          <h2>{rejectedCount}</h2>
        </div>
      </div>

      <h2>All Patient Appointments</h2>

      {appointments.length === 0 ? (
        <div className="empty-state">
          No appointments have been booked yet.
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Date</th>
                <th>Time</th>
                <th>Language</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Admin Action</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.patientName}</td>
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
                      <select
                        value={appointment.status}
                        onChange={(e) =>
                          changeStatus(
                            appointment.id,
                            e.target.value
                          )
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Completed">Completed</option>
                      </select>
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