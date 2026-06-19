import React, { useEffect, useState } from "react";

import OrderService from "../../services/order.service";
import SupplierService from "../../services/supplier.service";
import CustomerService from "../../services/customer.service";

import OrderModal from "../../components/orders/OrderModal";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const loadData = async () => {
    try {
      const [orderRes, supplierRes, customerRes] = await Promise.all([
        OrderService.getAll(),
        SupplierService.getAll(),
        CustomerService.getAll(),
      ]);

      // SAFE DATA HANDLING (fixes empty/null issue)
      setOrders(orderRes.data?.data || orderRes.data || []);
      setSuppliers(supplierRes.data?.data || supplierRes.data || []);
      setCustomers(customerRes.data?.data || customerRes.data || []);
    } catch (error) {
      console.error("Load data error:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (editData) {
        await OrderService.update(editData.order_id, data);
      } else {
        await OrderService.create(data);
      }

      setOpen(false);
      setEditData(null);
      loadData();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await OrderService.delete(id);
      loadData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>

        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Order
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-gray-900">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Type</th>
              <th className="p-3">Date</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((item) => (
                <tr key={item.order_id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{item.order_id}</td>
                  <td className="p-3">{item.order_type}</td>
                  <td className="p-3">{item.order_date}</td>
                  <td className="p-3">{item.total_amount}</td>
                  <td className="p-3">{item.order_status}</td>

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
                      onClick={() => handleDelete(item.order_id)}
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

      <OrderModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
        initialData={editData}
        suppliers={suppliers}
        customers={customers}
      />
    </div>
  );
}
