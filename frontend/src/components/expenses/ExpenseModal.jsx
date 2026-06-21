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
  <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-2">

    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-white/95 rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.35)] overflow-hidden border border-gray-200"
    >

      {/* Header */}
      <div className="px-8 py-3 border-b bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800">
          {initialData ? "Edit Expense" : "New Expense"}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Manage your expense information
        </p>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Expense Type
          </label>

          <select
            name="expense_type"
            value={form.expense_type}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 border border-gray-300 rounded-2xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option value="">Select Expense Type</option>
            <option value="Salary">Salary</option>
            <option value="Rent">Rent</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Internet">Internet</option>
            <option value="Transportation">Transportation</option>
            <option value="Fuel">Fuel</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Equipment">Equipment</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Marketing">Marketing</option>
            <option value="Tax">Tax</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Amount
            </label>

            <input
              type="number"
              name="expense_amount"
              value={form.expense_amount}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full h-12 px-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Expense Date
            </label>

            <input
              type="date"
              name="expense_date"
              value={form.expense_date}
              onChange={handleChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Description
          </label>

          <textarea
            name="expense_description"
            value={form.expense_description}
            onChange={handleChange}
            rows="5"
            placeholder="Enter expense details..."
            className="w-full p-4 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 px-8 py-3 bg-gray-50 border-t">

        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 rounded-2xl border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {initialData ? "Update" : "Save"}
        </button>

      </div>

    </form>

  </div>
);
}