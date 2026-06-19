import React, { useEffect, useState } from "react";
import EmployeeSalaryService from "../../services/employeeSalaryInfo.service";

export default function SalaryPaymentModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [salaryList, setSalaryList] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  const emptyForm = {
    employee_salary_id: "",
    salary_month: "",
    salary_bonus: "",
    salary_deduction: "",
    gross_salary: "",
    paid_amount: "",
    payment_date: today,
    payment_status: "pending",
  };

  const [form, setForm] = useState(emptyForm);

  // ================= LOAD SALARIES DROPDOWN =================
  useEffect(() => {
    const loadSalaries = async () => {
      try {
        const res = await EmployeeSalaryService.getAll();
        setSalaryList(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error(error);
        setSalaryList([]);
      }
    };

    if (isOpen) {
      loadSalaries();
    }
  }, [isOpen]);

  // ================= SET FORM (EDIT / CREATE) =================
  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setForm({
        employee_salary_id: initialData.employee_salary_id || "",
        salary_month: initialData.salary_month || "",
        salary_bonus: initialData.salary_bonus || "",
        salary_deduction: initialData.salary_deduction || "",
        gross_salary: initialData.gross_salary || "",
        paid_amount: initialData.paid_amount || "",
        payment_date: initialData.payment_date || today,
        payment_status: initialData.payment_status || "pending",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData, isOpen]);

  // ================= CHANGE HANDLER =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-[750px] space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          {initialData ? "Edit Salary Payment" : "Add Salary Payment"}
        </h2>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-2 gap-3">
          {/* SALARY DROPDOWN */}
          <div>
            <label className="block text-sm mb-1">Employee Salary</label>

            <select
              name="employee_salary_id"
              value={form.employee_salary_id}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select Salary</option>

              {salaryList.map((s) => (
                <option key={s.employee_salary_id} value={s.employee_salary_id}>
                  {s.employee_info?.emp_full_name || "Employee"} -{" "}
                  {s.base_salary}
                </option>
              ))}
            </select>
          </div>

          {/* SALARY MONTH (DATE PICKER) */}
          <div>
            <label className="block text-sm mb-1">Salary Month</label>

            <input
              type="date"
              name="salary_month"
              value={form.salary_month}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <input
            type="number"
            step="0.01"
            name="salary_bonus"
            placeholder="Salary Bonus"
            value={form.salary_bonus}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            step="0.01"
            name="salary_deduction"
            placeholder="Salary Deduction"
            value={form.salary_deduction}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            step="0.01"
            name="gross_salary"
            placeholder="Gross Salary"
            value={form.gross_salary}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            step="0.01"
            name="paid_amount"
            placeholder="Paid Amount"
            value={form.paid_amount}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          {/* PAYMENT DATE DEFAULT TODAY */}
          <div>
            <label className="block text-sm mb-1">Payment Date</label>

            <input
              type="date"
              name="payment_date"
              value={form.payment_date || today}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="block text-sm mb-1">Payment Status</label>

            <select
              name="payment_status"
              value={form.payment_status}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* ================= BUTTONS ================= */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {initialData ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
