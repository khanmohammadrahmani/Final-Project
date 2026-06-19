<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $isUpdate = $this->route('employee') !== null;

        return [
            'emp_full_name' => ['required', 'string', 'max:255'],
            'emp_father_name' => ['nullable', 'string', 'max:255'],
            'emp_nid_number' => ['nullable', 'string', 'max:100'],
            'emp_dob' => ['nullable', 'date'],

            'emp_gender' => ['nullable', 'string', 'max:20'],
            'emp_marital_status' => ['nullable', 'string', 'max:20'],

            'emp_phone' => ['nullable', 'string', 'max:30'],
            'emp_email' => ['nullable', 'email', 'max:255'],

            'emp_permanent_address' => ['nullable', 'string'],
            'emp_current_address' => ['nullable', 'string'],

            'emp_bank_account' => ['nullable', 'string', 'max:100'],

            'emp_photo' => [
                $isUpdate ? 'nullable' : 'required',
                'file',
                'image',
                'max:5120'
            ],

            'is_deleted' => ['nullable', 'boolean'],
        ];
    }
}