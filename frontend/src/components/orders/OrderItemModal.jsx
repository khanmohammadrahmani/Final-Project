import React, { useEffect, useState } from "react";

export default function OrderItemModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  orders = [],
  materials = [],
}) {
  const [form, setForm] = useState({
    order_id: "",
    material_id: "",
    order_item_quantity: "",
    order_item_unit_price: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        order_id: initialData.order_id || "",
        material_id: initialData.material_id || "",
        order_item_quantity: initialData.order_item_quantity || "",
        order_item_unit_price: initialData.order_item_unit_price || "",
      });
    } else {
      setForm({
        order_id: "",
        material_id: "",
        order_item_quantity: "",
        order_item_unit_price: "",
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
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-lg w-[600px] space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          {initialData ? "Edit Order Item" : "Add Order Item"}
        </h2>

        {/* ORDER */}
        <select
          name="order_id"
          value={form.order_id}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="">Select Order</option>
          {orders.map((o) => (
            <option key={o.order_id} value={o.order_id}>
              Order #{o.order_id}
            </option>
          ))}
        </select>

        {/* MATERIAL */}
        <select
          name="material_id"
          value={form.material_id}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="">Select Material</option>
          {materials.map((m) => (
            <option key={m.material_id} value={m.material_id}>
              {m.material_name}
            </option>
          ))}
        </select>

        {/* QUANTITY */}
        <input
          type="number"
          name="order_item_quantity"
          value={form.order_item_quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="border p-2 w-full rounded"
        />

        {/* PRICE */}
        <input
          type="number"
          name="order_item_unit_price"
          value={form.order_item_unit_price}
          onChange={handleChange}
          placeholder="Unit Price"
          className="border p-2 w-full rounded"
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
