<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeInfo extends Model
{
    protected $table = 'employee_info';

    protected $primaryKey = 'employee_id';

    public $timestamps = true;

    protected $fillable = [
        'emp_full_name',
        'emp_father_name',
        'emp_nid_number',
        'emp_dob',
        'emp_gender',
        'emp_marital_status',
        'emp_phone',
        'emp_email',
        'emp_permanent_address',
        'emp_current_address',
        'emp_bank_account',
        'emp_photo_url',
        'is_deleted',
    ];

    protected $casts = [
        'employee_id' => 'integer',
        'emp_dob'     => 'date',
        'is_deleted'  => 'boolean',
        'created_at'  => 'datetime',
        'updated_at'  => 'datetime',
    ];
}