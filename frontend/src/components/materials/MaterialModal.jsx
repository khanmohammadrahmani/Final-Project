import React, { useEffect, useState } from "react";

export default function MaterialModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState({
    material_name: "",
    material_unit: "",
    current_stock: "",
    unit_price: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        material_name: initialData.material_name || "",

        material_unit: initialData.material_unit || "",

        current_stock: initialData.current_stock || "",

        unit_price: initialData.unit_price || "",
      });
    } else {
      setForm({
        material_name: "",
        material_unit: "",
        current_stock: "",
        unit_price: "",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      current_stock: Number(form.current_stock || 0),

      unit_price: Number(form.unit_price || 0),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[600px] rounded-lg shadow-lg p-5 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          {initialData ? "Edit Material" : "Add Material"}
        </h2>

        <input
          type="text"
          name="material_name"
          placeholder="Material Name"
          value={form.material_name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />

        <select
          name="material_unit"
          value={form.material_unit}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Select Unit</option>

          <option value="KG">KG</option>

          <option value="Gram">Gram</option>

          <option value="Meter">Meter</option>

          <option value="Piece">Piece</option>

          <option value="Liter">Liter</option>

          <option value="Box">Box</option>

          <option value="Pack">Pack</option>
        </select>

        <input
          type="number"
          step="0.01"
          name="current_stock"
          placeholder="Current Stock"
          value={form.current_stock}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <input
          type="number"
          step="0.01"
          name="unit_price"
          placeholder="Unit Price"
          value={form.unit_price}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

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
