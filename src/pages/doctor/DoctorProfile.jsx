export default function DoctorProfile() {
  const user = JSON.parse(localStorage.getItem("citycareUser") || "{}");

  return (
    <div className="page">
      <h1>Doctor Profile</h1>

      <div className="card">
        <h3>Name: {user.name || "Doctor Name"}</h3>
        <p>Role: Doctor</p>
        <p>Hospital: CityCare Hospital</p>
        <p>Specialization: General Medicine</p>
      </div>
    </div>
  );
}