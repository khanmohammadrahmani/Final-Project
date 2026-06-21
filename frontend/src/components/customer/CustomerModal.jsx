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
      setForm({
        cust_full_name: initialData.cust_full_name || "",
        cust_father_name: initialData.cust_father_name || "",
        cust_nid_number: initialData.cust_nid_number || "",
        cust_dob: initialData.cust_dob || "",
        cust_gender: initialData.cust_gender || "",
        cust_phone: initialData.cust_phone || "",
        cust_email: initialData.cust_email || "",
        cust_address: initialData.cust_address || "",
        cust_current_status: initialData.cust_current_status || "active",
        cust_photo_url: initialData.cust_photo_url || "",
      });
    } else {
      setForm({
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

        <div className="grid grid-cols-2 gap-4">

          {/* FULL NAME */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              name="cust_full_name"
              value={form.cust_full_name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          {/* FATHER NAME */}
          <div>
            <label className="text-sm font-medium">Father Name</label>
            <input
              name="cust_father_name"
              value={form.cust_father_name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* NID */}
          <div>
            <label className="text-sm font-medium">NID Number</label>
            <input
              name="cust_nid_number"
              value={form.cust_nid_number}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              name="cust_phone"
              value={form.cust_phone}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              name="cust_email"
              value={form.cust_email}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              name="cust_dob"
              value={form.cust_dob}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* GENDER */}
          <div>
            <label className="text-sm font-medium">Gender</label>
            <select
              name="cust_gender"
              value={form.cust_gender}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* STATUS */}
          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              name="cust_current_status"
              value={form.cust_current_status}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

        </div>

        {/* ADDRESS */}
        <div>
          <label className="text-sm font-medium">Address</label>
          <textarea
            name="cust_address"
            value={form.cust_address}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* BUTTONS */}
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