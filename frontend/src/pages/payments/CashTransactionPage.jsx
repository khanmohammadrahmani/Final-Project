import React, { useEffect, useState } from "react";

import CashTransactionService from "../../services/cashTransaction.service";
import CashTransactionModal from "../../components/payments/CashTransactionModal";

export default function CashTransactionPage() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const loadData = async () => {
    try {
      const res = await CashTransactionService.getAll();

      // SAFE FIX (handles both API formats)
      setItems(res.data?.data || res.data || []);
    } catch (error) {
      console.error("Load error:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (editData) {
        await CashTransactionService.update(editData.transaction_id, data);
      } else {
        await CashTransactionService.create(data);
      }

      setOpen(false);
      setEditData(null);
      loadData();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;

    try {
      await CashTransactionService.delete(id);
      loadData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Cash Transactions</h1>

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

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-gray-900 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Reference Type</th>
              <th className="p-3">Reference ID</th>
              <th className="p-3">Type</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item.transaction_id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">{item.transaction_id}</td>
                  <td className="p-3">{item.reference_type}</td>
                  <td className="p-3">{item.reference_id}</td>
                  <td className="p-3">{item.transaction_type}</td>
                  <td className="p-3">{item.amount}</td>
                  <td className="p-3">{item.transaction_date}</td>

                  <td className="p-3 flex gap-2">
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
                      onClick={() => handleDelete(item.transaction_id)}
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

      <CashTransactionModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
        initialData={editData}
      />
    </div>
  );
}
