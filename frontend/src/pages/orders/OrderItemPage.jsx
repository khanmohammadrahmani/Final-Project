import React, { useEffect, useState } from "react";

import OrderItemService from "../../services/orderItem.service";
import OrderService from "../../services/order.service";
import MaterialService from "../../services/material.service";

import OrderItemModal from "../../components/orders/OrderItemModal";

export default function OrderItemPage() {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [materials, setMaterials] = useState([]);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const loadData = async () => {
    try {
      const [itemRes, orderRes, materialRes] = await Promise.all([
        OrderItemService.getAll(),
        OrderService.getAll(),
        MaterialService.getAll(),
      ]);

      setItems(itemRes.data?.data || itemRes.data || []);
      setOrders(orderRes.data?.data || orderRes.data || []);
      setMaterials(materialRes.data?.data || materialRes.data || []);
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
        await OrderItemService.update(editData.order_item_id, data);
      } else {
        await OrderItemService.create(data);
      }

      setOpen(false);
      setEditData(null);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete item?")) return;

    try {
      await OrderItemService.delete(id);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Order Items</h1>

        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full   text-center">
          <thead className="bg-gray-100 text-center">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Order</th>
              <th className="p-3">Material</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3 ">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.order_item_id} className="border-t">
                  <td className="p-3">{item.order_item_id}</td>
                  <td className="p-3">{item.order_id}</td>
                  <td className="p-3">{item.material_id}</td>
                  <td className="p-3">{item.order_item_quantity}</td>
                  <td className="p-3">{item.order_item_unit_price}</td>

                  <td className="p-3 text-center gap-2">
                    <button
                      onClick={() => {
                        setEditData(item);
                        setOpen(true);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded m-1"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.order_item_id)}
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

      <OrderItemModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
        initialData={editData}
        orders={orders}
        materials={materials}
      />
    </div>
  );
}
