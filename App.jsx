
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";

// Main pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// Navigation
import Navbar from "./components/Navbar";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Doctors from "./pages/admin/Doctors";
import Patients from "./pages/admin/Patients";
import Appointments from "./pages/admin/Appointments";
import Staff from "./pages/admin/Staff";
import Resources from "./pages/admin/Resources";

// Doctor pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorPatients from "./pages/doctor/DoctorPatients";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import MedicalRecords from "./pages/doctor/MedicalRecords";

// Patient pages
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientProfile from "./pages/patient/PatientProfile";
import FindDoctors from "./pages/patient/FIndDoctors.jsx";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointments from "./pages/patient/MyAppointments";

// Authentication pages
import AdminLogin from "./pages/auth/AdminLogin";
import DoctorLogin from "./pages/auth/DoctorLogin";
import PatientLogin from "./pages/auth/PatientLogin";
import Register from "./pages/auth/Register";

// ---------------------------------
// Protected Route
// ---------------------------------

function ProtectedRoute({ children, role }) {
  let user = null;

  try {
    user = JSON.parse(
      localStorage.getItem("citycareUser") || "null"
    );
  } catch (error) {
    localStorage.removeItem("citycareUser");
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// ---------------------------------
// Navigation Tabs
// ---------------------------------

const adminTabs = [
  { name: "Dashboard", path: "/admin" },
  { name: "Doctors", path: "/admin/doctors" },
  { name: "Patients", path: "/admin/patients" },
  { name: "Appointments", path: "/admin/appointments" },
  { name: "Staff", path: "/admin/staff" },
  { name: "Resources", path: "/admin/resources" },
];

const doctorTabs = [
  { name: "Dashboard", path: "/doctor" },
  { name: "My Profile", path: "/doctor/profile" },
  { name: "Patients", path: "/doctor/patients" },
  { name: "Appointments", path: "/doctor/appointments" },
  { name: "Medical Records", path: "/doctor/records" },
];

const patientTabs = [
  { name: "Dashboard", path: "/patient" },
  { name: "My Profile", path: "/patient/profile" },
  { name: "Find Doctors", path: "/patient/doctors" },
  { name: "Book Appointment", path: "/patient/book" },
  { name: "My Appointments", path: "/patient/appointments" },
];

// ---------------------------------
// Role Tabs Component
// ---------------------------------

function RoleTabs({ tabs }) {
  return (
    <div className="role-tabs">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={
            tab.path === "/admin" ||
            tab.path === "/doctor" ||
            tab.path === "/patient"
          }
          className={({ isActive }) =>
            isActive ? "tab active-tab" : "tab"
          }
        >
          {tab.name}
        </NavLink>
      ))}
    </div>
  );
}

// ---------------------------------
// Logout Button
// ---------------------------------

function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("citycareUser");
    navigate("/", { replace: true });
  }

  return (
    <button
      type="button"
      className="logout-button"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

// ---------------------------------
// Portal Layouts
// ---------------------------------

function AdminLayout({ children }) {
  return (
    <main className="container admin-page">
      <h1>Admin Portal</h1>
      <RoleTabs tabs={adminTabs} />
      <LogoutButton />
      {children}
    </main>
  );
}

function DoctorLayout({ children }) {
  return (
    <main className="container doctor-page">
      <h1>Doctor Portal</h1>
      <RoleTabs tabs={doctorTabs} />
      <LogoutButton />
      {children}
    </main>
  );
}

function PatientLayout({ children }) {
  return (
    <main className="container patient-page">
      <h1>Patient Portal</h1>
      <RoleTabs tabs={patientTabs} />
      <LogoutButton />
      {children}
    </main>
  );
}

// ---------------------------------
// Main App
// ---------------------------------

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Login Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/patient-login" element={<PatientLogin />} />

        {/* Compatibility Login Routes */}
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/doctor" element={<DoctorLogin />} />
        <Route path="/login/patient" element={<PatientLogin />} />

        {/* Registration Routes */}
        <Route
          path="/register/:role"
          element={<Register />}
        />

        <Route
          path="/doctor-register"
          element={<Navigate to="/register/doctor" replace />}
        />

        <Route
          path="/patient-register"
          element={<Navigate to="/register/patient" replace />}
        />

        {/* --------------------------------- */}
        {/* ADMIN ROUTES */}
        {/* --------------------------------- */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/doctors"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <Doctors />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/patients"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <Patients />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <Appointments />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/staff"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <Staff />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/resources"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <Resources />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* --------------------------------- */}
        {/* DOCTOR ROUTES */}
        {/* --------------------------------- */}

        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="doctor">
              <DoctorLayout>
                <DoctorDashboard />
              </DoctorLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/profile"
          element={
            <ProtectedRoute role="doctor">
              <DoctorLayout>
                <DoctorProfile />
              </DoctorLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/patients"
          element={
            <ProtectedRoute role="doctor">
              <DoctorLayout>
                <DoctorPatients />
              </DoctorLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute role="doctor">
              <DoctorLayout>
                <DoctorAppointments />
              </DoctorLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/records"
          element={
            <ProtectedRoute role="doctor">
              <DoctorLayout>
                <MedicalRecords />
              </DoctorLayout>
            </ProtectedRoute>
          }
        />

        {/* --------------------------------- */}
        {/* PATIENT ROUTES */}
        {/* --------------------------------- */}

        <Route
          path="/patient"
          element={
            <ProtectedRoute role="patient">
              <PatientLayout>
                <PatientDashboard />
              </PatientLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/profile"
          element={
            <ProtectedRoute role="patient">
              <PatientLayout>
                <PatientProfile />
              </PatientLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/doctors"
          element={
            <ProtectedRoute role="patient">
              <PatientLayout>
                <FindDoctors />
              </PatientLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/book"
          element={
            <ProtectedRoute role="patient">
              <PatientLayout>
                <BookAppointment />
              </PatientLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/appointments"
          element={
            <ProtectedRoute role="patient">
              <PatientLayout>
                <MyAppointments />
              </PatientLayout>
            </ProtectedRoute>
          }
        />

        {/* --------------------------------- */}
        {/* 404 ROUTE */}
        {/* --------------------------------- */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
