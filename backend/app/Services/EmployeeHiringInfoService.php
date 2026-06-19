<?php
namespace App\Services;

use App\Models\EmployeeHiringInfo;

class EmployeeHiringInfoService
{
    public function getAll()
    {
        return EmployeeHiringInfo::where(
            'is_deleted',
            false
        )->latest('hiring_info_id')->get();
    }

    public function getById(int $id)
    {
        return EmployeeHiringInfo::findOrFail($id);
    }

    public function create(array $data)
    {
        return EmployeeHiringInfo::create($data);
    }

    public function update(
        int $id,
        array $data
    ) {
        $hiring = EmployeeHiringInfo::findOrFail($id);

        $hiring->update($data);

        return $hiring->fresh();
    }

    public function delete(int $id): bool
    {
        $hiring = EmployeeHiringInfo::findOrFail($id);

        $hiring->update([
            'is_deleted' => true,
        ]);

        return true;
    }
}
