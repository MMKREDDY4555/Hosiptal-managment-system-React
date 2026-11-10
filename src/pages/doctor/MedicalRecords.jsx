import { useState } from "react";

export default function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [patient, setPatient] = useState("");
  const [notes, setNotes] = useState("");

  function addRecord(e) {
    e.preventDefault();

    setRecords([
      ...records,
      { id: Date.now(), patient, notes }
    ]);

    setPatient("");
    setNotes("");
  }

  return (
    <div className="page">
      <h1>Medical Records</h1>

      <form className="form-card" onSubmit={addRecord}>
        <input
          placeholder="Patient Name"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          required
        />

        <textarea
          placeholder="Enter demo medical notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          required
        />

        <button className="btn">Save Record</button>
      </form>

      {records.map((record) => (
        <div className="card" key={record.id}>
          <h3>{record.patient}</h3>
          <p>{record.notes}</p>
        </div>
      ))}
    </div>
  );
}