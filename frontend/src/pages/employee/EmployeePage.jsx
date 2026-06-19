import React, { useEffect, useState } from "react";
import EmployeeService from "../../services/employee.service";
import EmployeeModal from "../../components/employee/EmployeeModal";

export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);

  const IMAGE_URL = "http://127.0.0.1:8000/storage/";

  const loadEmployees = async () => {
    try {
      const res = await EmployeeService.getAll();
      setEmployees(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      if (edit) {
        await EmployeeService.update(edit.employee_id, formData);
      } else {
        await EmployeeService.create(formData);
      }

      setOpen(false);
      setEdit(null);
      await loadEmployees();
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await EmployeeService.delete(id);
      await loadEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">

      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Employees</h1>

        <button
          onClick={() => {
            setEdit(null);
            setOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Employee
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Photo</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.employee_id} className="border-t">

                <td className="p-3">{emp.employee_id}</td>

                {/* ✅ FIX IMAGE HERE */}
                <td className="p-3">
                  {emp.emp_photo_url ? (
                    <img
                      src={`${IMAGE_URL}${emp.emp_photo_url}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                  )}
                </td>

                <td className="p-3">{emp.emp_full_name}</td>
                <td className="p-3">{emp.emp_phone}</td>
                <td className="p-3">{emp.emp_email}</td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => {
                      setEdit(emp);
                      setOpen(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(emp.employee_id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EmployeeModal
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