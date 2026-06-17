import React, { useEffect, useState } from "react";
import { FaEdit, FaSave, FaCamera } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import CompanyInfoService from "../../services/companyInfo.service";

const BASE_URL = import.meta.env.VITE_IMAGE_URL;

export default function CompanyInfo() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa" || i18n.language === "ps";

  const [data, setData] = useState({});
  const [editMode, setEditMode] = useState(false);

  const [logoPreview, setLogoPreview] = useState("/default-logo.png");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // ================= FETCH =================
  const fetchData = async () => {
    try {
      const res = await CompanyInfoService.getAll();

      const companyData = res.data?.[0] || {};

      setData(companyData);

      if (companyData.company_logo_url) {
        setLogoPreview(`${BASE_URL}/storage/${companyData.company_logo_url}`);
      } else {
        setLogoPreview("/default-logo.png");
      }
    } catch (error) {
      console.error(error);

      setMessage(
        t("company_load_error") || "Failed to load company information",
      );

      setMessageType("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= LOGO =================
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setData((prev) => ({
      ...prev,
      logoFile: file,
    }));

    setLogoPreview(URL.createObjectURL(file));
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (
          key !== "logoFile" &&
          data[key] !== null &&
          data[key] !== undefined
        ) {
          formData.append(key, data[key]);
        }
      });

      if (data.logoFile instanceof File) {
        formData.append("company_logo_url", data.logoFile);
      }

      // ✅ IMPORTANT LOGIC
      if (data.company_id) {
        await CompanyInfoService.update(data.company_id, formData);
      } else {
        await CompanyInfoService.create(formData);
      }

      setMessageType("success");
      setMessage("Saved successfully");
      setEditMode(false);
      fetchData();
    } catch (error) {
      console.error(error);
      setMessage("Failed to save company info");
    }
  };
  return (
    <div className="p-3 flex justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-5 w-full max-w-4xl relative">
        {/* EDIT / SAVE */}
        <div className={`absolute top-3 ${isRTL ? "left-3" : "right-3"}`}>
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full"
            >
              <FaEdit />
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
            >
              <FaSave />
            </button>
          )}
        </div>

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <div className="relative group w-40 h-40 rounded-full border-4 border-gray-200 overflow-hidden">
            <img
              src={logoPreview}
              alt="Company Logo"
              className="w-full h-full object-cover"
            />

            {editMode && (
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer transition">
                <FaCamera className="text-white text-xl" />

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </label>
            )}
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center mb-6">
          {t("company_information")}
        </h2>

        {/* MESSAGE */}
        {message && (
          <div
            className={`mb-5 p-3 rounded-lg text-center font-medium ${
              messageType === "success"
                ? "bg-green-100 border border-green-300 text-green-700"
                : "bg-red-100 border border-red-300 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              {t("company_name")}
            </label>

            <input
              type="text"
              name="company_name"
              value={data.company_name || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="border p-3 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              {t("license_number")}
            </label>

            <input
              type="text"
              name="license_number"
              value={data.license_number || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="border p-3 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              {t("license_expire_date")}
            </label>

            <input
              type="date"
              name="license_expire_date"
              value={data.license_expire_date?.slice(0, 10) || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="border p-3 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              {t("phone")}
            </label>

            <input
              type="text"
              name="company_phone"
              value={data.company_phone || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="border p-3 rounded w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">
              {t("email")}
            </label>

            <input
              type="email"
              name="company_email"
              value={data.company_email || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="border p-3 rounded w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">
              {t("address")}
            </label>

            <input
              rows="3"
              name="company_address"
              value={data.company_address || ""}
              onChange={handleChange}
              disabled={!editMode}
              className="border p-3 rounded w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
