<?php
namespace App\Services;

use App\Models\PaymentInfo;

class PaymentInfoService
{
    public function getAll()
    {
        return PaymentInfo::query()
            ->where('is_deleted', false)
            ->latest('payment_id')
            ->get();
    }

    public function getById($id)
    {
        return PaymentInfo::query()
            ->where('payment_id', $id)
            ->firstOrFail();
    }

    public function create(array $data)
    {
        return PaymentInfo::create($data);
    }

    public function update($id, array $data)
    {
        $item = PaymentInfo::findOrFail($id);
        $item->update($data);

        return $item->fresh();
    }

    public function delete($id)
    {
        $item = PaymentInfo::findOrFail($id);

        $item->update([
            'is_deleted' => true,
        ]);

        return true;
    }
}
