<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeHiringInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'employee_id'     => ['required', 'integer'],
            'position'        => ['required', 'string', 'max:255'],
            'employment_type' => ['nullable', 'string', 'max:100'],
            'hire_date'       => ['required', 'date'],
            'end_date'        => ['nullable', 'date'],
            'current_status'  => ['nullable', 'string', 'max:100'],
            'is_deleted'      => ['nullable', 'boolean'],
        ];
    }
}