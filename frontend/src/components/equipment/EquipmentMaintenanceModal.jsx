import React, { useEffect, useState } from "react";

export default function EquipmentMaintenanceModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  equipments = [],   // ✅ IMPORTANT ADD THIS
}) {
  const [form, setForm] = useState({
    equipment_id: "",
    maintenance_cost: "",
    maintenance_date: "",
    maintenance_description: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        equipment_id: initialData.equipment_id || "",
        maintenance_cost: initialData.maintenance_cost || "",
        maintenance_date: initialData.maintenance_date || "",
        maintenance_description: initialData.maintenance_description || "",
      });
    } else {
      setForm({
        equipment_id: "",
        maintenance_cost: "",
        maintenance_date: "",
        maintenance_description: "",
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
          {initialData ? "Edit Maintenance" : "Add Maintenance"}
        </h2>

        <div className="grid grid-cols-2 gap-3">

          {/* ✅ FIXED: INPUT → SELECT */}
          <select
            name="equipment_id"
            value={form.equipment_id}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Equipment</option>

            {equipments.map((eq) => (
              <option key={eq.equipment_id} value={eq.equipment_id}>
                {eq.equip_name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="maintenance_cost"
            value={form.maintenance_cost}
            onChange={handleChange}
            placeholder="Maintenance Cost"
            className="border p-2 rounded"
          />

          <input
            type="date"
            name="maintenance_date"
            value={form.maintenance_date}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <textarea
            name="maintenance_description"
            value={form.maintenance_description}
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