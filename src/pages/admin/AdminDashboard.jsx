import AdminTabs from "../../components/AdminTabs";

export default function AdminDashboard() {
  return (
    <div className="page">
      <h1>Admin Dashboard</h1>
      <AdminTabs />

      <div className="dashboard-grid">
        <div className="card">
          <h3>Total Doctors</h3>
          <h2>12</h2>
        </div>

        <div className="card">
          <h3>Total Patients</h3>
          <h2>150</h2>
        </div>

        <div className="card">
          <h3>Appointments</h3>
          <h2>35</h2>
        </div>

        <div className="card">
          <h3>Hospital Staff</h3>
          <h2>20</h2>
        </div>
      </div>
    </div>
  );
}