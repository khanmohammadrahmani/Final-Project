import React, { useEffect, useState } from "react";
import EmployeeService from "../../services/employee.service";

export default function EmpDocumentModal({
isOpen,
onClose,
onSubmit,
initialData,
}) {
const [employees, setEmployees] = useState([]);

const [form, setForm] = useState({
employee_id: "",
doc_name: "",
doc_description: "",
file: null,
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
    doc_name: initialData.doc_name || "",
    doc_description: initialData.doc_description || "",
    file: null,
  });
} else {
  setForm({
    employee_id: "",
    doc_name: "",
    doc_description: "",
    file: null,
  });
}


}, [initialData, isOpen]);

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value,
});
};

const handleFile = (e) => {
setForm({
...form,
file: e.target.files[0],
});
};

const handleSubmit = (e) => {
e.preventDefault();


const fd = new FormData();

fd.append("employee_id", form.employee_id);
fd.append("doc_name", form.doc_name);
fd.append(
  "doc_description",
  form.doc_description || ""
);

if (form.file) {
  fd.append("file", form.file);
}

onSubmit(fd);


};

if (!isOpen) return null;

return ( <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"> <div className="bg-white rounded-lg shadow-lg w-full max-w-lg"> <form onSubmit={handleSubmit}> <div className="p-5 border-b"> <h2 className="text-xl font-bold">
{initialData
? "Edit Employee Document"
: "Add Employee Document"} </h2> </div>


      <div className="p-5 space-y-4">

        <div>
          <label className="block mb-1 text-sm font-medium">
            Employee
          </label>

          <select
            name="employee_id"
            value={form.employee_id}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
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
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Document Name
          </label>

          <input
            type="text"
            name="doc_name"
            value={form.doc_name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Document Name"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Description
          </label>

          <textarea
            rows="3"
            name="doc_description"
            value={form.doc_description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Document Description"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            File
          </label>

          <input
            type="file"
            onChange={handleFile}
            className="w-full border rounded px-3 py-2"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />

          {initialData?.doc_file_url && (
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to keep existing file
            </p>
          )}
        </div>

      </div>

      <div className="flex justify-end gap-2 p-5 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          {initialData ? "Update" : "Save"}
        </button>
      </div>
    </form>
  </div>
</div>


);
}
