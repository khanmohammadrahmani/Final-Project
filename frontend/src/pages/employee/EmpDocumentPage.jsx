import React, { useEffect, useState } from "react";
import EmpDocumentService from "../../services/empDocument.service";
import EmployeeService from "../../services/employee.service";
import EmpDocumentModal from "../../components/employee/EmpDocumentModal";

export default function EmpDocumentPage() {
  const [documents, setDocuments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [preview, setPreview] = useState(null);

  const BASE_URL =
    import.meta.env.VITE_IMAGE_URL ||
    "http://127.0.0.1:8000/storage/";

  // ================= LOAD DATA =================
  const loadData = async () => {
    try {
      const [docsRes, empRes] = await Promise.all([
        EmpDocumentService.getAll(),
        EmployeeService.getAll(),
      ]);

      // ✅ FIX: Laravel sometimes wraps in data
      setDocuments(docsRes.data.data || docsRes.data || []);
      setEmployees(empRes.data.data || empRes.data || []);
    } catch (error) {
      console.error("LOAD ERROR:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ================= CREATE / UPDATE =================
  const handleSubmit = async (formData) => {
    try {
      if (edit) {
        await EmpDocumentService.update(edit.document_id, formData);
      } else {
        await EmpDocumentService.create(formData);
      }

      setOpen(false);
      setEdit(null);
      await loadData();
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this document?");
    if (!confirmDelete) return;

    try {
      await EmpDocumentService.delete(id);
      await loadData();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= FILE TYPE =================
  const getFileType = (url = "") => {
    const ext = url.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      return "image";
    }

    if (ext === "pdf") {
      return "pdf";
    }

    return "other";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">
          Employee Documents
        </h1>

        <button
          onClick={() => {
            setEdit(null);
            setOpen(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add Document
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Employee</th>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
              <th className="p-3 text-center">File</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {documents.length > 0 ? (
              documents.map((doc) => (
                <tr key={doc.document_id} className="border-t">

                  <td className="p-3">
                    {doc.document_id}
                  </td>

                  <td className="p-3">
                    {doc.employee?.emp_full_name ||
                      employees.find(
                        (e) =>
                          e.employee_id === doc.employee_id
                      )?.emp_full_name ||
                      doc.employee_id}
                  </td>

                  <td className="p-3">
                    {doc.doc_name}
                  </td>

                  <td className="p-3">
                    {doc.doc_description || "-"}
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => setPreview(doc)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                  </td>

                  <td className="p-3">
                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => {
                          setEdit(doc);
                          setOpen(true);
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(doc.document_id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-5 text-center text-gray-500">
                  No Documents Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PREVIEW MODAL */}
      {preview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[70%] h-[80%] rounded-lg p-4 overflow-auto">

            <div className="flex justify-between mb-3">
              <h2 className="font-bold text-lg">
                {preview.doc_name}
              </h2>

              <button
                onClick={() => setPreview(null)}
                className="text-red-600"
              >
                Close
              </button>
            </div>

            {getFileType(preview.doc_file_url) === "image" && (
              <img
                src={`${BASE_URL}${preview.doc_file_url}`}
                className="max-w-full mx-auto"
              />
            )}

            {getFileType(preview.doc_file_url) === "pdf" && (
              <iframe
                src={`${BASE_URL}${preview.doc_file_url}`}
                className="w-full h-[650px]"
              />
            )}

            {getFileType(preview.doc_file_url) === "other" && (
              <a
                href={`${BASE_URL}${preview.doc_file_url}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Download File
              </a>
            )}

          </div>
        </div>
      )}

      {/* MODAL */}
      <EmpDocumentModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEdit(null);
        }}
        onSubmit={handleSubmit}
        initialData={edit}
        employees={employees}
      />
    </div>
  );
}