import { Routes, Route, Navigate } from "react-router-dom";

// AUTH
import Login from "../pages/users/Login";
import ProtectedRoute from "../components/ProtectedRoute";

// LAYOUTS
import AdminLayout from "../layouts/AdminLayout";

// ADMIN MIS
import AdminDashboard from "../pages/dashboards/AdminDashboard";
import UsersList from "../pages/users/UsersList"
import CompanyInfo from "../pages/company/CompanyInfo";
import CompanyDocuments from "../pages/company/CompanyDocuments";
import EmployeePage from "../pages/employee/EmployeePage";
import EmpDocumentPage from "../pages/employee/EmpDocumentPage";




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
        path="/admin/company/company-info"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <CompanyInfo />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
  <Route
        path="/admin/company/docments"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <CompanyDocuments />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
        <Route
        path="/admin/employee/EmployeePage"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <EmployeePage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
         <Route
        path="/admin/employee/EmpDocumentPage"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <EmpDocumentPage />
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
