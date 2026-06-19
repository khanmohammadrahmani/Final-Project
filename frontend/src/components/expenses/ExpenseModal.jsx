import React, { useEffect, useState } from "react";

export default function ExpenseModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState({
    expense_type: "",
    expense_amount: "",
    expense_date: "",
    expense_description: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        expense_type: initialData.expense_type || "",
        expense_amount: initialData.expense_amount || "",
        expense_date: initialData.expense_date || "",
        expense_description: initialData.expense_description || "",
      });
    } else {
      setForm({
        expense_type: "",
        expense_amount: "",
        expense_date: "",
        expense_description: "",
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
          {initialData ? "Edit Expense" : "Add Expense"}
        </h2>

        <input
          name="expense_type"
          value={form.expense_type}
          onChange={handleChange}
          placeholder="Expense Type"
          className="border p-2 rounded w-full"
        />

        <input
          type="number"
          name="expense_amount"
          value={form.expense_amount}
          onChange={handleChange}
          placeholder="Amount"
          className="border p-2 rounded w-full"
        />

        <input
          type="date"
          name="expense_date"
          value={form.expense_date}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <textarea
          name="expense_description"
          value={form.expense_description}
          onChange={handleChange}
          placeholder="Description"
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
