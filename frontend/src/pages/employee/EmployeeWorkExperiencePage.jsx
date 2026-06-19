import React, { useEffect, useState } from "react";
import EmpWorkExperienceService from "../../services/empWorkExperience.service";
import EmployeeWorkExperienceModal from "../../components/employee/EmployeeWorkExperienceModal";

export default function EmployeeWorkExperiencePage() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);

  const loadData = async () => {
    try {
      const res = await EmpWorkExperienceService.getAll();
      setData(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (form) => {
    try {
      if (edit) {
        await EmpWorkExperienceService.update(edit.experience_id, form);
      } else {
        await EmpWorkExperienceService.create(form);
      }

      setOpen(false);
      setEdit(null);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await EmpWorkExperienceService.delete(id);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Work Experience</h1>

        <button
          onClick={() => {
            setEdit(null);
            setOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Experience
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Job Title</th>
              <th className="p-3">Organization</th>
              <th className="p-3">Start</th>
              <th className="p-3">End</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr key={row.experience_id} className="border-t">
                <td className="p-3">{row.experience_id}</td>
                <td className="p-3">{row.job_title}</td>
                <td className="p-3">{row.organization}</td>
                <td className="p-3">{row.start_date}</td>
                <td className="p-3">{row.end_date || "-"}</td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => {
                      setEdit(row);
                      setOpen(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(row.experience_id)}
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

      {/* MODAL */}
      <EmployeeWorkExperienceModal
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