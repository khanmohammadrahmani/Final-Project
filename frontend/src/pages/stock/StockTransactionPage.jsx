import React, { useEffect, useState } from "react";

import StockTransactionService from "../../services/stockTransaction.service";
import MaterialService from "../../services/material.service";

import StockTransactionModal from "../../components/stock/StockTransactionModal";

export default function StockTransactionPage() {
  const [items, setItems] = useState([]);
  const [materials, setMaterials] = useState([]);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // ================= LOAD DATA =================
  const loadData = async () => {
    try {
      const [stockRes, materialRes] = await Promise.all([
        StockTransactionService.getAll(),
        MaterialService.getAll(),
      ]);

      // ✅ SAFE API HANDLING (IMPORTANT FIX)
      const stockData =
        stockRes.data?.data ||
        stockRes.data ||
        [];

      const materialData =
        materialRes.data?.data ||
        materialRes.data ||
        [];

      setItems(stockData);
      setMaterials(materialData);

    } catch (error) {
      console.error("Load error:", error);
      setItems([]);
      setMaterials([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ================= SUBMIT =================
  const handleSubmit = async (data) => {
    try {
      if (editData) {
        await StockTransactionService.update(
          editData.stock_transaction_id,
          data
        );
      } else {
        await StockTransactionService.create(data);
      }

      setOpen(false);
      setEditData(null);
      loadData();

    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;

    try {
      await StockTransactionService.delete(id);
      loadData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">
          Stock Transactions
        </h1>

        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Transaction
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-center">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Material</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Type</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.stock_transaction_id} className="border-t">

                  <td className="p-3">
                    {item.stock_transaction_id}
                  </td>

                  <td className="p-3">
                    {item.material?.material_name || item.material_id}
                  </td>

                  <td className="p-3">
                    {item.quantity}
                  </td>

                  <td className="p-3">
                    {item.stock_transaction_type}
                  </td>

                  <td className="p-3">
                    {item.stock_transaction_date}
                  </td>

                  <td className="p-3 flex gap-2 justify-center">

                    <button
                      onClick={() => {
                        setEditData(item);
                        setOpen(true);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(item.stock_transaction_id)
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* MODAL */}
      <StockTransactionModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
        initialData={editData}
        materials={materials}
      />

    </div>
  );
}