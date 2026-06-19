<?php

namespace App\Services;

use App\Models\EmpWorkExperienceInfo;

class EmpWorkExperienceService
{
    // ================= GET ALL =================
    public function getAll()
    {
        return EmpWorkExperienceInfo::where('is_deleted', false)
            ->latest()
            ->get();
    }

    // ================= GET BY ID =================
    public function getById($id)
    {
        return EmpWorkExperienceInfo::findOrFail($id);
    }

    // ================= CREATE =================
    public function create(array $data)
    {
        return EmpWorkExperienceInfo::create($data);
    }

    // ================= UPDATE =================
    public function update($id, array $data)
    {
        $record = EmpWorkExperienceInfo::findOrFail($id);
        $record->update($data);

        return $record;
    }

    // ================= DELETE (SOFT) =================
    public function delete($id)
    {
        $record = EmpWorkExperienceInfo::findOrFail($id);

        $record->update([
            'is_deleted' => true
        ]);

        return true;
    }
}