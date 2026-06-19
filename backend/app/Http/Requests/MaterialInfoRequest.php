<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MaterialInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'material_name' => [
                'required',
                'string',
                'max:255',
            ],

            'material_unit' => [
                'required',
                'string',
                'max:50',
            ],

            'current_stock' => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'unit_price'    => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'is_deleted'    => [
                'nullable',
                'boolean',
            ],
        ];
    }
}
