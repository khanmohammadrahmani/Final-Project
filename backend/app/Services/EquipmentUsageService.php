<?php

namespace App\Services;

use App\Models\EquipmentUsageInfo;

class EquipmentUsageService
{
    public function getAll()
    {
        return EquipmentUsageInfo::where('is_deleted', false)->get();
    }

    public function getById($id)
    {
        return EquipmentUsageInfo::findOrFail($id);
    }

    public function create(array $data)
    {
        return EquipmentUsageInfo::create($data);
    }

    public function update($id, array $data)
    {
        $record = EquipmentUsageInfo::findOrFail($id);
        $record->update($data);

        return $record;
    }

    public function delete($id)
    {
        $record = EquipmentUsageInfo::findOrFail($id);
        $record->is_deleted = true;
        $record->save();

        return $record;
    }
}