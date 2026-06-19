<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'invoice_id'     => 'required|integer',
            'payment_amount' => 'required|numeric|min:0',
            'payment_date'   => 'required|date',
            'payment_method' => 'required|string|max:50',
            'payment_status' => 'nullable|string|max:50',
        ];
    }
}
