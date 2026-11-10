
import { useState } from "react";

const doctors = [
  {
    id: 1,
    name: "Dr. Anil Kumar",
    specialty: "Cardiologist",
    experience: "8 years"
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialty: "Dermatologist",
    experience: "6 years"
  },
  {
    id: 3,
    name: "Dr. Rahul Verma",
    specialty: "General Physician",
    experience: "10 years"
  },
  {
    id: 4,
    name: "Dr. Sneha Reddy",
    specialty: "Pediatrician",
    experience: "7 years"
  }
];

export default function FindDoctors() {
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.name} ${doctor.specialty}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page-content">
      <h2>Find Doctors</h2>

      <input
        type="text"
        placeholder="Search by doctor name or specialty"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="doctor-list">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div className="card" key={doctor.id}>
              <h3>{doctor.name}</h3>
              <p>Specialty: {doctor.specialty}</p>
              <p>Experience: {doctor.experience}</p>
            </div>
          ))
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    </div>
  );
}
