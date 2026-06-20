<?php

namespace App\Services;

use App\Models\EquipmentMaintenanceInfo;

class EquipmentMaintenanceService
{
    public function getAll()
    {
        return EquipmentMaintenanceInfo::where('is_deleted', false)->get();
    }

    public function getById($id)
    {
        return EquipmentMaintenanceInfo::findOrFail($id);
    }

    public function create(array $data)
    {
        return EquipmentMaintenanceInfo::create($data);
    }

    public function update($id, array $data)
    {
        $record = EquipmentMaintenanceInfo::findOrFail($id);
        $record->update($data);
        return $record;
    }

    public function delete($id)
    {
        $record = EquipmentMaintenanceInfo::findOrFail($id);
        $record->is_deleted = true;
        $record->save();

        return $record;
    }
}