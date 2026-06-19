import React, { useEffect, useState } from "react";

export default function PaymentModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  invoices = [],
}) {
  const [form, setForm] = useState({
    invoice_id: "",
    payment_amount: "",
    payment_date: "",
    payment_method: "cash",
    payment_status: "pending",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        invoice_id: initialData.invoice_id || "",
        payment_amount: initialData.payment_amount || "",
        payment_date: initialData.payment_date || "",
        payment_method: initialData.payment_method || "cash",
        payment_status: initialData.payment_status || "pending",
      });
    } else {
      setForm({
        invoice_id: "",
        payment_amount: "",
        payment_date: "",
        payment_method: "cash",
        payment_status: "pending",
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
        className="bg-white p-5 rounded w-[600px] space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold text-center">
          {initialData ? "Edit Payment" : "Add Payment"}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {/* Invoice */}
          <select
            name="invoice_id"
            value={form.invoice_id}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Invoice</option>
            {invoices.map((inv) => (
              <option key={inv.invoice_id} value={inv.invoice_id}>
                #{inv.invoice_id}
              </option>
            ))}
          </select>

          {/* Amount */}
          <input
            type="number"
            name="payment_amount"
            value={form.payment_amount}
            onChange={handleChange}
            placeholder="Amount"
            className="border p-2 rounded"
          />

          {/* Date */}
          <input
            type="date"
            name="payment_date"
            value={form.payment_date}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* Method */}
          <select
            name="payment_method"
            value={form.payment_method}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="cash">Cash</option>
            <option value="bank">Bank</option>
            <option value="card">Card</option>
          </select>

          {/* Status */}
          <select
            name="payment_status"
            value={form.payment_status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
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
