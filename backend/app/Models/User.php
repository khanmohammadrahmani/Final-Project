<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends Model
{
    protected $table = 'users';

    protected $primaryKey = 'user_id';

    public $timestamps = true;

    protected $fillable = [
        'customer_id',
        'employee_id',
        'user_name',
        'password_hash',
        'user_email',
        'failed_attempts',
        'time_range_start',
        'time_range_end',
        'user_role',
        'is_active',
        'user_photo_url',
    ];

    protected $casts = [
        'user_id'          => 'integer',
        'customer_id'      => 'integer',
        'employee_id'      => 'integer',

        'failed_attempts'  => 'integer',

        'time_range_start' => 'datetime',
        'time_range_end'   => 'datetime',

        'is_active'        => 'boolean',

        'created_at'       => 'datetime',
        'updated_at'       => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function customerInfo(): BelongsTo
    {
        return $this->belongsTo(
            CustomerInfo::class,
            'customer_id',
            'customer_id'
        );
    }

    public function employeeInfo(): BelongsTo
    {
        return $this->belongsTo(
            EmployeeInfo::class,
            'employee_id',
            'employee_id'
        );
    }
}
