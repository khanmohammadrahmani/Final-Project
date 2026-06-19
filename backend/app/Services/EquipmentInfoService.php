<?php
namespace App\Services;

use App\Models\EquipmentInfo;

class EquipmentInfoService
{
    public function getAll()
    {
        return EquipmentInfo::where('is_deleted', false)
            ->latest('equipment_id')
            ->get();
    }

    public function getById($id)
    {
        return EquipmentInfo::findOrFail($id);
    }

    public function create(array $data)
    {
        return EquipmentInfo::create($data);
    }

    public function update($id, array $data)
    {
        $item = EquipmentInfo::findOrFail($id);
        $item->update($data);

        return $item->fresh();
    }

    public function delete($id)
    {
        $item = EquipmentInfo::findOrFail($id);

        $item->update([
            'is_deleted' => true,
        ]);

        return true;
    }
}
