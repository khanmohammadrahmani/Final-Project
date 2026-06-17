<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('user');

        return [
            'customer_id' => ['nullable', 'integer'],
            'employee_id' => ['nullable', 'integer'],

            'user_name'   => ['required', 'string', 'max:150'],

            'user_email'  => [
                'required',
                'email',
                'max:150',
                'unique:users,user_email,' . $userId . ',user_id',
            ],

            // IMPORTANT: must match frontend field
            'password_hash' => [
                $this->isMethod('post') ? 'required' : 'nullable',
                'string',
                'min:6',
            ],

            'user_role' => ['required', 'string', 'max:50'],

            'is_active' => ['nullable', 'boolean'],

            // FIX: no "string" rule for file
            'user_photo_url' => ['nullable'],
        ];
    }
}