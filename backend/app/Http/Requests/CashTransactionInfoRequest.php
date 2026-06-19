<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CashTransactionInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'reference_type'          => 'required|string|max:50',
            'reference_id'            => 'required|integer',

            'transaction_type'        => 'required|string|max:50',

            'amount'                  => 'required|numeric|min:0',

            'transaction_description' => 'nullable|string',

            'transaction_date'        => 'required|date',
        ];
    }

    public function messages(): array
    {
        return [
            'reference_type.required'   => 'Reference type is required',
            'reference_id.required'     => 'Reference ID is required',
            'transaction_type.required' => 'Transaction type is required',
            'amount.required'           => 'Amount is required',
            'transaction_date.required' => 'Transaction date is required',
        ];
    }
}
