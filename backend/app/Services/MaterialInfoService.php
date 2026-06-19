<?php
namespace App\Services;

use App\Models\MaterialInfo;

class MaterialInfoService
{
    public function getAll()
    {
        return MaterialInfo::where(
            'is_deleted',
            false
        )
            ->latest('material_id')
            ->get();
    }

    public function getById(int $id)
    {
        return MaterialInfo::findOrFail($id);
    }

    public function create(array $data)
    {
        return MaterialInfo::create($data);
    }

    public function update(
        int $id,
        array $data
    ) {
        $material = MaterialInfo::findOrFail($id);

        $material->update($data);

        return $material->fresh();
    }

    public function delete(int $id): bool
    {
        $material = MaterialInfo::findOrFail($id);

        $material->update([
            'is_deleted' => true,
        ]);

        return true;
    }
}
