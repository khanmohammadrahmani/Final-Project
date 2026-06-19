import React, { useEffect, useState } from "react";

export default function StockTransactionModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  materials = [],
}) {
  const [form, setForm] = useState({
    material_id: "",
    quantity: "",
    stock_transaction_type: "in",
    stock_transaction_date: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        material_id: initialData.material_id || "",
        quantity: initialData.quantity || "",
        stock_transaction_type: initialData.stock_transaction_type || "in",
        stock_transaction_date: initialData.stock_transaction_date || "",
      });
    } else {
      setForm({
        material_id: "",
        quantity: "",
        stock_transaction_type: "in",
        stock_transaction_date: "",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
          {initialData ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <select
            name="material_id"
            value={form.material_id}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Material</option>

            {materials.map((m) => (
              <option key={m.material_id} value={m.material_id}>
                {m.material_name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="border p-2 rounded"
          />

          <select
            name="stock_transaction_type"
            value={form.stock_transaction_type}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="in">IN</option>
            <option value="out">OUT</option>
          </select>

          <input
            type="date"
            name="stock_transaction_date"
            value={form.stock_transaction_date}
            onChange={handleChange}
            className="border p-2 rounded"
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
