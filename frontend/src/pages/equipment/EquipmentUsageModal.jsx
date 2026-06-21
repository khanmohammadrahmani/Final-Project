import React, { useEffect, useState } from "react";

export default function EquipmentUsageModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  employees = [],
  equipments = [],
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-6 rounded-lg w-[650px] space-y-4 shadow-xl"
      >

        <h2 className="text-xl font-bold text-center">
          {initialData ? "Edit Usage" : "Add Usage"}
        </h2>

        <div className="grid grid-cols-2 gap-3">

          {/* EQUIPMENT */}
          <select
            name="equipment_id"
            value={form.equipment_id}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded bg-white text-black"
            required
          >
            <option value="">Select Equipment</option>
            {equipments.map((eq) => (
              <option key={eq.equipment_id} value={eq.equipment_id}>
                {eq.equip_name}
              </option>
            ))}
          </select>

          {/* EMPLOYEE */}
          <select
            name="employee_id"
            value={form.employee_id}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded bg-white text-black"
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.employee_id} value={emp.employee_id}>
                {emp.employee_name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="usage_start_date"
            value={form.usage_start_date}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-white text-black"
          />

          <input
            type="date"
            name="usage_end_date"
            value={form.usage_end_date || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-white text-black"
          />

          <textarea
            name="usage_description"
            value={form.usage_description || ""}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded bg-white text-black col-span-2"
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