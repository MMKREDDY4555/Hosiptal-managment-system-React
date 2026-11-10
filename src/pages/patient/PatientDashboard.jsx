import PatientTabs from "../../components/PatientTabs";
import AssignedDoctor from "../../components/AssignedDoctor";

export default function PatientDashboard() {
  return (
    <div className="page">
      <h1>Patient Dashboard</h1>
      <PatientTabs />
      <AssignedDoctor />
      <div className="dashboard-grid">
        <div className="card">
          <h3>My Appointments</h3>
          <h2>2</h2>
        </div>

        <div className="card">
          <h3>Completed Appointments</h3>
          <h2>1</h2>
        </div>

        <div className="card">
          <h3>Pending Appointments</h3>
          <h2>1</h2>
        </div>
      </div>
    </div>
  );
}