<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'supplier_id'  => [
                'nullable',
                'integer',
                'exists:suppliers_info,supplier_id',
            ],

            'customer_id'  => [
                'nullable',
                'integer',
                'exists:customer_info,customer_id',
            ],

            'order_type'   => [
                'required',
                'string',
                'max:50',
            ],

            'order_date'   => [
                'required',
                'date',
            ],

            'total_amount' => [
                'nullable',
                'numeric',
            ],

            'order_status' => [
                'required',
                'string',
                'max:50',
            ],

            'is_deleted'   => [
                'nullable',
                'boolean',
            ],
        ];
    }
}
