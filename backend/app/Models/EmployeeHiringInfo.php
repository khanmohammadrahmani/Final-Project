<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmployeeHiringInfo extends Model
{
    protected $table = 'emp_hiring_info';

    protected $primaryKey = 'hiring_info_id';

    public $timestamps = true;

    protected $fillable = [
        'employee_id',
        'position',
        'employment_type',
        'hire_date',
        'end_date',
        'current_status',
        'is_deleted',
    ];

    protected $casts = [
        'hiring_info_id' => 'integer',
        'employee_id'    => 'integer',
        'hire_date'      => 'date',
        'end_date'       => 'date',
        'is_deleted'     => 'boolean',
        'created_at'     => 'datetime',
        'updated_at'     => 'datetime',
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
