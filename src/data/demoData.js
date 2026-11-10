export const LANGUAGES = ["English", "Hindi", "Telugu"];

export const initialDoctors = [
  {
    id: "D001",
    name: "Dr. Ananya Rao",
    username: "ananya",
    password: "doctor123",
    department: "Cardiology",
    qualification: "MBBS, MD Cardiology",
    experience: "12 years",
    phone: "9000000001",
    email: "ananya@example.com",
    language: ["English", "Telugu"],
    available: true,
    fee: 700,
    color: "#087F75"
  },
  {
    id: "D002",
    name: "Dr. Rahul Sharma",
    username: "rahul",
    password: "doctor123",
    department: "General Medicine",
    qualification: "MBBS, MD",
    experience: "9 years",
    phone: "9000000002",
    email: "rahul@example.com",
    language: ["English", "Hindi"],
    available: true,
    fee: 500,
    color: "#087F75"
  },
  {
    id: "D003",
    name: "Dr. Sravani Reddy",
    username: "sravani",
    password: "doctor123",
    department: "Pediatrics",
    qualification: "MBBS, DCH",
    experience: "7 years",
    phone: "9000000003",
    email: "sravani@example.com",
    language: ["English", "Telugu", "Hindi"],
    available: true,
    fee: 600,
    color: "#087F75"
  },
  {
    id: "D004",
    name: "Dr. Imran Khan",
    username: "imran",
    password: "doctor123",
    department: "Dermatology",
    qualification: "MBBS, MD Dermatology",
    experience: "10 years",
    phone: "9000000004",
    email: "imran@example.com",
    language: ["English", "Hindi"],
    available: true,
    fee: 650,
    color: "#087F75"
  },
  {
    id: "D005",
    name: "Dr. Meera Lakshmi",
    username: "meera",
    password: "doctor123",
    department: "Orthopedics",
    qualification: "MBBS, MS Orthopedics",
    experience: "11 years",
    phone: "9000000005",
    email: "meera@example.com",
    language: ["English", "Telugu"],
    available: true,
    fee: 750,
    color: "#087F75"
  }
];

export const initialPatients = [
  {
    id: "P001",
    name: "Arjun Kumar",
    username: "arjun",
    password: "patient123",
    age: 28,
    gender: "Male",
    phone: "9100000001",
    email: "arjun@example.com",
    city: "Markapur",
    language: "Telugu"
  },
  {
    id: "P002",
    name: "Priya Sharma",
    username: "priya",
    password: "patient123",
    age: 32,
    gender: "Female",
    phone: "9100000002",
    email: "priya@example.com",
    city: "Markapur",
    language: "Hindi"
  },
  {
    id: "P003",
    name: "Kiran Reddy",
    username: "kiran",
    password: "patient123",
    age: 24,
    gender: "Male",
    phone: "9100000003",
    email: "kiran@example.com",
    city: "Ongole",
    language: "Telugu"
  },
  {
    id: "P004",
    name: "Neha Verma",
    username: "neha",
    password: "patient123",
    age: 35,
    gender: "Female",
    phone: "9100000004",
    email: "neha@example.com",
    city: "Guntur",
    language: "English"
  },
  {
    id: "P005",
    name: "Sai Teja",
    username: "saiteja",
    password: "patient123",
    age: 41,
    gender: "Male",
    phone: "9100000005",
    email: "saiteja@example.com",
    city: "Markapur",
    language: "Telugu"
  }
];

export const initialAppointments = [
  {
    id: "A001",
    patientId: "P001",
    patientName: "Arjun Kumar",
    doctorId: "D001",
    doctorName: "Dr. Ananya Rao",
    department: "Cardiology",
    date: "2026-11-10",
    time: "10:00",
    language: "Telugu",
    reason: "General consultation",
    status: "Pending",
    doctorNote: "",
    createdAt: "2026-11-03"
  },
  {
    id: "A002",
    patientId: "P002",
    patientName: "Priya Sharma",
    doctorId: "D002",
    doctorName: "Dr. Rahul Sharma",
    department: "General Medicine",
    date: "2026-11-11",
    time: "11:30",
    language: "Hindi",
    reason: "Routine check-up",
    status: "Accepted",
    doctorNote: "Appointment confirmed",
    createdAt: "2026-11-03"
  },
  {
    id: "A003",
    patientId: "P003",
    patientName: "Kiran Reddy",
    doctorId: "D003",
    doctorName: "Dr. Sravani Reddy",
    department: "Pediatrics",
    date: "2026-11-12",
    time: "09:30",
    language: "Telugu",
    reason: "Consultation",
    status: "Pending",
    doctorNote: "",
    createdAt: "2026-11-03"
  }
];

export const initialStaff = [
  {
    id: "S001",
    name: "Vijay Kumar",
    role: "Receptionist",
    department: "Front Office",
    phone: "9200000001",
    shift: "Morning",
    status: "Active"
  },
  {
    id: "S002",
    name: "Lakshmi Devi",
    role: "Nurse",
    department: "General Ward",
    phone: "9200000002",
    shift: "Evening",
    status: "Active"
  },
  {
    id: "S003",
    name: "Mohammed Ali",
    role: "Lab Technician",
    department: "Laboratory",
    phone: "9200000003",
    shift: "Morning",
    status: "Active"
  },
  {
    id: "S004",
    name: "Divya Rao",
    role: "Pharmacist",
    department: "Pharmacy",
    phone: "9200000004",
    shift: "Night",
    status: "Active"
  }
];

export const initialResources = [
  {
    id: "R001",
    name: "General Ward",
    category: "Ward",
    total: 40,
    available: 18,
    status: "Available"
  },
  {
    id: "R002",
    name: "ICU Beds",
    category: "Critical Care",
    total: 12,
    available: 4,
    status: "Limited"
  },
  {
    id: "R003",
    name: "Wheelchairs",
    category: "Equipment",
    total: 20,
    available: 14,
    status: "Available"
  },
  {
    id: "R004",
    name: "Ventilators",
    category: "Equipment",
    total: 10,
    available: 3,
    status: "Limited"
  }
];