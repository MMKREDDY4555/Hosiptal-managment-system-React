import {
  initialDoctors,
  initialPatients,
  initialAppointments,
  initialStaff,
  initialResources
} from "./demoData";

const KEYS = {
  doctors: "citycareDoctors",
  patients: "citycarePatients",
  appointments: "citycareAppointments",
  staff: "citycareStaff",
  resources: "citycareResources"
};

// Read saved data or use demo data
function readData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error(`Could not read ${key}:`, error);
    return fallback;
  }
}

// Save data and notify all open pages in this browser
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  window.dispatchEvent(new Event("citycare-update"));
}

// GET functions
export const getDoctors = () =>
  readData(KEYS.doctors, initialDoctors);

export const getPatients = () =>
  readData(KEYS.patients, initialPatients);

export const getAppointments = () =>
  readData(KEYS.appointments, initialAppointments);

export const getStaff = () =>
  readData(KEYS.staff, initialStaff);

export const getResources = () =>
  readData(KEYS.resources, initialResources);

// SAVE functions
export const saveDoctors = (data) =>
  saveData(KEYS.doctors, data);

export const savePatients = (data) =>
  saveData(KEYS.patients, data);

export const saveAppointments = (data) =>
  saveData(KEYS.appointments, data);

export const saveStaff = (data) =>
  saveData(KEYS.staff, data);

export const saveResources = (data) =>
  saveData(KEYS.resources, data);

// APPOINTMENT FUNCTIONS
export function addAppointment(appointment) {
  const newAppointment = {
    ...appointment,
    id: `A${Date.now()}`,
    status: "Pending",
    doctorNote: "",
    createdAt: new Date().toISOString().slice(0, 10)
  };

  saveAppointments([
    newAppointment,
    ...getAppointments()
  ]);

  return newAppointment;
}

export function updateAppointment(id, changes) {
  const updated = getAppointments().map((appointment) =>
    appointment.id === id
      ? { ...appointment, ...changes }
      : appointment
  );

  saveAppointments(updated);

  return updated.find((appointment) => appointment.id === id);
}

export function deleteAppointment(id) {
  saveAppointments(
    getAppointments().filter(
      (appointment) => appointment.id !== id
    )
  );
}

// DOCTOR FUNCTIONS
export function addDoctor(doctor) {
  const newDoctor = {
    ...doctor,
    id: `D${Date.now()}`
  };

  saveDoctors([newDoctor, ...getDoctors()]);
  return newDoctor;
}

export function updateDoctor(id, changes) {
  saveDoctors(
    getDoctors().map((doctor) =>
      doctor.id === id ? { ...doctor, ...changes } : doctor
    )
  );
}

export function deleteDoctor(id) {
  saveDoctors(
    getDoctors().filter((doctor) => doctor.id !== id)
  );
}

// PATIENT FUNCTIONS
export function addPatient(patient) {
  const newPatient = {
    ...patient,
    id: `P${Date.now()}`
  };

  savePatients([newPatient, ...getPatients()]);
  return newPatient;
}

export function updatePatient(id, changes) {
  savePatients(
    getPatients().map((patient) =>
      patient.id === id ? { ...patient, ...changes } : patient
    )
  );
}

export function deletePatient(id) {
  savePatients(
    getPatients().filter((patient) => patient.id !== id)
  );
}

// STAFF FUNCTIONS
export function addStaff(member) {
  const newMember = {
    ...member,
    id: `S${Date.now()}`
  };

  saveStaff([newMember, ...getStaff()]);
  return newMember;
}

export function updateStaff(id, changes) {
  saveStaff(
    getStaff().map((member) =>
      member.id === id ? { ...member, ...changes } : member
    )
  );
}

export function deleteStaff(id) {
  saveStaff(
    getStaff().filter((member) => member.id !== id)
  );
}

// RESOURCE FUNCTIONS
export function addResource(resource) {
  const newResource = {
    ...resource,
    id: `R${Date.now()}`
  };

  saveResources([newResource, ...getResources()]);
  return newResource;
}

export function updateResource(id, changes) {
  saveResources(
    getResources().map((resource) =>
      resource.id === id ? { ...resource, ...changes } : resource
    )
  );
}

export function deleteResource(id) {
  saveResources(
    getResources().filter((resource) => resource.id !== id)
  );
}

// RESET ALL DEMO DATA
export function resetDemoData() {
  saveDoctors(initialDoctors);
  savePatients(initialPatients);
  saveAppointments(initialAppointments);
  saveStaff(initialStaff);
  saveResources(initialResources);
}