<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderInfo extends Model
{
    protected $table = 'orders_info';

    protected $primaryKey = 'order_id';

    public $timestamps = true;

    protected $fillable = [
        'supplier_id',
        'customer_id',
        'order_type',
        'order_date',
        'total_amount',
        'order_status',
        'is_deleted',
    ];

    protected $casts = [
        'order_id'     => 'integer',
        'supplier_id'  => 'integer',
        'customer_id'  => 'integer',

        'order_date'   => 'date',

        'total_amount' => 'decimal:2',

        'is_deleted'   => 'boolean',

        'created_at'   => 'datetime',
        'updated_at'   => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function supplierInfo(): BelongsTo
    {
        return $this->belongsTo(
            SupplierInfo::class,
            'supplier_id',
            'supplier_id'
        );
    }

    public function customerInfo(): BelongsTo
    {
        return $this->belongsTo(
            CustomerInfo::class,
            'customer_id',
            'customer_id'
        );
    }
}
