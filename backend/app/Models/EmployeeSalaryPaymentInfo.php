<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeSalaryPaymentInfo extends Model
{
    protected $table = 'emp_salary_payment_info';

    protected $primaryKey = 'payment_id';

    protected $fillable = [
        'employee_salary_id',
        'salary_month',
        'salary_bonus',
        'salary_deduction',
        'gross_salary',
        'paid_amount',
        'payment_date',
        'payment_status',
        'is_deleted',
    ];
}
