import React, { useEffect, useState } from "react";
import EmployeeService from "../../services/employee.service";

export default function EmployeeHiringModal({
isOpen,
onClose,
onSubmit,
initialData,
}) {
const [employees, setEmployees] = useState([]);

const [form, setForm] = useState({
employee_id: "",
position: "",
employment_type: "",
hire_date: "",
end_date: "",
current_status: "",
});

useEffect(() => {
const loadEmployees = async () => {
try {
const response = await EmployeeService.getAll();


    setEmployees(
      Array.isArray(response.data)
        ? response.data
        : []
    );
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
    position: initialData.position || "",
    employment_type: initialData.employment_type || "",
    hire_date: initialData.hire_date || "",
    end_date: initialData.end_date || "",
    current_status: initialData.current_status || "",
  });
} else {
  setForm({
    employee_id: "",
    position: "",
    employment_type: "",
    hire_date: "",
    end_date: "",
    current_status: "",
  });
}


}, [initialData, isOpen]);

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value,
});
};

const handleSubmit = (e) => {
e.preventDefault();


onSubmit(form);


};

if (!isOpen) return null;

return ( <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"> <form
     onSubmit={handleSubmit}
     className="bg-white p-5 w-[650px] rounded-lg shadow-lg space-y-4"
   > <h2 className="text-xl font-bold text-center">
{initialData
? "Edit Employee Hiring"
: "Add Employee Hiring"} </h2>


    <div className="grid grid-cols-2 gap-3">

      {/* Employee Dropdown */}
      <select
        name="employee_id"
        value={form.employee_id}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      >
        <option value="">
          Select Employee
        </option>

        {employees.map((emp) => (
          <option
            key={emp.employee_id}
            value={emp.employee_id}
          >
            {emp.emp_full_name}
          </option>
        ))}
      </select>

      {/* Position */}
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={form.position}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />

      {/* Employment Type */}
      <select
        name="employment_type"
        value={form.employment_type}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      >
        <option value="">
          Select Employment Type
        </option>

        <option value="Permanent">
          Permanent
        </option>

        <option value="Contract">
          Contract
        </option>

        <option value="Part Time">
          Part Time
        </option>

        <option value="Temporary">
          Temporary
        </option>

        <option value="Intern">
          Intern
        </option>
      </select>

      {/* Status */}
      <select
        name="current_status"
        value={form.current_status}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      >
        <option value="">
          Select Status
        </option>

        <option value="Active">
          Active
        </option>

        <option value="Inactive">
          Inactive
        </option>

        <option value="Suspended">
          Suspended
        </option>

        <option value="Terminated">
          Terminated
        </option>

        <option value="Resigned">
          Resigned
        </option>
      </select>

      {/* Hire Date */}
      <div>
        <label className="block text-sm mb-1">
          Hire Date
        </label>

        <input
          type="date"
          name="hire_date"
          value={form.hire_date}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>

      {/* End Date */}
      <div>
        <label className="block text-sm mb-1">
          End Date
        </label>

        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
    </div>

    <div className="flex justify-end gap-2 pt-2">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 bg-gray-500 text-white rounded"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        {initialData ? "Update" : "Save"}
      </button>
    </div>
  </form>
</div>


);
}
