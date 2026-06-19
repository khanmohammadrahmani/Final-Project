<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeSalaryInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'employee_id'         => [
                'required',
                'integer',
                'exists:employee_info,employee_id',
            ],

            'base_salary'         => [
                'required',
                'numeric',
                'min:0',
            ],

            'allowance'           => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'meal_allowance'      => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'transport_allowance' => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'mobile_allowance'    => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'effective_from'      => [
                'required',
                'date',
            ],

            'effective_to'        => [
                'nullable',
                'date',
            ],

            'is_active'           => [
                'nullable',
                'boolean',
            ],

            'is_deleted'          => [
                'nullable',
                'boolean',
            ],
        ];
    }
}
