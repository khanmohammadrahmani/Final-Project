<?php

namespace App\Services;

use App\Models\EmpSalaryPaymentInfo;

class EmpSalaryPaymentService
{
    public function getAll()
    {
        return EmpSalaryPaymentInfo::where('is_deleted', false)->get();
    }

    public function getById($id)
    {
        return EmpSalaryPaymentInfo::findOrFail($id);
    }

    public function create(array $data)
    {
        return EmpSalaryPaymentInfo::create($data);
    }

    public function update($id, array $data)
    {
        $payment = EmpSalaryPaymentInfo::findOrFail($id);
        $payment->update($data);
        return $payment;
    }

    public function delete($id)
    {
        $payment = EmpSalaryPaymentInfo::findOrFail($id);
        $payment->update(['is_deleted' => true]);

        return $payment;
    }
}