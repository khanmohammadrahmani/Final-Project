import React, { useEffect, useState } from "react";

import EquipmentService from "../../services/equipment.service";
import EquipmentModal from "../../components/equipment/EquipmentModal";

export default function EquipmentPage() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const loadData = async () => {
    try {
      const res = await EquipmentService.getAll();
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
        await EquipmentService.update(editData.equipment_id, data);
      } else {
        await EquipmentService.create(data);
      }

      setOpen(false);
      setEditData(null);
      loadData();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this equipment?")) return;

    try {
      await EquipmentService.delete(id);
      loadData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Equipment</h1>

        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Equipment
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Company</th>
              <th className="p-3">Serial</th>
              <th className="p-3">Purchase Date</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.equipment_id} className="border-t">
                  <td className="p-3">{item.equipment_id}</td>
                  <td className="p-3">{item.equip_name}</td>
                  <td className="p-3">{item.equip_company}</td>
                  <td className="p-3">{item.equip_serial_number}</td>
                  <td className="p-3">{item.equip_purchase_date}</td>
                  <td className="p-3">{item.equip_purchase_price}</td>
                  <td className="p-3">{item.equip_current_status}</td>

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
                      onClick={() => handleDelete(item.equipment_id)}
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

      <EquipmentModal
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
