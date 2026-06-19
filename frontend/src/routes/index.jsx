import { Routes, Route, Navigate } from "react-router-dom";

// AUTH
import Login from "../pages/users/Login";
import ProtectedRoute from "../components/ProtectedRoute";

// LAYOUTS
import AdminLayout from "../layouts/AdminLayout";

// ADMIN MIS
import AdminDashboard from "../pages/dashboards/AdminDashboard";
import UsersList from "../pages/users/UsersList";
import CompanyInfo from "../pages/company/CompanyInfo";
import CompanyDocuments from "../pages/company/CompanyDocuments";
import EmployeePage from "../pages/employee/EmployeePage";
import EmpDocumentPage from "../pages/employee/EmpDocumentPage";
import EmployeeHiringPage from "../pages/employee/EmployeeHiringPage";
import EmployeeSalaryPage from "../pages/employee/EmployeeSalaryPage";
import EnployeeSalaryPayment from "../pages/employee/SalaryPaymentPage";
import EmployeeWorkExperiencePage from "../pages/employee/EmployeeWorkExperiencePage";
import CustomerPage from "../pages/customer/CustomerPage";
import SupplierPage from "../pages/supplier/SupplierPage";
import MaterialPage from "../pages/materials/MaterialPage";
import OrderPage from "../pages/orders/OrderPage";
import OrderItemPage from "../pages/orders/OrderItemPage";
import StockTransactionPage from "../pages/stock/StockTransactionPage";
import ExpensePage from "../pages/expenses/ExpensePage";
import InvoicePage from "../pages/invoices/InvoicePage";
import PaymentPage from "../pages/payments/PaymentPage";
import CashTransactionPage from "../pages/payments/CashTransactionPage";
import EquipmentPage from "../pages/equipment/EquipmentPage";

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
        path="/admin/customer/customer"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <CustomerPage />
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
        path="/admin/employee/employee-salary-payment"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <EnployeeSalaryPayment />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/employee/employee-salary-workExperience"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <EmployeeWorkExperiencePage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/supplier/supplierpage"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <SupplierPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/materiales/materialpage"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <MaterialPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/order/orderpage"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <OrderPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/order/orderitemespage"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <OrderItemPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/stock/StockTransactionpage"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <StockTransactionPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/expenses/expensespage"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <ExpensePage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/invoices/invoicespage"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <InvoicePage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/payment/paymentpage"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <PaymentPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/payment/cashtransactions"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <CashTransactionPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/equepment/equepmentpage"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <EquipmentPage />
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
