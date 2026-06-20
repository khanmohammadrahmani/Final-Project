<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EquipmentUsageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'equipment_id' => 'required|integer',
            'employee_id' => 'required|integer',
            'usage_start_date' => 'required|date',
            'usage_end_date' => 'nullable|date|after_or_equal:usage_start_date',
            'usage_description' => 'nullable|string',
        ];
    }
}