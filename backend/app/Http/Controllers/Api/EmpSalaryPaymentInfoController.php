<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EmployeeSalaryPaymentInfo;
use Illuminate\Http\Request;

class EmpSalaryPaymentInfoController extends Controller
{
    public function index()
    {
        return response()->json(
            EmployeeSalaryPaymentInfo::where('is_deleted', false)->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'employee_salary_id' => 'required|integer',
            'salary_month' => 'required|string|max:20',
            'salary_bonus' => 'nullable|numeric',
            'salary_deduction' => 'nullable|numeric',
            'gross_salary' => 'nullable|numeric',
            'paid_amount' => 'nullable|numeric',
            'payment_date' => 'nullable|date',
            'payment_status' => 'nullable|string',
        ]);

        $data = EmployeeSalaryPaymentInfo::create($request->all());

        return response()->json([
            'message' => 'Payment created successfully',
            'data' => $data
        ]);
    }

    public function show($id)
    {
        return response()->json(
            EmployeeSalaryPaymentInfo::findOrFail($id)
        );
    }

    public function update(Request $request, $id)
    {
        $payment = EmployeeSalaryPaymentInfo::findOrFail($id);
        $payment->update($request->all());

        return response()->json([
            'message' => 'Payment updated successfully',
            'data' => $payment
        ]);
    }

    public function destroy($id)
    {
        $payment = EmployeeSalaryPaymentInfo::findOrFail($id);
        $payment->update(['is_deleted' => true]);

        return response()->json([
            'message' => 'Payment deleted successfully'
        ]);
    }
}