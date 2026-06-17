<?php
namespace App\Services;

use App\Models\CompanyInfo;

class CompanyInfoService
{
    public function getAll()
    {
        return CompanyInfo::latest('company_id')->get();
    }

    public function getById(int $id)
    {
        return CompanyInfo::findOrFail($id);
    }

    public function create(array $data)
    {
        return CompanyInfo::create($data);
    }

    public function update(int $id, array $data)
    {
        $company = CompanyInfo::findOrFail($id);

        $company->update($data);

        return $company->fresh();
    }

    public function delete(int $id)
    {
        $company = CompanyInfo::findOrFail($id);

        return $company->delete();
    }
}
