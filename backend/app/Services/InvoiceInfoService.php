<?php
namespace App\Services;

use App\Models\InvoiceInfo;

class InvoiceInfoService
{
    public function getAll()
    {
        return InvoiceInfo::where('is_deleted', false)
            ->latest('invoice_id')
            ->get();
    }

    public function getById(int $id)
    {
        return InvoiceInfo::findOrFail($id);
    }

    public function create(array $data)
    {
        return InvoiceInfo::create($data);
    }

    public function update(int $id, array $data)
    {
        $invoice = InvoiceInfo::findOrFail($id);
        $invoice->update($data);

        return $invoice->fresh();
    }

    public function delete(int $id)
    {
        $invoice = InvoiceInfo::findOrFail($id);

        $invoice->update([
            'is_deleted' => true,
        ]);

        return true;
    }
}
