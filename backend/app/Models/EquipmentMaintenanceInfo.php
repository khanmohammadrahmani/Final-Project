<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EquipmentMaintenanceInfo extends Model
{
    protected $table = 'equipment_maintenance_info';

    protected $primaryKey = 'equip_maintenance_id';

    public $timestamps = true;

    protected $fillable = [
        'equipment_id',
        'maintenance_cost',
        'maintenance_date',
        'maintenance_description',
        'is_deleted',
    ];

    protected $casts = [
        'equip_maintenance_id' => 'integer',
        'equipment_id'         => 'integer',

        'maintenance_cost'     => 'decimal:2',

        'maintenance_date'     => 'date',

        'is_deleted'           => 'boolean',

        'created_at'           => 'datetime',
        'updated_at'           => 'datetime',
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
}
