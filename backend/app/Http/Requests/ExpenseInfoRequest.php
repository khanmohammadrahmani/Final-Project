<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExpenseInfoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'expense_type'        => 'required|string|max:100',

            'expense_amount'      => 'required|numeric|min:0',

            'expense_date'        => 'required|date',

            'expense_description' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'expense_type.required'   => 'Expense type is required',

            'expense_amount.required' => 'Expense amount is required',
            'expense_amount.numeric'  => 'Expense amount must be a number',

            'expense_date.required'   => 'Expense date is required',
            'expense_date.date'       => 'Invalid date format',
        ];
    }
}
