<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InvoiceInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'order_id'            => 'required|integer|exists:orders_info,order_id',

            'invoice_amount'      => 'required|numeric|min:0',

            'invoice_due_date'    => 'required|date',

            'invoice_description' => 'nullable|string',

            'invoice_status'      => 'required|string|max:50',
        ];
    }

    public function messages(): array
    {
        return [
            'order_id.required'         => 'Order is required',
            'order_id.exists'           => 'Selected order does not exist',

            'invoice_amount.required'   => 'Invoice amount is required',
            'invoice_amount.numeric'    => 'Invoice amount must be a number',

            'invoice_due_date.required' => 'Due date is required',
            'invoice_due_date.date'     => 'Invalid date format',

            'invoice_status.required'   => 'Invoice status is required',
        ];
    }
}
