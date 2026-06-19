import React, { useEffect, useState } from "react";

export default function SupplierModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState({
    supplier_name: "",
    supplier_phone: "",
    supplier_email: "",
    supplier_address: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        supplier_name: initialData.supplier_name || "",

        supplier_phone: initialData.supplier_phone || "",

        supplier_email: initialData.supplier_email || "",

        supplier_address: initialData.supplier_address || "",
      });
    } else {
      setForm({
        supplier_name: "",
        supplier_phone: "",
        supplier_email: "",
        supplier_address: "",
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

    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-lg shadow-lg w-[600px] space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          {initialData ? "Edit Supplier" : "Add Supplier"}
        </h2>

        <input
          type="text"
          name="supplier_name"
          placeholder="Supplier Name"
          value={form.supplier_name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="text"
          name="supplier_phone"
          placeholder="Phone"
          value={form.supplier_phone}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <input
          type="email"
          name="supplier_email"
          placeholder="Email"
          value={form.supplier_email}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <textarea
          name="supplier_address"
          placeholder="Address"
          value={form.supplier_address}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          rows="4"
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
