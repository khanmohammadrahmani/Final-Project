<?php
namespace App\Services;

use App\Models\ExpenseInfo;

class ExpenseInfoService
{
    public function getAll()
    {
        return ExpenseInfo::where('is_deleted', false)
            ->latest('expense_id')
            ->get();
    }

    public function getById(int $id)
    {
        return ExpenseInfo::findOrFail($id);
    }

    public function create(array $data)
    {
        return ExpenseInfo::create($data);
    }

    public function update(int $id, array $data)
    {
        $expense = ExpenseInfo::findOrFail($id);
        $expense->update($data);

        return $expense->fresh();
    }

    public function delete(int $id)
    {
        $expense = ExpenseInfo::findOrFail($id);

        $expense->update([
            'is_deleted' => true,
        ]);

        return true;
    }
}
