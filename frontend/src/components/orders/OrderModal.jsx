import React, { useEffect, useState } from "react";

export default function OrderModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  suppliers = [],
  customers = [],
}) {
  const [form, setForm] = useState({
    supplier_id: "",
    customer_id: "",
    order_type: "",
    order_date: "",
    total_amount: "",
    order_status: "pending",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        supplier_id: initialData.supplier_id || "",
        customer_id: initialData.customer_id || "",
        order_type: initialData.order_type || "",
        order_date: initialData.order_date || "",
        total_amount: initialData.total_amount || "",
        order_status: initialData.order_status || "pending",
      });
    } else {
      setForm({
        supplier_id: "",
        customer_id: "",
        order_type: "",
        order_date: "",
        total_amount: "",
        order_status: "pending",
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

    onSubmit({
      ...form,
      supplier_id: form.supplier_id || null,
      customer_id: form.customer_id || null,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-lg w-[650px] space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          {initialData ? "Edit Order" : "Add Order"}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {/* Supplier */}
          <select
            name="supplier_id"
            value={form.supplier_id}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Supplier</option>
            {suppliers.map((item) => (
              <option key={item.supplier_id} value={item.supplier_id}>
                {item.supplier_name}
              </option>
            ))}
          </select>

          {/* Customer */}
          <select
            name="customer_id"
            value={form.customer_id}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Customer</option>
            {customers.map((item) => (
              <option key={item.customer_id} value={item.customer_id}>
                {item.customer_name}
              </option>
            ))}
          </select>

          {/* Order Type */}
          <select
            name="order_type"
            value={form.order_type}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="purchase">Purchase</option>
            <option value="sale">Sale</option>
          </select>

          {/* Status */}
          <select
            name="order_status"
            value={form.order_status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Date */}
          <input
            type="date"
            name="order_date"
            value={form.order_date}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          {/* Amount */}
          <input
            type="number"
            step="0.01"
            name="total_amount"
            value={form.total_amount}
            onChange={handleChange}
            placeholder="Total Amount"
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
