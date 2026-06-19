<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyDocumentsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // ================= COMPANY ID =================
            'company_id' => [
                'required',
                'integer',
            ],

            // ================= DOCUMENT NAME =================
            'doc_name' => [
                'required',
                'string',
                'max:255',
            ],

            // ================= DESCRIPTION =================
            'doc_description' => [
                'nullable',
                'string',
            ],

            // ================= FILE (FIXED FOR CREATE + UPDATE) =================
            'file' => [
                'nullable',   // 🔥 مهم fix (نه update خراب کوي، نه create)
                'file',
                'max:10240', // 10MB
            ],

            // ================= SOFT DELETE =================
            'is_deleted' => [
                'nullable',
                'boolean',
            ],
        ];
    }
}