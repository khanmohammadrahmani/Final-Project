import React, { useEffect, useState } from "react";
import EmployeeHiringService from "../../services/employeeHiringInfo.service";
import EmployeeHiringModal from "../../components/employee/EmployeeHiringModal";

export default function EmployeeHiringPage() {
const [hirings, setHirings] = useState([]);
const [open, setOpen] = useState(false);
const [edit, setEdit] = useState(null);

const loadHirings = async () => {
try {
const data = await EmployeeHiringService.getAll();


  setHirings(data || []);
} catch (error) {
  console.error(error);
}


};

useEffect(() => {
loadHirings();
}, []);

const handleSubmit = async (formData) => {
try {
if (edit) {
await EmployeeHiringService.update(
edit.hiring_info_id,
formData
);
} else {
await EmployeeHiringService.create(formData);
}


  setOpen(false);
  setEdit(null);

  await loadHirings();
} catch (error) {
  console.error(
    error.response?.data || error
  );
}


};

const handleDelete = async (id) => {
try {
await EmployeeHiringService.remove(id);


  await loadHirings();
} catch (error) {
  console.error(error);
}


};

return ( <div className="p-6 max-w-7xl mx-auto">


  <div className="flex justify-between items-center mb-5">
    <h1 className="text-2xl font-bold">
      Employee Hiring
    </h1>

    <button
      onClick={() => {
        setEdit(null);
        setOpen(true);
      }}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Add Hiring
    </button>
  </div>

  <div className="bg-white shadow rounded-lg overflow-hidden">
    <table className="w-full text-center">

      <thead className="bg-gray-100">
        <tr>
          <th className="p-3">ID</th>
          <th className="p-3">Employee ID</th>
          <th className="p-3">Position</th>
          <th className="p-3">Employment Type</th>
          <th className="p-3">Hire Date</th>
          <th className="p-3">End Date</th>
          <th className="p-3">Status</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>

      <tbody>
        {hirings.map((item) => (
          <tr
            key={item.hiring_info_id}
            className="border-t"
          >
            <td className="p-3">
              {item.hiring_info_id}
            </td>

            <td className="p-3">
              {item.employee_id}
            </td>

            <td className="p-3">
              {item.position}
            </td>

            <td className="p-3">
              {item.employment_type}
            </td>

            <td className="p-3">
              {item.hire_date}
            </td>

            <td className="p-3">
              {item.end_date || "-"}
            </td>

            <td className="p-3">
              {item.current_status}
            </td>

            <td className="p-3 flex gap-2">

              <button
                onClick={() => {
                  setEdit(item);
                  setOpen(true);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(
                    item.hiring_info_id
                  )
                }
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

  <EmployeeHiringModal
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
