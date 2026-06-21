import React, { useEffect, useState } from "react";

import EmployeeSalaryService from "../../services/employeeSalaryInfo.service";

import EmployeeSalaryModal from "../../components/employee/EmployeeSalaryModal";

export default function EmployeeSalaryPage() {
  const [salaries, setSalaries] = useState([]);

  const [open, setOpen] = useState(false);

  const [edit, setEdit] = useState(null);

  const loadData = async () => {
    try {
      const res = await EmployeeSalaryService.getAll();

      setSalaries(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (edit) {
        await EmployeeSalaryService.update(edit.employee_salary_id, data);
      } else {
        await EmployeeSalaryService.create(data);
      }

      setOpen(false);
      setEdit(null);

      await loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await EmployeeSalaryService.delete(id);

      await loadData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Employee Salaries</h1>

        <button
          onClick={() => {
            setEdit(null);
            setOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Salary
        </button>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Employee</th>
              <th className="p-3">Base Salary</th>
              <th className="p-3">Allowance</th>
              <th className="p-3">Status</th>
              <th className="p-3 ">Actions</th>
            </tr>
          </thead>

          <tbody>
            {salaries.map((row) => (
              <tr key={row.employee_salary_id} className="border-t">
                <td className="p-3">{row.employee_salary_id}</td>

                <td className="p-3">{row.employee_info?.emp_full_name}</td>

                <td className="p-3">{row.base_salary}</td>

                <td className="p-3">{row.allowance}</td>

                <td className="p-3">{row.is_active ? "Active" : "Inactive"}</td>

                <td className="p-3 text-center gap-2">
                  <button
                    onClick={() => {
                      setEdit(row);
                      setOpen(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 m-1  rounded "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(row.employee_salary_id)}
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

      <EmployeeSalaryModal
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
