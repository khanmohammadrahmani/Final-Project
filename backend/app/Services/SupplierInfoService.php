<?php
namespace App\Services;

use App\Models\SupplierInfo;

class SupplierInfoService
{
    public function getAll()
    {
        return SupplierInfo::where(
            'is_deleted',
            false
        )
            ->latest('supplier_id')
            ->get();
    }

    public function getById(int $id)
    {
        return SupplierInfo::findOrFail($id);
    }

    public function create(array $data)
    {
        return SupplierInfo::create($data);
    }

    public function update(
        int $id,
        array $data
    ) {
        $supplier = SupplierInfo::findOrFail($id);

        $supplier->update($data);

        return $supplier->fresh();
    }

    public function delete(int $id): bool
    {
        $supplier = SupplierInfo::findOrFail($id);

        $supplier->update([
            'is_deleted' => true,
        ]);

        return true;
    }
}
