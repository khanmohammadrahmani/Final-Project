<?php

namespace App\Services;

use App\Models\CustomerInfo;

class CustomerInfoService
{
    public function getAll()
    {
        return CustomerInfo::where('is_deleted', false)->get();
    }

    public function getById($id)
    {
        return CustomerInfo::findOrFail($id);
    }

    public function create(array $data)
    {
        return CustomerInfo::create($data);
    }

    public function update($id, array $data)
    {
        $customer = CustomerInfo::findOrFail($id);
        $customer->update($data);

        return $customer;
    }

    public function delete($id)
    {
        $customer = CustomerInfo::findOrFail($id);
        $customer->update(['is_deleted' => true]);

        return $customer;
    }
}