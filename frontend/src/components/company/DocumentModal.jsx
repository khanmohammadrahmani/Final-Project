import React, { useState, useEffect } from "react";
import { FiPaperclip } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import CompanyInfoService from "../../services/companyInfo.service";

export default function DocumentModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const { t } = useTranslation();

  const [companies, setCompanies] = useState([]);

  const [formData, setFormData] = useState({
    company_id: "",
    doc_name: "",
    doc_description: "",
    file: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ================= FETCH COMPANIES =================
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await CompanyInfoService.getAll();
        setCompanies(res.data || []);
      } catch (err) {
        console.error(err);
        setCompanies([]);
      }
    };

    if (isOpen) {
      fetchCompanies();
    }
  }, [isOpen]);

  // ================= INIT =================
  useEffect(() => {
    if (initialData) {
      setFormData({
        company_id: initialData.company_id || "",
        doc_name: initialData.doc_name || "",
        doc_description: initialData.doc_description || "",
        file: null,
      });
    } else {
      setFormData({
        company_id: "",
        doc_name: "",
        doc_description: "",
        file: null,
      });
    }

    setError("");
    setSuccess("");
  }, [initialData, isOpen]);

  // ================= INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= FILE =================
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      file,
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await onSubmit(formData);

      setSuccess(
        initialData ? t("updated_successfully") : t("saved_successfully")
      );

      setTimeout(() => {
        onClose();
      }, 800);

    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-2">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5">

        {/* TITLE */}
        <h3 className="text-lg font-bold mb-4 text-center">
          {initialData ? t("edit_document") : t("add_document")}
        </h3>

        {/* ERROR */}
        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm text-center">
            {error}
          </p>
        )}

        {/* SUCCESS */}
        {success && (
          <p className="bg-green-100 text-green-700 p-2 rounded mb-3 text-sm text-center">
            {success}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid gap-4">

          {/* COMPANY DROPDOWN */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              {t("company")}
            </label>

            <select
              name="company_id"
              value={formData.company_id}
              onChange={handleChange}
              className="border p-2.5 rounded w-full"
              required
            >
              <option value="">{t("select_company")}</option>

              {companies.map((c) => (
                <option key={c.company_id} value={c.company_id}>
                  {c.company_name}
                </option>
              ))}
            </select>
          </div>

          {/* DOC NAME */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              {t("document_name")}
            </label>

            <input
              type="text"
              name="doc_name"
              value={formData.doc_name}
              onChange={handleChange}
              className="border p-2.5 rounded w-full"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              {t("description")}
            </label>

            <textarea
              name="doc_description"
              value={formData.doc_description}
              onChange={handleChange}
              rows={3}
              className="border p-2.5 rounded w-full"
            />
          </div>

          {/* FILE */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              {t("choose_file")}
            </label>

            <label className="flex items-center justify-between border p-2.5 rounded cursor-pointer hover:bg-gray-50">
              <span className="text-sm truncate">
                {formData.file ? formData.file.name : t("select_file")}
              </span>

              <FiPaperclip className="text-green-600" size={20} />

              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.xlsx,.pptx,.png,.jpg,.jpeg"
              />
            </label>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-3">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              {t("cancel")}
            </button>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              {initialData ? t("update") : t("save")}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}