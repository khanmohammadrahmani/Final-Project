import React, { useEffect, useState } from "react";

import EmpSalaryPaymentService from "../../services/salaryPaymentService";
import SalaryPaymentModal from "../../components/employee/SalaryPaymentModal";

export default function SalaryPaymentPage() {
  const [payments, setPayments] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================= LOAD DATA =================
  const loadData = async () => {
    setLoading(true);

    try {
      const res = await EmpSalaryPaymentService.getAll();
      setPayments(res.data?.data || res.data || []);
    } catch (error) {
      console.error("Error loading payments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ================= SAVE =================
  const handleSubmit = async (data) => {
    try {
      if (edit) {
        await EmpSalaryPaymentService.update(edit.payment_id, data);
      } else {
        await EmpSalaryPaymentService.create(data);
      }

      setOpen(false);
      setEdit(null);
      loadData();
    } catch (error) {
      console.error("Save Error", error);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await EmpSalaryPaymentService.delete(id);
      loadData();
    } catch (error) {
      console.error("Delete Error", error);
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employee Salary Payments</h1>

        <button
          onClick={() => {
            setEdit(null);
            setOpen(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add Payment
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>

              {/* Employee info column */}
              <th className="p-3">Employee</th>

              <th className="p-3">Month</th>
              <th className="p-3">Bonus</th>
              <th className="p-3">Deduction</th>
              <th className="p-3">Gross Salary</th>
              <th className="p-3">Paid Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : payments.length > 0 ? (
              payments.map((row) => (
                <tr key={row.payment_id} className="border-t">
                  <td className="p-3">{row.payment_id}</td>

                  {/* ✅ Employee name + ID */}
                  <td className="p-3">
                    {row.employee_salary_info?.employee_info?.emp_full_name
                      ? `${row.employee_salary_info.employee_info.emp_full_name} (ID: ${row.employee_salary_id})`
                      : `ID: ${row.employee_salary_id}`}
                  </td>

                  <td className="p-3">{row.salary_month}</td>
                  <td className="p-3">{row.salary_bonus}</td>
                  <td className="p-3">{row.salary_deduction}</td>
                  <td className="p-3">{row.gross_salary}</td>
                  <td className="p-3">{row.paid_amount}</td>
                  <td className="p-3">{row.payment_status}</td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => {
                        setEdit(row);
                        setOpen(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(row.payment_id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-4 text-center">
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <SalaryPaymentModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEdit(null);
        }}
        onSubmit={handleSubmit}
        initialData={edit}
      />
    </div>
  );
}
