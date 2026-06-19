import React, { useEffect, useState } from "react";
import EmployeeService from "../../services/employee.service";

export default function EmployeeSalaryModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    employee_id: "",
    base_salary: "",
    allowance: "",
    meal_allowance: "",
    transport_allowance: "",
    mobile_allowance: "",
    effective_from: "",
    effective_to: "",
    is_active: true,
  });

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await EmployeeService.getAll();

        setEmployees(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error(error);
        setEmployees([]);
      }
    };

    if (isOpen) {
      loadEmployees();
    }

    if (initialData) {
      setForm({
        employee_id: initialData.employee_id || "",
        base_salary: initialData.base_salary || "",
        allowance: initialData.allowance || "",
        meal_allowance: initialData.meal_allowance || "",
        transport_allowance: initialData.transport_allowance || "",
        mobile_allowance: initialData.mobile_allowance || "",
        effective_from: initialData.effective_from || "",
        effective_to: initialData.effective_to || "",
        is_active: initialData.is_active ?? true,
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "is_active"
          ? e.target.value === "true"
          : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-[700px] space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          {initialData ? "Edit Salary" : "Add Salary"}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <select
            name="employee_id"
            value={form.employee_id}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Employee</option>

            {employees.map((emp) => (
              <option key={emp.employee_id} value={emp.employee_id}>
                {emp.emp_full_name}
              </option>
            ))}
          </select>

          <input
            type="number"
            step="0.01"
            name="base_salary"
            placeholder="Base Salary"
            value={form.base_salary}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            step="0.01"
            name="allowance"
            placeholder="Allowance"
            value={form.allowance}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            step="0.01"
            name="meal_allowance"
            placeholder="Meal Allowance"
            value={form.meal_allowance}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            step="0.01"
            name="transport_allowance"
            placeholder="Transport Allowance"
            value={form.transport_allowance}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            step="0.01"
            name="mobile_allowance"
            placeholder="Mobile Allowance"
            value={form.mobile_allowance}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <div>
            <label className="block text-sm">Effective From</label>

            <input
              type="date"
              name="effective_from"
              value={form.effective_from}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm">Effective To</label>

            <input
              type="date"
              name="effective_to"
              value={form.effective_to}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <select
            name="is_active"
            value={form.is_active}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value={true}>Active</option>

            <option value={false}>Inactive</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            {initialData ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
