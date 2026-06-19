<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StockTransactionInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'material_id'            => ['required', 'integer'],
            'quantity'               => ['required', 'numeric'],
            'stock_transaction_type' => ['required', 'string', 'max:50'],
            'stock_transaction_date' => ['required', 'date'],
        ];
    }
}
