import React, { useEffect, useState } from "react";

export default function EmployeeModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState({
    emp_full_name: "",
    emp_father_name: "",
    emp_nid_number: "",
    emp_dob: "",
    emp_gender: "",
    emp_marital_status: "",
    emp_phone: "",
    emp_email: "",
    emp_permanent_address: "",
    emp_current_address: "",
    emp_bank_account: "",
    emp_photo: null,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        emp_full_name: initialData.emp_full_name || "",
        emp_father_name: initialData.emp_father_name || "",
        emp_nid_number: initialData.emp_nid_number || "",
        emp_dob: initialData.emp_dob || "",
        emp_gender: initialData.emp_gender || "",
        emp_marital_status: initialData.emp_marital_status || "",
        emp_phone: initialData.emp_phone || "",
        emp_email: initialData.emp_email || "",
        emp_permanent_address: initialData.emp_permanent_address || "",
        emp_current_address: initialData.emp_current_address || "",
        emp_bank_account: initialData.emp_bank_account || "",
        emp_photo: null,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, emp_photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key]) fd.append(key, form[key]);
    });

    onSubmit(fd);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 w-[600px] rounded-lg shadow-lg space-y-3 max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold text-center">
          {initialData ? "Edit Employee" : "Add Employee"}
        </h2>

        <div className="grid grid-cols-2 gap-2">
          <input name="emp_full_name" placeholder="Full Name"
            value={form.emp_full_name} onChange={handleChange}
            className="border p-2 rounded" required
          />

          <input name="emp_father_name" placeholder="Father Name"
            value={form.emp_father_name} onChange={handleChange}
            className="border p-2 rounded"
          />

          <input name="emp_nid_number" placeholder="NID"
            value={form.emp_nid_number} onChange={handleChange}
            className="border p-2 rounded"
          />

          <input type="date" name="emp_dob"
            value={form.emp_dob} onChange={handleChange}
            className="border p-2 rounded"
          />

          <input name="emp_gender" placeholder="Gender"
            value={form.emp_gender} onChange={handleChange}
            className="border p-2 rounded"
          />

          <input name="emp_marital_status" placeholder="Marital Status"
            value={form.emp_marital_status} onChange={handleChange}
            className="border p-2 rounded"
          />

          <input name="emp_phone" placeholder="Phone"
            value={form.emp_phone} onChange={handleChange}
            className="border p-2 rounded"
          />

          <input name="emp_email" placeholder="Email"
            value={form.emp_email} onChange={handleChange}
            className="border p-2 rounded"
          />

          <input name="emp_bank_account" placeholder="Bank Account"
            value={form.emp_bank_account} onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <textarea
          name="emp_permanent_address"
          placeholder="Permanent Address"
          value={form.emp_permanent_address}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <textarea
          name="emp_current_address"
          placeholder="Current Address"
          value={form.emp_current_address}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input type="file" onChange={handleFile} />

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}