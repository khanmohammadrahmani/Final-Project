<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItemInfo extends Model
{
    protected $table = 'order_items_info';

    protected $primaryKey = 'order_item_id';

    public $timestamps = true;

    protected $fillable = [
        'order_id',
        'material_id',
        'order_item_quantity',
        'order_item_unit_price',
        'is_deleted',
    ];

    protected $casts = [
        'order_item_id'         => 'integer',
        'order_id'              => 'integer',
        'material_id'           => 'integer',

        'order_item_quantity'   => 'decimal:2',
        'order_item_unit_price' => 'decimal:2',

        'is_deleted'            => 'boolean',

        'created_at'            => 'datetime',
        'updated_at'            => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function orderInfo(): BelongsTo
    {
        return $this->belongsTo(
            OrderInfo::class,
            'order_id',
            'order_id'
        );
    }

    public function materialInfo(): BelongsTo
    {
        return $this->belongsTo(
            MaterialInfo::class,
            'material_id',
            'material_id'
        );
    }
}
