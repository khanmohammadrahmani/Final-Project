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
            'customer_id'      => ['nullable', 'integer'],
            'employee_id'      => ['nullable', 'integer'],

            'user_name'        => ['required', 'string', 'max:150'],

            // IMPORTANT: matches DB column user_email
            'user_email'       => [
                'required',
                'email',
                'max:150',
                'unique:users,user_email,' . $userId . ',user_id',
            ],

            // password stored as password_hash in DB
            'password_hash'    => [
                $this->isMethod('post') ? 'required' : 'nullable',
                'string',
                'min:6',
            ],

            'failed_attempts'  => ['nullable', 'integer', 'min:0'],

            'time_range_start' => ['nullable', 'date'],
            'time_range_end'   => ['nullable', 'date'],

            'user_role'        => ['required', 'string', 'max:50'],

            'is_active'        => ['nullable', 'boolean'],

            'user_photo_url'   => ['nullable', 'string', 'max:500'],
        ];
    }
}
