<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderItemInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'order_id'              => ['required', 'integer'],
            'material_id'           => ['required', 'integer'],
            'order_item_quantity'   => ['required', 'numeric', 'min:0'],
            'order_item_unit_price' => ['required', 'numeric', 'min:0'],
        ];
    }
}
