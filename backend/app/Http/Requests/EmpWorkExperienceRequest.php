<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmpWorkExperienceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'employee_id' => 'required|integer|exists:employee_info,employee_id',
            'job_title' => 'required|string|max:150',
            'responsibilities' => 'nullable|string',
            'experience_description' => 'nullable|string',

            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',

            'organization' => 'required|string|max:255',
            'organization_address' => 'nullable|string',

            'reference_email' => 'nullable|email|max:255',
            'reference_phone' => 'nullable|string|max:30',
        ];
    }
}