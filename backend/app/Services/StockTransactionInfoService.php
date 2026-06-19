<?php
namespace App\Services;

use App\Models\StockTransactionInfo;

class StockTransactionInfoService
{
    public function getAll()
    {
        return StockTransactionInfo::with([
            'materialInfo', // ✅ FIXED (was: material)
        ])
            ->where('is_deleted', false)
            ->latest('stock_transaction_id')
            ->get();
    }

    public function getById(int $id)
    {
        return StockTransactionInfo::with([
            'materialInfo', // ✅ FIXED
        ])->findOrFail($id);
    }

    public function create(array $data)
    {
        return StockTransactionInfo::create($data);
    }

    public function update(int $id, array $data)
    {
        $item = StockTransactionInfo::findOrFail($id);
        $item->update($data);

        return $item->fresh();
    }

    public function delete(int $id)
    {
        $item = StockTransactionInfo::findOrFail($id);

        $item->update([
            'is_deleted' => true,
        ]);

        return true;
    }
}
