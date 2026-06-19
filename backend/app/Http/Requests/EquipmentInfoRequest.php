<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EquipmentInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'equip_name'           => 'required|string|max:150',
            'equip_company'        => 'nullable|string|max:150',
            'equip_serial_number'  => 'nullable|string|max:100',
            'equip_purchase_date'  => 'required|date',
            'equip_purchase_price' => 'required|numeric|min:0',
            'equip_current_status' => 'required|string|max:50',
        ];
    }
}
