import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function UserAddEditModal({ onClose, onRefresh, editData }) {
  const isEdit = !!editData;
  const { t } = useTranslation();

  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    password: "",
    user_role: "Employee",
    employee_id: "",
    customer_id: "",
    is_active: true,
    user_photo: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [fileName, setFileName] = useState("");

  // ================= LOAD EDIT DATA =================
  useEffect(() => {
    if (editData) {
      setForm({
        user_name: editData.user_name || "",
        user_email: editData.user_email || "",
        password: "",
        user_role: editData.user_role || "Employee",
        employee_id: editData.employee_id || "",
        customer_id: editData.customer_id || "",
        is_active: editData.is_active ?? true,
        user_photo: null,
      });
    }
  }, [editData]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "user_photo") {
      const file = files?.[0];
      setForm((p) => ({ ...p, user_photo: file }));
      setFileName(file?.name || "");

      // 🔥 DEBUG FILE
      // console.log("Selected file:", file);
    } else if (name === "is_active") {
      setForm((p) => ({ ...p, is_active: value === "true" }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  // ================= DEBUG FORM =================
  const debugFormData = (formData) => {
    // console.log("===== FORM DATA =====");
    for (let pair of formData.entries()) {
      // console.log(pair[0], pair[1]);
    }
  };

  // ================= SUBMIT =================
  const formData = new FormData();
  const handleSubmit = async () => {
    try {
      if (!form.user_name || !form.user_email) {
        return setMessage({ text: "Name and Email required", type: "error" });
      }

      if (!isEdit && !form.password) {
        return setMessage({ text: "Password required", type: "error" });
      }

      if (form.user_role === "Customer" && !form.customer_id) {
        return setMessage({
          text: "Customer ID is required",
          type: "error",
        });
      }

      const formData = new FormData();

      formData.append("user_name", form.user_name);
      formData.append("user_email", form.user_email);
      formData.append("user_role", form.user_role);

      // ✔ boolean safe
      formData.append("is_active", form.is_active ? "1" : "0");

      if (form.user_role !== "Customer") {
        if (form.employee_id) {
          formData.append("employee_id", form.employee_id);
        }
      } else {
        formData.append("customer_id", form.customer_id);
      }

      if (!isEdit) {
        formData.append("password_hash", form.password);
      }

      if (form.user_photo instanceof File) {
        formData.append("user_photo_url", form.user_photo);
      }

      // 🔥 DEBUG FORM DATA (IMPORTANT)
      debugFormData(formData);

      if (isEdit) {
        await UserService.update(editData.user_id, formData);
        setMessage({ text: "User updated", type: "success" });
      } else {
        await UserService.create(formData);
        setMessage({ text: "User created", type: "success" });
      }

      onRefresh?.();
      onClose?.();
    } catch (err) {
      console.log("API ERROR:", err.response?.data);

      setMessage({
        text: err.response?.data?.message || "Error occurred",
        type: "error",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-5">
        <h3 className="text-xl font-bold text-center mb-4">
          {isEdit ? "Edit User" : "Add User"}
        </h3>

        {message.text && (
          <p
            className={`text-center mb-3 ${
              message.type === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <div className="space-y-3 ">
          <input
            name="user_name"
            value={form.user_name}
            onChange={handleChange}
            placeholder="User Name"
            className="w-full border p-2 rounded"
          />

          <input
            name="user_email"
            value={form.user_email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2 rounded"
          />

          {!isEdit && (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border p-2 rounded pr-10"
              />

              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          )}

          <select
            name="user_role"
            value={form.user_role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Admin">Admin</option>
            <option value="Employee">Employee</option>
            <option value="Customer">Customer</option>
          </select>

          {form.user_role !== "Customer" ? (
            <input
              name="employee_id"
              value={form.employee_id}
              onChange={handleChange}
              placeholder="Employee ID"
              className="w-full border p-2 rounded"
            />
          ) : (
            <input
              name="customer_id"
              value={form.customer_id}
              onChange={handleChange}
              placeholder="Customer ID (Required)"
              className="w-full border p-2 rounded"
            />
          )}

          <select
            name="is_active"
            value={form.is_active ? "true" : "false"}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          {/* IMAGE */}
          <label className="flex items-center justify-center border-1 border-dashed  rounded-lg p-3 cursor-pointer">
            <span className="text-gray-500 text-sm">
              {fileName || "Choose Image"}
            </span>

            <input
              type="file"
              name="user_photo"
              onChange={handleChange}
              className="hidden"
            />
          </label>

          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {isEdit ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
