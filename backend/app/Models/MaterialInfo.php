<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaterialInfo extends Model
{
    protected $table = 'materials_info';

    protected $primaryKey = 'material_id';

    public $timestamps = true;

    protected $fillable = [
        'material_name',
        'material_unit',
        'current_stock',
        'unit_price',
        'is_deleted',
    ];

    protected $casts = [
        'material_id'   => 'integer',

        'current_stock' => 'decimal:2',
        'unit_price'    => 'decimal:2',

        'is_deleted'    => 'boolean',

        'created_at'    => 'datetime',
        'updated_at'    => 'datetime',
    ];
}
