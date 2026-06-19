<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmpSalaryPaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'employee_salary_id' => 'required|integer|exists:emp_salary_info,employee_salary_id',
            'salary_month' => 'required|string|max:20',

            'salary_bonus' => 'nullable|numeric|min:0',
            'salary_deduction' => 'nullable|numeric|min:0',

            'gross_salary' => 'nullable|numeric|min:0',
            'paid_amount' => 'nullable|numeric|min:0',

            'payment_date' => 'nullable|date',
            'payment_status' => 'nullable|string|max:50',
        ];
    }
}