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
import EmployeeHiringPage from "../pages/employee/EmployeeHiringPage";
import EmployeeSalaryPage from './../pages/employee/EmployeeSalaryPage';




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
        path="/admin/employee/employee-list"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <EmployeePage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
         <Route
        path="/admin/employee/employee-documents"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <EmpDocumentPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

         <Route
        path="/admin/employee/employee-hiring"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <EmployeeHiringPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
           <Route
        path="/admin/employee/employee-salary"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <EmployeeSalaryPage />
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
