<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'company_name'        => 'required|string|max:255',
            'license_number'      => 'nullable|string|max:100',
            'license_expire_date' => 'nullable|date',

            'company_phone'       => 'nullable|string|max:30',
            'company_email'       => 'nullable|email|max:255',
            'company_address'     => 'nullable|string',

            'company_logo_url'    => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ];
    }
}
