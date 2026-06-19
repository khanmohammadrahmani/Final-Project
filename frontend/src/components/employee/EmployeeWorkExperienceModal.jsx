import React, { useEffect, useState } from "react";
import EmployeeService from "../../services/employee.service";

export default function EmployeeWorkExperienceModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    employee_id: "",
    job_title: "",
    responsibilities: "",
    experience_description: "",
    start_date: "",
    end_date: "",
    organization: "",
    organization_address: "",
    reference_email: "",
    reference_phone: "",
  });

  // LOAD EMPLOYEES
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await EmployeeService.getAll();
        setEmployees(res.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    if (isOpen) loadEmployees();
  }, [isOpen]);

  // SET EDIT DATA
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        className="bg-white p-6 rounded-lg w-[750px] space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          {initialData ? "Edit Experience" : "Add Experience"}
        </h2>

        {/* GRID */}
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
            name="job_title"
            placeholder="Job Title"
            value={form.job_title}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="organization"
            placeholder="Organization"
            value={form.organization}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="reference_email"
            placeholder="Reference Email"
            value={form.reference_email}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="reference_phone"
            placeholder="Reference Phone"
            value={form.reference_phone}
            onChange={handleChange}
            className="border p-2 rounded"
          />

        </div>

        <textarea
          name="responsibilities"
          placeholder="Responsibilities"
          value={form.responsibilities}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <textarea
          name="experience_description"
          placeholder="Experience Description"
          value={form.experience_description}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <textarea
          name="organization_address"
          placeholder="Organization Address"
          value={form.organization_address}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        {/* BUTTONS */}
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