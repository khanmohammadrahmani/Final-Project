<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEquipmentMaintenanceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'equipment_id' => 'required|integer',
            'maintenance_cost' => 'required|numeric|min:0',
            'maintenance_date' => 'required|date',
            'maintenance_description' => 'nullable|string',
        ];
    }
}