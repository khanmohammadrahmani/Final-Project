import React, { useEffect, useState } from "react";
import UserService from "../../services/user.service";

import UserAddEditModal from "../../components/users/UserAddEditModal";
import Pagination from "../../components/common/Pagination";
import SearchBar from "../../components/common/SearchBar";

import MobileCard from "../../components/common/MobileCard";
import CardRow from "../../components/common/CardRow";

import { FiPlusCircle, FiEdit3, FiTrash2 } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import defaultUserImage from "../../assets/images/user-def-image.webp";

export default function UsersList() {
  const { t } = useTranslation();

  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;

  const [selectedUser, setSelectedUser] = useState(null);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [deleteData, setDeleteData] = useState(null);

  // simple message instead of Toast
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // ================= IMAGE =================
  const getUserImage = (u) => {
  if (!u?.user_photo_url) return defaultUserImage;

  const url = u.user_photo_url;
  // external image
  if (url.startsWith("http")) return url;
  // local Laravel storage image
  return `${import.meta.env.VITE_IMAGE_URL}/storage/${url}`;
};

  // ================= FETCH =================
  const fetchUsers = async () => {
    try {
      const res = await UserService.getAll();
      setUsers(res.data || []);
    } catch {
      setMessageType("error");
      setMessage(t("failed_fetch"));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= SEARCH =================
  useEffect(() => {
    const f = users.filter((u) =>
      [
        u.user_id,
        u.user_name,
        u.user_email,
        u.user_role,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFiltered(f);
    setPage(1);
  }, [search, users]);

  // ================= PAGINATION =================
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  // ================= DELETE =================
  const handleDelete = (user) => setDeleteData(user);

  const confirmDelete = async () => {
    try {
      await UserService.delete(deleteData.user_id);
      setMessageType("success");
      setMessage(t("deleted_success"));
      fetchUsers();
    } catch (err) {
      setMessageType("error");
      setMessage(err.response?.data?.message || t("operation_failed"));
    } finally {
      setDeleteData(null);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // ================= EDIT =================
  const openEdit = (user) => {
    setSelectedUser(user);
    setShowEdit(true);
  };

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto">

      {/* MESSAGE DIV */}
      {message && (
        <div
          className={`mb-3 p-3 rounded text-sm text-center font-medium ${
            messageType === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">{t("users")}</h2>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder={t("search_users")}
          />

          <button
            onClick={() => setShowAdd(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FiPlusCircle /> {t("add_user")}
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">

        {/* DESKTOP */}
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="p-2 text-center">ID</th>
                <th className="p-2 text-center">{t("photo")}</th>
                <th className="p-2">{t("user_name")}</th>
                <th className="p-2">{t("email")}</th>
                <th className="p-2">{t("role")}</th>
                
                <th className="p-2 text-center">{t("actions")}</th>
              </tr>
            </thead>

            <tbody>
              {paginated.length ? (
                paginated.map((u) => (
                  <tr key={u.user_id} className="border-t hover:bg-gray-50">
                    <td className="p-2 text-center">{u.user_id}</td>
                      <td className="p-2 text-center">
                      <img
                        src={getUserImage(u)}
                        className="w-10 h-10 rounded-full mx-auto border"
                      />
                    </td>
                    <td className="p-2">{u.user_name}</td>
                    <td className="p-2">{u.user_email}</td>
                    <td className="p-2">{u.user_role}</td>

                  

                    <td className="p-2">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openEdit(u)}
                          className="bg-yellow-500 p-1.5 text-white rounded"
                        >
                          <FiEdit3 />
                        </button>

                        <button
                          onClick={() => handleDelete(u)}
                          className="bg-red-500 p-1.5 text-white rounded"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    {t("no_users")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE */}
        <div className="md:hidden p-2 space-y-3">
          {paginated.length ? (
            paginated.map((u) => (
              <MobileCard
                key={u.user_id}
                id={u.user_id}
                actions={
                  <>
                    <button
                      onClick={() => openEdit(u)}
                      className="bg-yellow-500 p-2 text-white rounded"
                    >
                      <FiEdit3 />
                    </button>

                    <button
                      onClick={() => handleDelete(u)}
                      className="bg-red-500 p-2 text-white rounded"
                    >
                      <FiTrash2 />
                    </button>
                  </>
                }
              >
                <div className="flex justify-center mb-2">
                  <img
                    src={getUserImage(u)}
                    className="w-16 h-16 rounded-full border"
                  />
                </div>

                <CardRow label={t("user_name")} value={u.user_name} />
                <CardRow label={t("email")} value={u.user_email} />
                <CardRow label={t("role")} value={u.user_role} />
              </MobileCard>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              {t("no_users")}
            </div>
          )}
        </div>
      </div>

      {/* PAGINATION */}
      <div className="mt-4 flex justify-center">
        <Pagination
          page={page}
          total={filtered.length}
          limit={limit}
          onPageChange={setPage}
        />
      </div>

      {/* ADD */}
      {showAdd && (
        <UserAddEditModal
          onClose={() => setShowAdd(false)}
          onRefresh={fetchUsers}
        />
      )}

      {/* EDIT */}
      {showEdit && (
        <UserAddEditModal
          editData={selectedUser}
          onClose={() => {
            setShowEdit(false);
            setSelectedUser(null);
          }}
          onRefresh={fetchUsers}
        />
      )}

      {/* DELETE MODAL */}
      {deleteData && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm">
            <p>
              {t("delete_user_confirm")}{" "}
              <strong>{deleteData.user_name}</strong>?
            </p>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setDeleteData(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                {t("cancel")}
              </button>

              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                {t("delete")}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}