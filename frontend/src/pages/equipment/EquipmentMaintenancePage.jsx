import React, { useEffect, useState } from "react";

import EquipmentMaintenanceService from "../../services/equipmentMaintenanceService";
import EquipmentMaintenanceModal from "../../components/equipment/EquipmentMaintenanceModal";

export default function EquipmentMaintenancePage() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await EquipmentMaintenanceService.getAll();
      setItems(res.data?.data || res.data || []);
    } catch (error) {
      console.error("Load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (editData) {
        await EquipmentMaintenanceService.update(
          editData.equip_maintenance_id,
          data
        );
      } else {
        await EquipmentMaintenanceService.create(data);
      }

      setOpen(false);
      setEditData(null);
      loadData();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this maintenance record?")) return;

    try {
      await EquipmentMaintenanceService.delete(id);
      loadData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const openCreateModal = () => {
    setEditData(null);
    setOpen(true);
  };

  const openEditModal = (item) => {
    setEditData(item);
    setOpen(true);
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Equipment Maintenance</h1>

        <button
          onClick={openCreateModal}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Maintenance
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Equipment ID</th>
              <th className="p-3">Cost</th>
              <th className="p-3">Date</th>
              <th className="p-3">Description</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-4 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.equip_maintenance_id} className="border-t">
                  <td className="p-3">{item.equip_maintenance_id}</td>
                  <td className="p-3">{item.equipment_id}</td>
                  <td className="p-3">{item.maintenance_cost}</td>
                  <td className="p-3">{item.maintenance_date}</td>
                  <td className="p-3">
                    {item.maintenance_description}
                  </td>

                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => openEditModal(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(item.equip_maintenance_id)
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
      <EquipmentMaintenanceModal
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