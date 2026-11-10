import DoctorTabs from "../../components/DoctorTabs";

export default function DoctorDashboard() {
  return (
    <div className="page">
      <h1>Doctor Dashboard</h1>
      <DoctorTabs />

      <div className="dashboard-grid">
        <div className="card">
          <h3>My Patients</h3>
          <h2>25</h2>
        </div>

        <div className="card">
          <h3>Appointments</h3>
          <h2>8</h2>
        </div>

        <div className="card">
          <h3>Pending Appointments</h3>
          <h2>3</h2>
        </div>
      </div>
    </div>
  );
}