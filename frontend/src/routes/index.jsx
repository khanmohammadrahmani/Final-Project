import { Routes, Route, Navigate } from "react-router-dom";

// AUTH
import Login from "../pages/users/Login";
import ProtectedRoute from "../components/ProtectedRoute";

// LAYOUTS
import AdminLayout from "../layouts/AdminLayout";

// ADMIN MIS
import AdminDashboard from "../pages/dashboards/AdminDashboard";
import UsersList from "../pages/users/UsersList"

export default function AppRoutes() {
  return (
    <Routes>
      {/* ROOT → PUBLIC HOME */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* MIS LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* ADMIN */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
         <Route
        path="/admin/users/users-list"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <UsersList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* ------------------------------------------------------------------------------ */}

      {/* WEBSITE ADMIN
      <Route
        path="/website-admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["Website_Admin"]}>
            <WebAdminLayout>
              <WebAdminDashboard />
            </WebAdminLayout>
          </ProtectedRoute>
        }
      /> */}

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
