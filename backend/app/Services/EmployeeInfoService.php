<?php

namespace App\Services;

use App\Models\EmployeeInfo;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class EmployeeInfoService
{
    public function getAll()
    {
        return EmployeeInfo::where('is_deleted', false)
            ->latest('employee_id')
            ->get();
    }

    public function getById($id)
    {
        return EmployeeInfo::findOrFail($id);
    }

    public function create(array $data)
    {
        if (isset($data['emp_photo']) && $data['emp_photo'] instanceof UploadedFile) {
            $data['emp_photo_url'] = $data['emp_photo']->store('employees', 'public');
            unset($data['emp_photo']);
        }

        return EmployeeInfo::create($data);
    }

    public function update($id, array $data)
    {
        $emp = EmployeeInfo::findOrFail($id);

        if (isset($data['emp_photo']) && $data['emp_photo'] instanceof UploadedFile) {

            if ($emp->emp_photo_url && Storage::disk('public')->exists($emp->emp_photo_url)) {
                Storage::disk('public')->delete($emp->emp_photo_url);
            }

            $data['emp_photo_url'] = $data['emp_photo']->store('employees', 'public');
            unset($data['emp_photo']);
        }

        $emp->update($data);

        return $emp->fresh();
    }

    public function delete($id)
    {
        $emp = EmployeeInfo::findOrFail($id);

        $emp->update([
            'is_deleted' => true
        ]);

        return true;
    }
}