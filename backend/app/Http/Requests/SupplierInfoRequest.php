<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SupplierInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'supplier_name'    => [
                'required',
                'string',
                'max:255',
            ],

            'supplier_phone'   => [
                'nullable',
                'string',
                'max:30',
            ],

            'supplier_email'   => [
                'nullable',
                'email',
                'max:255',
            ],

            'supplier_address' => [
                'nullable',
                'string',
            ],

            'is_deleted'       => [
                'nullable',
                'boolean',
            ],
        ];
    }
}
