<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmpDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $isUpdate = $this->route('employee_document') !== null
            || $this->route('emp_document') !== null
            || $this->route('document') !== null;

        return [
            'employee_id' => [
                'required',
                'integer',
                'exists:employee_info,employee_id',
            ],

            'doc_name' => [
                'required',
                'string',
                'max:255',
            ],

            'doc_description' => [
                'nullable',
                'string',
            ],

            'file' => [
                $isUpdate ? 'nullable' : 'required',
                'file',
                'max:10240',
            ],

            'is_deleted' => [
                'nullable',
                'boolean',
            ],
        ];
    }
}