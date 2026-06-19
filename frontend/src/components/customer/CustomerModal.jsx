import React, { useEffect, useState } from "react";

export default function CustomerModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState({
    cust_full_name: "",
    cust_father_name: "",
    cust_nid_number: "",
    cust_dob: "",
    cust_gender: "",
    cust_phone: "",
    cust_email: "",
    cust_address: "",
    cust_current_status: "active",
    cust_photo_url: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        className="bg-white p-6 rounded-lg w-[700px] space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          {initialData ? "Edit Customer" : "Add Customer"}
        </h2>

        <div className="grid grid-cols-2 gap-3">

          <input
            name="cust_full_name"
            placeholder="Full Name"
            value={form.cust_full_name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="cust_father_name"
            placeholder="Father Name"
            value={form.cust_father_name}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="cust_phone"
            placeholder="Phone"
            value={form.cust_phone}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="cust_email"
            placeholder="Email"
            value={form.cust_email}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="date"
            name="cust_dob"
            value={form.cust_dob}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="cust_gender"
            value={form.cust_gender}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select
            name="cust_current_status"
            value={form.cust_current_status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

        </div>

        <textarea
          name="cust_address"
          placeholder="Address"
          value={form.cust_address}
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

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            {initialData ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}