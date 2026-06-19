<?php
namespace App\Services;

use App\Models\CashTransactionInfo;

class CashTransactionInfoService
{
    public function getAll()
    {
        return CashTransactionInfo::query()
            ->where('is_deleted', false)
            ->latest('transaction_id')
            ->get();
    }

    public function getById($id)
    {
        return CashTransactionInfo::where('transaction_id', $id)
            ->firstOrFail();
    }

    public function create(array $data)
    {
        return CashTransactionInfo::create($data);
    }

    public function update($id, array $data)
    {
        $item = CashTransactionInfo::findOrFail($id);
        $item->update($data);

        return $item->fresh();
    }

    public function delete($id)
    {
        $item = CashTransactionInfo::findOrFail($id);

        $item->update([
            'is_deleted' => true,
        ]);

        return true;
    }
}
