import React, { useEffect, useState } from "react";

import InvoiceService from "../../services/invoice.service";
import OrderService from "../../services/order.service";

import InvoiceModal from "../../components/invoices/InvoiceModal";

export default function InvoicePage() {
  const [invoices, setInvoices] = useState([]);
  const [orders, setOrders] = useState([]);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const loadData = async () => {
    try {
      const [invRes, orderRes] = await Promise.all([
        InvoiceService.getAll(),
        OrderService.getAll(),
      ]);

      setInvoices(invRes.data?.data || invRes.data || []);
      setOrders(orderRes.data?.data || orderRes.data || []);
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
        await InvoiceService.update(editData.invoice_id, data);
      } else {
        await InvoiceService.create(data);
      }

      setOpen(false);
      setEditData(null);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this invoice?")) return;

    try {
      await InvoiceService.delete(id);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Invoices</h1>

        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Invoice
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Order</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Due Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No invoices found
                </td>
              </tr>
            ) : (
              invoices.map((item) => (
                <tr key={item.invoice_id} className="border-t">
                  <td className="p-3">{item.invoice_id}</td>
                  <td className="p-3">{item.order_id}</td>
                  <td className="p-3">{item.invoice_amount}</td>
                  <td className="p-3">{item.invoice_due_date}</td>
                  <td className="p-3">{item.invoice_status}</td>

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
                      onClick={() => handleDelete(item.invoice_id)}
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

      <InvoiceModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
        initialData={editData}
        orders={orders}
      />
    </div>
  );
}
