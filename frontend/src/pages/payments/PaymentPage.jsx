import React, { useEffect, useState } from "react";

import PaymentService from "../../services/payment.service";
import InvoiceService from "../../services/invoice.service";

import PaymentModal from "../../components/payments/PaymentModal";

export default function PaymentPage() {
  const [payments, setPayments] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const loadData = async () => {
    try {
      const [payRes, invRes] = await Promise.all([
        PaymentService.getAll(),
        InvoiceService.getAll(),
      ]);

      setPayments(payRes.data?.data || payRes.data || []);
      setInvoices(invRes.data?.data || invRes.data || []);
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
        await PaymentService.update(editData.payment_id, data);
      } else {
        await PaymentService.create(data);
      }

      setOpen(false);
      setEditData(null);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this payment?")) return;

    try {
      await PaymentService.delete(id);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Payments</h1>

        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Payment
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Invoice</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Method</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No payments found
                </td>
              </tr>
            ) : (
              payments.map((item) => (
                <tr key={item.payment_id} className="border-t">
                  <td className="p-3">{item.payment_id}</td>
                  <td className="p-3">{item.invoice_id}</td>
                  <td className="p-3">{item.payment_amount}</td>
                  <td className="p-3">{item.payment_date}</td>
                  <td className="p-3">{item.payment_method}</td>
                  <td className="p-3">{item.payment_status}</td>

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
                      onClick={() => handleDelete(item.payment_id)}
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

      <PaymentModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
        initialData={editData}
        invoices={invoices}
      />
    </div>
  );
}
