import React, { useEffect, useState } from "react";

export default function EquipmentModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState({
    equip_name: "",
    equip_company: "",
    equip_serial_number: "",
    equip_purchase_date: "",
    equip_purchase_price: "",
    equip_current_status: "active",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        equip_name: initialData.equip_name || "",
        equip_company: initialData.equip_company || "",
        equip_serial_number: initialData.equip_serial_number || "",
        equip_purchase_date: initialData.equip_purchase_date || "",
        equip_purchase_price: initialData.equip_purchase_price || "",
        equip_current_status: initialData.equip_current_status || "active",
      });
    } else {
      setForm({
        equip_name: "",
        equip_company: "",
        equip_serial_number: "",
        equip_purchase_date: "",
        equip_purchase_price: "",
        equip_current_status: "active",
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
          {initialData ? "Edit Equipment" : "Add Equipment"}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <input
            name="equip_name"
            value={form.equip_name}
            onChange={handleChange}
            placeholder="Equipment Name"
            className="border p-2 rounded"
          />

          <input
            name="equip_company"
            value={form.equip_company}
            onChange={handleChange}
            placeholder="Company"
            className="border p-2 rounded"
          />

          <input
            name="equip_serial_number"
            value={form.equip_serial_number}
            onChange={handleChange}
            placeholder="Serial Number"
            className="border p-2 rounded"
          />

          <input
            type="date"
            name="equip_purchase_date"
            value={form.equip_purchase_date}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="equip_purchase_price"
            value={form.equip_purchase_price}
            onChange={handleChange}
            placeholder="Purchase Price"
            className="border p-2 rounded"
          />

          <select
            name="equip_current_status"
            value={form.equip_current_status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </select>
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
