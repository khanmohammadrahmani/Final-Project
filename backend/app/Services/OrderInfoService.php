<?php
namespace App\Services;

use App\Models\OrderInfo;

class OrderInfoService
{
    public function getAll()
    {
        return OrderInfo::with([
            'supplierInfo',
            'customerInfo',
        ])
            ->latest('order_id')
            ->get();
    }

    public function getById(int $id)
    {
        return OrderInfo::with([
            'supplierInfo',
            'customerInfo',
        ])->findOrFail($id);
    }

    public function create(array $data)
    {
        return OrderInfo::create($data);
    }

    public function update(int $id, array $data)
    {
        $order = OrderInfo::findOrFail($id);

        $order->update($data);

        return $order->fresh();
    }

    public function delete(int $id)
    {
        $order = OrderInfo::findOrFail($id);
        $order->delete();

        return true;
    }
}
