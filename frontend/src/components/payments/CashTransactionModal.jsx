import React, { useEffect, useState } from "react";

export default function CashTransactionModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState({
    reference_type: "",
    reference_id: "",
    transaction_type: "",
    amount: "",
    transaction_description: "",
    transaction_date: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        reference_type: initialData.reference_type || "",
        reference_id: initialData.reference_id || "",
        transaction_type: initialData.transaction_type || "",
        amount: initialData.amount || "",
        transaction_description: initialData.transaction_description || "",
        transaction_date: initialData.transaction_date || "",
      });
    } else {
      setForm({
        reference_type: "",
        reference_id: "",
        transaction_type: "",
        amount: "",
        transaction_description: "",
        transaction_date: "",
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
          <input
            name="reference_type"
            value={form.reference_type}
            onChange={handleChange}
            placeholder="Reference Type"
            className="border p-2 rounded"
          />

          <input
            name="reference_id"
            value={form.reference_id}
            onChange={handleChange}
            placeholder="Reference ID"
            className="border p-2 rounded"
          />

          <input
            name="transaction_type"
            value={form.transaction_type}
            onChange={handleChange}
            placeholder="Transaction Type"
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="border p-2 rounded"
          />

          <input
            type="date"
            name="transaction_date"
            value={form.transaction_date}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <textarea
            name="transaction_description"
            value={form.transaction_description}
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
