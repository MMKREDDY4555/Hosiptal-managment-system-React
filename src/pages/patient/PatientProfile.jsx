export default function PatientProfile() {
  const user = JSON.parse(localStorage.getItem("citycareUser") || "{}");

  return (
    <div className="page">
      <h1>My Profile</h1>

      <div className="card">
        <h3>Name: {user.name || "Patient Name"}</h3>
        <p>Role: Patient</p>
        <p>Hospital: CityCare Hospital</p>
      </div>
    </div>
  );
}