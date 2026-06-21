import React, { useEffect, useState } from "react";

import MaterialService from "../../services/material.service";
import MaterialModal from "../../components/materials/MaterialModal";

export default function MaterialPage() {
  const [materials, setMaterials] = useState([]);

  const [open, setOpen] = useState(false);

  const [edit, setEdit] = useState(null);

  const loadMaterials = async () => {
    try {
      const res = await MaterialService.getAll();

      setMaterials(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
      setMaterials([]);
    }
  };

  useEffect(() => {
    loadMaterials();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (edit) {
        await MaterialService.update(edit.material_id, data);
      } else {
        await MaterialService.create(data);
      }

      setOpen(false);
      setEdit(null);

      await loadMaterials();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Material?")) return;

    try {
      await MaterialService.delete(id);

      await loadMaterials();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Materials</h1>

        <button
          onClick={() => {
            setEdit(null);
            setOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Material
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>

              <th className="p-3">Material Name</th>

              <th className="p-3">Unit</th>

              <th className="p-3">Current Stock</th>

              <th className="p-3">Unit Price</th>

              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {materials.map((material) => (
              <tr key={material.material_id} className="border-t">
                <td className="p-3">{material.material_id}</td>

                <td className="p-3">{material.material_name}</td>

                <td className="p-3">{material.material_unit}</td>

                <td className="p-3">{material.current_stock}</td>

                <td className="p-3">{material.unit_price}</td>

                <td className="p-3 text-center gap-2">
                  <button
                    onClick={() => {
                      setEdit(material);
                      setOpen(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded m-1 "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(material.material_id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <MaterialModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEdit(null);
        }}
        onSubmit={handleSubmit}
        initialData={edit}
      />
    </div>
  );
}
