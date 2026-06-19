<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'cust_full_name' => 'required|string|max:255',
            'cust_father_name' => 'nullable|string|max:255',
            'cust_nid_number' => 'nullable|string|max:100',
            'cust_dob' => 'nullable|date',
            'cust_gender' => 'nullable|string|max:20',
            'cust_phone' => 'nullable|string|max:30',
            'cust_email' => 'nullable|email',
            'cust_address' => 'nullable|string',
            'cust_current_status' => 'nullable|string|max:50',
            'cust_photo_url' => 'nullable|string|max:500',
        ];
    }
}