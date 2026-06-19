<?php

namespace App\Services;

use App\Models\EmployeeSalaryInfo;

class EmployeeSalaryInfoService
{
    public function getAll()
    {
        return EmployeeSalaryInfo::with('employeeInfo')
            ->where('is_deleted', false)
            ->latest('employee_salary_id')
            ->get();
    }

    public function getById(int $id)
    {
        return EmployeeSalaryInfo::with('employeeInfo')
            ->findOrFail($id);
    }

    public function create(array $data)
    {
        return EmployeeSalaryInfo::create($data);
    }

    public function update(
        int $id,
        array $data
    ) {
        $salary = EmployeeSalaryInfo::findOrFail($id);

        $salary->update($data);

        return $salary->fresh();
    }

    public function delete(int $id): bool
    {
        $salary = EmployeeSalaryInfo::findOrFail($id);

        $salary->update([
            'is_deleted' => true,
        ]);

        return true;
    }
}