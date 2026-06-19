<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmployeeWorkExperienceInfo extends Model
{
    protected $table = 'emp_work_experience_info';

    protected $primaryKey = 'experience_id';

    public $timestamps = true;

    protected $fillable = [
        'employee_id',
        'job_title',
        'responsibilities',
        'experience_description',
        'start_date',
        'end_date',
        'organization',
        'organization_address',
        'reference_email',
        'reference_phone',
        'is_deleted',
    ];

    protected $casts = [
        'experience_id' => 'integer',
        'employee_id'   => 'integer',
        'start_date'    => 'date',
        'end_date'      => 'date',
        'is_deleted'    => 'boolean',
    ];

    public function employeeInfo(): BelongsTo
    {
        return $this->belongsTo(
            EmployeeInfo::class,
            'employee_id',
            'employee_id'
        );
    }
}