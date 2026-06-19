import React, { useEffect, useState } from "react";
import CompanyDocumentsService from "../../services/companyDocuments.service";

import {
  FiDownload,
  FiEdit3,
  FiEye,
  FiPlusCircle,
  FiTrash2,
  FiXCircle,
} from "react-icons/fi";

import DocumentModal from "../../components/company/DocumentModal";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/common/Pagination";
import MobileCard from "../../components/common/MobileCard";
import CardRow from "../../components/common/CardRow";

import { useTranslation } from "react-i18next";

export default function CompanyDocuments() {
  const { t, i18n } = useTranslation();

  const [documents, setDocuments] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;

  const [sortField] = useState("document_id");
  const [sortOrder] = useState("asc");

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [previewData, setPreviewData] = useState(null);

  const BASE_URL = import.meta.env.VITE_IMAGE_URL;

  // ================= FETCH =================
  const fetchDocs = async () => {
    try {
      const res = await CompanyDocumentsService.getAll();
      setDocuments(res.data || []);
    } catch (err) {
      console.error(err);
      setDocuments([]);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  // ================= FILTER + SORT =================
  useEffect(() => {
    let data = [...documents];

    data = data.filter((doc) => {
      const q = search.toLowerCase();

      return (
        doc.document_id?.toString().includes(q) ||
        doc.doc_name?.toLowerCase().includes(q) ||
        (doc.doc_description || "").toLowerCase().includes(q)
      );
    });

    data.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      return sortOrder === "asc"
        ? valA > valB ? 1 : -1
        : valA < valB ? 1 : -1;
    });

    setFilteredDocs(data);
    setPage(1);
  }, [search, documents]);

  // ================= PAGINATION =================
  const start = (page - 1) * limit;
  const paginatedDocs = filteredDocs.slice(start, start + limit);

  // ================= CREATE / UPDATE (FIXED FLOW) =================
  const handleSubmit = async (formData) => {
    try {
      const payload = new FormData();

      payload.append("company_id", formData.company_id);
      payload.append("doc_name", formData.doc_name);
      payload.append("doc_description", formData.doc_description || "");

      if (formData.file) {
        payload.append("file", formData.file);
      }

      if (editData) {
        payload.append("_method", "PUT");

        await CompanyDocumentsService.update(
          editData.document_id,
          payload
        );
      } else {
        await CompanyDocumentsService.create(payload);
      }

      setModalOpen(false);
      setEditData(null);
      fetchDocs();

    } catch (err) {
      console.error(err);
    }
  };

  // ================= DELETE =================
  const confirmDelete = async () => {
    try {
      await CompanyDocumentsService.delete(deleteData.document_id);

      setDocuments((prev) =>
        prev.filter((d) => d.document_id !== deleteData.document_id)
      );
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteData(null);
    }
  };

  // ================= DOWNLOAD =================
  const handleDownload = async (doc) => {
    try {
      const res = await fetch(`${BASE_URL}${doc.doc_file_url}`);
      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = doc.doc_name || "file";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  const getFileType = (url = "") => {
    const ext = url.split(".").pop().toLowerCase();
    if (["png", "jpg", "jpeg"].includes(ext)) return "image";
    if (ext === "pdf") return "pdf";
    return "other";
  };

  // ================= UI =================
  return (
    <div className="p-4 max-w-7xl mx-auto">

      {/* TOP */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {t("company_documents")}
        </h2>

        <button
          onClick={() => {
            setModalOpen(true);
            setEditData(null);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FiPlusCircle /> {t("add_document")}
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Description</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedDocs.map((doc) => (
              <tr key={doc.document_id} className="border-t">

                <td className="p-2 text-center">
                  {doc.document_id}
                </td>

                <td className="p-2">{doc.doc_name}</td>

                <td className="p-2">
                  {doc.doc_description}
                </td>

                <td className="p-2 flex gap-2 justify-center">

                  <button onClick={() => setPreviewData(doc)}>
                    <FiEye />
                  </button>

                  <button onClick={() => handleDownload(doc)}>
                    <FiDownload />
                  </button>

                  <button
                    onClick={() => {
                      setEditData(doc);
                      setModalOpen(true);
                    }}
                  >
                    <FiEdit3 />
                  </button>

                  <button onClick={() => setDeleteData(doc)}>
                    <FiTrash2 />
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* PAGINATION */}
      <Pagination
        page={page}
        total={filteredDocs.length}
        limit={limit}
        onPageChange={setPage}
      />

      {/* PREVIEW */}
      {previewData && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4 w-[70%] h-[80%] overflow-auto">

            <div className="flex justify-between">
              <h3>{previewData.doc_name}</h3>

              <FiXCircle
                onClick={() => setPreviewData(null)}
              />
            </div>

            {getFileType(previewData.doc_file_url) === "image" && (
              <img
                src={`${BASE_URL}${previewData.doc_file_url}`}
              />
            )}

            {getFileType(previewData.doc_file_url) === "pdf" && (
              <iframe
                src={`${BASE_URL}${previewData.doc_file_url}`}
                className="w-full h-full"
              />
            )}

          </div>
        </div>
      )}

      {/* DELETE */}
      {deleteData && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

          <div className="bg-white p-4">
            <p>Delete {deleteData.doc_name}?</p>

            <button onClick={() => setDeleteData(null)}>
              Cancel
            </button>

            <button onClick={confirmDelete}>
              Delete
            </button>

          </div>

        </div>
      )}

      {/* MODAL */}
      <DocumentModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
        initialData={editData}
      />

    </div>
  );
}