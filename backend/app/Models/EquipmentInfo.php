<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EquipmentInfo extends Model
{
    protected $table = 'equipment_info';

    protected $primaryKey = 'equipment_id';

    public $timestamps = true;

    protected $fillable = [
        'equip_name',
        'equip_company',
        'equip_serial_number',
        'equip_purchase_date',
        'equip_purchase_price',
        'equip_current_status',
        'is_deleted',
    ];

    protected $casts = [
        'equipment_id'         => 'integer',

        'equip_purchase_date'  => 'date',

        'equip_purchase_price' => 'decimal:2',

        'is_deleted'           => 'boolean',

        'created_at'           => 'datetime',
        'updated_at'           => 'datetime',
    ];
}
