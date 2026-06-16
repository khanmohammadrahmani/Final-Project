<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmployeeSalaryInfo extends Model
{
    protected $table = 'emp_salary_info';

    protected $primaryKey = 'employee_salary_id';

    public $timestamps = true;

    protected $fillable = [
        'employee_id',
        'base_salary',
        'allowance',
        'meal_allowance',
        'transport_allowance',
        'mobile_allowance',
        'effective_from',
        'effective_to',
        'is_active',
        'is_deleted',
    ];

    protected $casts = [
        'employee_salary_id'  => 'integer',
        'employee_id'         => 'integer',

        'base_salary'         => 'decimal:2',
        'allowance'           => 'decimal:2',
        'meal_allowance'      => 'decimal:2',
        'transport_allowance' => 'decimal:2',
        'mobile_allowance'    => 'decimal:2',

        'effective_from'      => 'date',
        'effective_to'        => 'date',

        'is_active'           => 'boolean',
        'is_deleted'          => 'boolean',

        'created_at'          => 'datetime',
        'updated_at'          => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function employeeInfo(): BelongsTo
    {
        return $this->belongsTo(
            EmployeeInfo::class,
            'employee_id',
            'employee_id'
        );
    }
}
