<?php
namespace App\Services;

use App\Models\OrderItemInfo;

class OrderItemInfoService
{
    public function getAll()
    {
        return OrderItemInfo::with([
            'orderInfo',
            'materialInfo',
        ])
            ->where('is_deleted', false)
            ->latest('order_item_id')
            ->get();
    }

    public function getById(int $id)
    {
        return OrderItemInfo::with([
            'orderInfo',
            'materialInfo',
        ])->findOrFail($id);
    }

    public function create(array $data)
    {
        return OrderItemInfo::create($data);
    }

    public function update(int $id, array $data)
    {
        $item = OrderItemInfo::findOrFail($id);
        $item->update($data);

        return $item->fresh();
    }

    public function delete(int $id)
    {
        $item = OrderItemInfo::findOrFail($id);

        $item->update([
            'is_deleted' => true,
        ]);

        return true;
    }
}
