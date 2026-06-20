import React, { useEffect, useState } from "react";

export default function EquipmentUsageModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState({
    equipment_id: "",
    employee_id: "",
    usage_start_date: "",
    usage_end_date: "",
    usage_description: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        equipment_id: initialData.equipment_id || "",
        employee_id: initialData.employee_id || "",
        usage_start_date: initialData.usage_start_date || "",
        usage_end_date: initialData.usage_end_date || "",
        usage_description: initialData.usage_description || "",
      });
    } else {
      setForm({
        equipment_id: "",
        employee_id: "",
        usage_start_date: "",
        usage_end_date: "",
        usage_description: "",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-lg w-[600px] space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          {initialData ? "Edit Usage" : "Add Usage"}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <input
            name="equipment_id"
            value={form.equipment_id}
            onChange={handleChange}
            placeholder="Equipment ID"
            className="border p-2 rounded"
          />

          <input
            name="employee_id"
            value={form.employee_id}
            onChange={handleChange}
            placeholder="Employee ID"
            className="border p-2 rounded"
          />

          <input
            type="date"
            name="usage_start_date"
            value={form.usage_start_date}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="date"
            name="usage_end_date"
            value={form.usage_end_date || ""}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <textarea
            name="usage_description"
            value={form.usage_description || ""}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded col-span-2"
          />
        </div>

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