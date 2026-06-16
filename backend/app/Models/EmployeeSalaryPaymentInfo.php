<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmployeeSalaryPaymentInfo extends Model
{
    protected $table = 'emp_salary_payment_info';

    protected $primaryKey = 'payment_id';

    public $timestamps = true;

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

    protected $casts = [
        'payment_id'         => 'integer',
        'employee_salary_id' => 'integer',

        'salary_bonus'       => 'decimal:2',
        'salary_deduction'   => 'decimal:2',
        'gross_salary'       => 'decimal:2',
        'paid_amount'        => 'decimal:2',

        'payment_date'       => 'date',

        'is_deleted'         => 'boolean',

        'created_at'         => 'datetime',
        'updated_at'         => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function employeeSalaryInfo(): BelongsTo
    {
        return $this->belongsTo(
            EmployeeSalaryInfo::class,
            'employee_salary_id',
            'employee_salary_id'
        );
    }
    
}
