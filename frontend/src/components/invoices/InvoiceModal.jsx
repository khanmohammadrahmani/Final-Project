import React, { useEffect, useState } from "react";

export default function InvoiceModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  orders = [],
}) {
  const [form, setForm] = useState({
    order_id: "",
    invoice_amount: "",
    invoice_due_date: "",
    invoice_description: "",
    invoice_status: "pending",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        order_id: initialData.order_id || "",
        invoice_amount: initialData.invoice_amount || "",
        invoice_due_date: initialData.invoice_due_date || "",
        invoice_description: initialData.invoice_description || "",
        invoice_status: initialData.invoice_status || "pending",
      });
    } else {
      setForm({
        order_id: "",
        invoice_amount: "",
        invoice_due_date: "",
        invoice_description: "",
        invoice_status: "pending",
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
        className="bg-white p-5 rounded w-[600px] space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          {initialData ? "Edit Invoice" : "Add Invoice"}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {/* Order */}
          <select
            name="order_id"
            value={form.order_id}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Order</option>
            {orders.map((o) => (
              <option key={o.order_id} value={o.order_id}>
                {o.order_id}
              </option>
            ))}
          </select>

          {/* Amount */}
          <input
            type="number"
            name="invoice_amount"
            value={form.invoice_amount}
            onChange={handleChange}
            placeholder="Amount"
            className="border p-2 rounded"
          />

          {/* Due Date */}
          <input
            type="date"
            name="invoice_due_date"
            value={form.invoice_due_date}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* Status */}
          <select
            name="invoice_status"
            value={form.invoice_status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Description */}
          <textarea
            name="invoice_description"
            value={form.invoice_description}
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
            placeholder="Description"
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
