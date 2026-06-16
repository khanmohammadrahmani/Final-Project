<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EquipmentUsageInfo extends Model
{
    protected $table = 'equipment_usage_info';

    protected $primaryKey = 'equipment_usage_id';

    public $timestamps = true;

    protected $fillable = [
        'equipment_id',
        'employee_id',
        'usage_start_date',
        'usage_end_date',
        'usage_description',
        'is_deleted',
    ];

    protected $casts = [
        'equipment_usage_id' => 'integer',
        'equipment_id'       => 'integer',
        'employee_id'        => 'integer',

        'usage_start_date'   => 'date',
        'usage_end_date'     => 'date',

        'is_deleted'         => 'boolean',

        'created_at'         => 'datetime',
        'updated_at'         => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function equipmentInfo(): BelongsTo
    {
        return $this->belongsTo(
            EquipmentInfo::class,
            'equipment_id',
            'equipment_id'
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
