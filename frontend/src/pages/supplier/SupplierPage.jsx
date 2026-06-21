import React, { useEffect, useState } from "react";
import SupplierService from "../../services/supplier.service";
import SupplierModal from "../../components/supplier/SupplierModal";

export default function SupplierPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);

  const loadSuppliers = async () => {
    try {
      const res = await SupplierService.getAll();

      setSuppliers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
      setSuppliers([]);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (edit) {
        await SupplierService.update(edit.supplier_id, data);
      } else {
        await SupplierService.create(data);
      }

      setOpen(false);
      setEdit(null);

      await loadSuppliers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Supplier?")) return;

    try {
      await SupplierService.delete(id);

      await loadSuppliers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Suppliers</h1>

        <button
          onClick={() => {
            setEdit(null);
            setOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Supplier
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Address</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.supplier_id} className="border-t">
                <td className="p-3">{supplier.supplier_id}</td>

                <td className="p-3">{supplier.supplier_name}</td>

                <td className="p-3">{supplier.supplier_phone}</td>

                <td className="p-3">{supplier.supplier_email}</td>

                <td className="p-3">{supplier.supplier_address}</td>

                <td className="p-3 text-c gap-2">
                  <button
                    onClick={() => {
                      setEdit(supplier);
                      setOpen(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded m-1"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(supplier.supplier_id)}
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

      <SupplierModal
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
